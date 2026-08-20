#!/bin/bash
# WDPDT daily poster — invoked by launchd when the Mac is on.
# Runs headless Claude with the daily-driver instructions: rotates fresh content,
# generates 12h GCS signed links, and schedules today's YouTube Shorts.
export PATH="/opt/homebrew/bin:/Users/hydermoedeen/.local/bin:/usr/bin:/bin:$PATH"
REPO="/Users/hydermoedeen/Desktop/Claude/remotion-slouch"
LOG="$REPO/cloud/daily.log"
cd "$REPO" || exit 1

echo "===== $(date -u '+%Y-%m-%dT%H:%M:%SZ') daily poster START =====" >> "$LOG"
# Guard: only proceed if gcloud auth + repo are present.
if ! /opt/homebrew/bin/gcloud auth print-access-token >/dev/null 2>&1; then
  echo "gcloud not authenticated — skipping (run: gcloud auth login)" >> "$LOG"
  echo "===== END (no auth) =====" >> "$LOG"
  exit 0
fi

claude -p "$(cat "$REPO/cloud/daily-driver.md")" >> "$LOG" 2>&1
echo "===== $(date -u '+%Y-%m-%dT%H:%M:%SZ') daily poster END (exit $?) =====" >> "$LOG"
