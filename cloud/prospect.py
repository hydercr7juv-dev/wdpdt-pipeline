#!/usr/bin/env python3
"""Find UK online shops to contact, straight from Companies House.

Run in the outreach routine's sandbox, so it carries no dependencies beyond the
standard library. It prints JSON to stdout and nothing else:

    [{"company": "...", "site": "...", "email": "..."}, ...]

    python3 prospect.py --start-page 85 --pages 4 --want 8 [--sic 47910]

Why it exists: the prospect list used to be pasted into the routine's prompt,
which meant a human had to regenerate it every couple of days. The routine can
do its own prospecting instead, and Gmail's sent folder is already the record of
who has been contacted, so no queue file is needed anywhere.

SIC 47910 is "retail sale via mail order houses or via the Internet", which is
how a UK company selling online is supposed to classify itself.

Expect roughly one usable contact per six companies. Most are parked domains,
dead sites, or shops that publish no address anywhere. That yield is the data,
not a fault in this script.
"""
import argparse
import html as H
import json
import re
import socket
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/129.0 Safari/537.36"}
CH = "https://find-and-update.company-information.service.gov.uk"

# Registered at an agent's office tells us nothing about the business and is
# often a shell company.
AGENT = re.compile(r'accountan|chartered|bookkeep|\bllp\b|audit|registered office|'
                   r'company secretar|formations|corporate services|regus|wework|mail ?box', re.I)
BADMAIL = re.compile(r'user@domain|example\.|privacy|dpo|noreply|no-reply|sentry|wix|'
                     r'\.(png|jpe?g|svg|webp)|wordpress|godaddy|squarespace|u003e|'
                     r'you@email|your@email|yourname@|youremail|name@email|test@|'
                     r'sentry\.io|@sentry', re.I)
PARKED = re.compile(r'\bfor sale\b|domain (is )?(for sale|broker)|buy this domain|coming soon|'
                    r'under construction|parked (free|domain)|spaceship|sedo|afternic|'
                    r'godaddy auction|this site is temporarily|account suspended|'
                    r'default web page', re.I)
# A real shop leaves traces: a cart, a checkout, or a known platform.
SHOP = re.compile(r'add to (cart|bag|basket)|/cart|/checkout|/collections/|/products/|'
                  r'cdn\.shopify|myshopify|woocommerce|bigcommerce|squarespace|wixstatic', re.I)
EMAIL = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
SUFFIX = r'\b(limited|ltd|llp|plc|uk|the|company|co)\b'
FREEMAIL = {'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'hotmail.co.uk',
            'yahoo.com', 'yahoo.co.uk', 'icloud.com', 'live.co.uk', 'aol.com', 'btinternet.com'}
# A single-word core has to be distinctive. "B & E FITNESS" reduces to "fitness"
# and resolves to a completely different company's website.
GENERIC_WORD = {'fitness', 'studio', 'studios', 'beauty', 'health', 'training', 'clothing',
                'sports', 'wellness', 'restaurant', 'coffee', 'london', 'group', 'company',
                'services', 'solutions', 'academy', 'centre', 'center', 'school', 'online',
                'shopping', 'store', 'shop', 'retail', 'trading', 'global', 'direct'}
STOP = {'ltd', 'limited', 'llp', 'plc', 'uk', 'the', 'company', 'co', 'group', 'holdings',
        'trading', 'international'}


def get(url, timeout=12, limit=400_000):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
            return r.read(limit).decode('utf-8', 'ignore')
    except Exception:
        return None


def company_numbers(sic, page):
    h = get(f"{CH}/advanced-search/get-results?registeredOfficeAddress=London"
            f"&status=active&sicCodes={sic}&page={page}", timeout=25)
    return sorted(set(re.findall(r'/company/([A-Z0-9]{8})', h))) if h else []


