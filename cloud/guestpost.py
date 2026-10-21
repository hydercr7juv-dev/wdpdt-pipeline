#!/usr/bin/env python3
"""Check candidate URLs for a genuine guest-post page and pull a contact.

    python3 guestpost.py url1 url2 ...        -> JSON to stdout

The "write for us" space is mostly noise: scraped note pages, forum threads and
content farms all rank for the same phrases. A candidate only survives here if
the page genuinely invites contributions AND the site looks like a real
publication with its own contact address.

Finding the candidates is a web search, done outside this script. This is the
filter and the contact grab.
"""
import json, re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/129.0 Safari/537.36"}

# Hosts that rank for these phrases without being publications at all.
JUNK_HOST = re.compile(r'hackmd\.io|pearltrees|granicusideas|\.forums?\.|reddit\.com|'
                       r'medium\.com|linkedin\.com|facebook\.com|quora|pinterest|'
                       r'docs\.google|notion\.site|pastebin|wordpress\.com/support', re.I)
INVITES = re.compile(r'write for us|guest post|guest author|contribute|submit (an? )?(article|post|guest)|'
                     r'become a contributor|submission guidelines', re.I)
# Signs it is a real publication rather than a one-page link farm
REAL = re.compile(r'<article|/category/|/author/|privacy policy|about us|published|'
                  r'<nav|wp-content|comments', re.I)
PAID_HINT = re.compile(r'sponsored post|paid (post|guest|collaboration)|fee|price|charge|'
                       r'\$\d|£\d|per post', re.I)
EMAIL = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
BADMAIL = re.compile(r'example\.|sentry|wix|\.(png|jpe?g|svg|webp)|wordpress\.org|'
                     r'your@|you@|name@|domain\.com', re.I)


def get(url, timeout=12, limit=400_000):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
            return r.read(limit).decode("utf-8", "ignore"), r.geturl()
    except Exception:
        return None, url


def host_of(u):
    m = re.match(r'https?://([^/]+)', u)
    return m.group(1).replace("www.", "") if m else ""


def check(url):
    if JUNK_HOST.search(url):
        return None
    html, final = get(url)
    if not html or len(html) < 1200:
        return None
    if JUNK_HOST.search(final):
        return None
    if not INVITES.search(html):
        return None
    if not REAL.search(html):
        return None

    host = host_of(final)
    emails = [e.lower() for e in EMAIL.findall(html) if not BADMAIL.search(e)]
    # Prefer an address on the site's own domain
    base = host.split(".")[0]
    own = [e for e in emails if base[:6] in e.split("@")[-1]]
    if not own:
        for path in ("/contact", "/contact-us", "/about"):
            extra, _ = get(f"https://{host}{path}", timeout=8)
            if extra:
                more = [e.lower() for e in EMAIL.findall(extra) if not BADMAIL.search(e)]
                own = [e for e in more if base[:6] in e.split("@")[-1]]
                if own:
                    break
    contact = (own or emails or [None])[0]

    title = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    import html as H
    return {
        "site": host,
        "page": final,
        "title": H.unescape(re.sub(r"\s+", " ", title.group(1))).strip()[:90] if title else "",
        "contact": contact,
        "mentions_payment": bool(PAID_HINT.search(html)),
    }


if __name__ == "__main__":
    urls = sys.argv[1:]
    with ThreadPoolExecutor(8) as ex:
        out = [r for r in ex.map(check, urls) if r]
    seen, uniq = set(), []
    for r in out:
        if r["site"] in seen:
            continue
        seen.add(r["site"]); uniq.append(r)
    print(json.dumps(uniq, indent=1))
