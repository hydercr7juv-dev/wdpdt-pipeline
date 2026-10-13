#!/usr/bin/env node
// Pick the next unused topic for the daily generator, and refuse anything
// that retreads a published one.
//
// The old rule was "ls src/videos and don't repeat". That failed: a model
// inventing a topic cannot tell that `windLanding` is the same question as
// the already-published `landingWind`, so the channel ended up with three
// "land into the wind" videos splitting each other's audience.
//
//   node scripts/pick-topic.mjs            -> print next N unused topics (N=1)
//   node scripts/pick-topic.mjs 2          -> next 2
//   node scripts/pick-topic.mjs --check "why planes land into the wind"
//                                          -> exit 1 if it duplicates
//   node scripts/pick-topic.mjs --use slug -> mark a topic consumed
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const BANK = path.join(root, "content/question-bank.json");
const USED = path.join(root, "content/topics-used.json");
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 1) + "\n");

const norm = (s) =>
  s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

const STOP = new Set(("why what how do does the a an is are of on in to for " +
  "planes plane aircraft jet jets pilots pilot your you it its that this " +
  "shorts always never so really actually before after when").split(" "));

const terms = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w)));

// Does `text` collide with anything already published?
function collision(text) {
  const { used } = read(USED);
  const t = norm(text);
  const tt = terms(text);
  for (const [topic, aliases] of Object.entries(used)) {
    for (const a of aliases) {
      const na = norm(a);
      if (na && t.includes(na)) return { topic, alias: a, why: "alias phrase appears verbatim" };
    }
    // Strong keyword overlap counts as the same question even when worded differently.
    const at = terms([topic, ...aliases].join(" "));
    if (at.size) {
      const shared = [...tt].filter((w) => at.has(w));
      if (shared.length >= 2) {
        return { topic, alias: shared.join("+"), why: "two or more distinctive words shared" };
      }
    }
  }
  return null;
}

const argv = process.argv.slice(2);

if (argv[0] === "--check") {
  const text = argv.slice(1).join(" ");
  if (!text) { console.error("usage: --check \"<title or question>\""); process.exit(2); }
  const c = collision(text);
  if (c) {
    console.error(`DUPLICATE of "${c.topic}" (${c.why}: ${c.alias})`);
    console.error("Pick a different topic. Run with no arguments for the next unused one.");
    process.exit(1);
  }
  console.log("OK, not a duplicate");
  process.exit(0);
}

if (argv[0] === "--use") {
  const slug = argv[1];
  if (!slug) { console.error("usage: --use <slug>"); process.exit(2); }
  const bank = read(BANK);
  const row = bank.bank.find((b) => b.slug === slug);
  if (!row) { console.error(`no such slug in bank: ${slug}`); process.exit(2); }
  row.used = true;
  write(BANK, bank);
  const u = read(USED);
  u.used[slug] = [norm(row.question), ...norm(row.keywords).split(" ").filter((w) => w.length > 4)];
  write(USED, u);
  console.log(`marked used: ${slug}`);
  process.exit(0);
}

const n = Math.max(1, parseInt(argv[0] || "1", 10) || 1);
const { bank } = read(BANK);
const open = bank.filter((b) => !b.used && !collision(b.question));
if (!open.length) {
  console.error("Question bank is empty. Add topics to content/question-bank.json before generating.");
  process.exit(1);
}
console.log(JSON.stringify(open.slice(0, n), null, 1));
console.error(`\n${open.length} unused topics remain of ${bank.length}.`);