def company_detail(num):
    h = get(f"{CH}/company/{num}", timeout=20)
    if not h:
        return None
    t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", h, flags=re.S)
    t = H.unescape(re.sub(r"<[^>]+>", " ", t))
    t = re.sub(r"\s+", " ", t)

    def g(p):
        m = re.search(p, t, re.I)
        return m.group(1).strip() if m else ""

    name = g(r"^\s*(.{3,90}?)\s*-\s*Find and update")
    addr = g(r"Registered office address\s+(.{5,110}?)\s+(?:Company status|Company type|Nature of business)")
    if not name:
        return None
    return {"num": num, "name": re.sub(r'\s*overview$', '', name).strip(), "addr": addr}


def cores(name):
    core = re.sub(SUFFIX, ' ', name.lower())
    core = re.sub(r'\(.*?\)', ' ', core)
    core = re.sub(r'[^a-z0-9 ]', ' ', core)
    w = [x for x in core.split() if len(x) > 1]
    out = []
    if w:
        out.append(("".join(w), len(w)))
    if len(w) >= 3:
        out.append(("".join(w[:3]), 3))
    if len(w) >= 2 and len("".join(w[:2])) >= 10:
        out.append(("".join(w[:2]), 2))
    seen, keep = set(), []
    for b, words in out:
        if len(b) < 7 or b in seen:
            continue
        if words < 2 and b in GENERIC_WORD:
            continue
        seen.add(b)
        keep.append(b)
    return keep[:3]


def name_matches(company, domain):
    words = [w for w in re.sub(r'[^a-z0-9 ]', ' ', company.lower()).split()
             if w not in STOP and len(w) > 2]
    host = domain.split('.')[0].replace('-', '')
    return any(w in host for w in words) or host in company.lower().replace(' ', '')


def probe(rec):
    """Resolve the company's own shop and pull a contact address off it."""
    for base in cores(rec["name"]):
        for tld in ('co.uk', 'com', 'uk', 'net', 'shop', 'store'):
            d = f"{base}.{tld}"
            try:
                socket.gethostbyname(d)
            except Exception:
                continue
            home = get(f"https://{d}") or get(f"http://{d}")
            if not home or len(home) < 900:
                continue
            if PARKED.search(home[:40_000]):
                continue
            if not SHOP.search(home):
                continue
            if not name_matches(rec["name"], d):
                continue

            blob = home
            for path in ('/contact', '/contact-us', '/pages/contact', '/about'):
                extra = get(f"https://{d}{path}", timeout=8)
                if extra:
                    blob += extra

            found = [e.lower() for e in EMAIL.findall(blob)]
            found = [e for e in dict.fromkeys(found) if not BADMAIL.search(e)]
            # Only an address belonging to THIS business. Taking any address on
            # the page once produced a journalist's address lifted from an
            # embedded news item.
            keep = []
            for e in found:
                dom = e.split('@')[-1]
                if dom == d or dom.endswith('.' + d) or base[:6] in dom or dom in FREEMAIL:
                    keep.append(e)
            if not keep:
                continue

            nm = re.sub(r'\s+(LIMITED|LTD\.?|LLP|PLC)$', '', rec["name"], flags=re.I).strip()
            return {"company": nm.title() if nm.isupper() else nm,
                    "site": d, "email": keep[0]}
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sic", default="47910")
    ap.add_argument("--start-page", type=int, required=True)
    ap.add_argument("--pages", type=int, default=4)
    ap.add_argument("--want", type=int, default=8)
    ap.add_argument("--skip", default="", help="comma separated addresses to exclude")
    a = ap.parse_args()

    skip = {s.strip().lower() for s in a.skip.split(",") if s.strip()}
    out, seen_emails = [], set()

    for page in range(a.start_page, a.start_page + a.pages):
        if len(out) >= a.want:
            break
        nums = company_numbers(a.sic, page)
        if not nums:
            continue
        with ThreadPoolExecutor(10) as ex:
            recs = [r for r in ex.map(company_detail, nums) if r]
        recs = [r for r in recs if not AGENT.search(r["addr"])]
        with ThreadPoolExecutor(8) as ex:
            for hit in ex.map(probe, recs):
                if not hit:
                    continue
                e = hit["email"].lower()
                if e in skip or e in seen_emails:
                    continue
                seen_emails.add(e)
                out.append(hit)

    print(json.dumps(out[:a.want], indent=1))


if __name__ == "__main__":
    main()
