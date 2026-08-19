# WDPDT cloud pipeline — execute these steps exactly

You are running inside a scheduled cloud routine with this repo cloned in. You have Bash + the Composio MCP tools. Network egress is allowlisted: only `registry.npmjs.org` and `storage.googleapis.com` are reachable by curl; everything else must go through MCP tools. Report every step's result in your final message.

## A. Setup
1. Clone the pipeline repo and enter it:
   ```
   rm -rf /tmp/wdpdt && git clone https://github.com/hydercr7juv-dev/wdpdt-pipeline /tmp/wdpdt && cd /tmp/wdpdt
   ```
   (It is public — no auth needed. It has `package.json`, `src/`, `public/assets/*.mp4`.)
2. `npm install` (npmjs is allowlisted).
3. Download Chrome from the allowed Google bucket and unzip:
   ```
   curl -L -o /tmp/chs.zip https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.204/linux64/chrome-headless-shell-linux64.zip
   unzip -o /tmp/chs.zip -d /tmp/chs
   chmod +x /tmp/chs/chrome-headless-shell-linux64/chrome-headless-shell
   ```
   Confirm `/tmp/chs/chrome-headless-shell-linux64/chrome-headless-shell --version` prints.
4. `pip install imageio-ffmpeg` and set `FF=$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())')`.

## B. Render + re-encode ONE composition (test = `WindowHole`)
5. `npx remotion render src/index.ts WindowHole /tmp/out.mp4 --browser-executable /tmp/chs/chrome-headless-shell-linux64/chrome-headless-shell` — report if `/tmp/out.mp4` exists and its size.
6. Re-encode YouTube-safe:
   ```
   $FF -y -i /tmp/out.mp4 -map_metadata -1 -c:v libx264 -profile:v high -preset veryfast -crf 24 -pix_fmt yuv420p -color_range tv -c:a aac -b:a 160k -movflags +faststart /tmp/final.mp4
   ```
   Report `/tmp/final.mp4` size and the sha256 (`sha256sum /tmp/final.mp4`).

## C. Bridge the file into Composio (the sandbox can't host files; MCP is the only path)
The routine sandbox and the Composio workbench are SEPARATE sandboxes. Move the bytes via base64 chunks:
7. `split -b 3000000 /tmp/final.mp4 /tmp/chunk_` then `ls /tmp/chunk_*` (ordered).
8. In the Composio workbench, start the file: run a `COMPOSIO_REMOTE_WORKBENCH` cell `open('/tmp/final.mp4','wb').close()`.
9. For EACH chunk in order: `base64 -w0 /tmp/chunk_XX` in Bash, then a `COMPOSIO_REMOTE_WORKBENCH` cell:
   ```python
   import base64
   open('/tmp/final.mp4','ab').write(base64.b64decode(""" <PASTE_BASE64> """))
   ```
10. Verify in the workbench that the reassembled size and sha256 match step 6 (`import hashlib,os; print(os.path.getsize('/tmp/final.mp4'), hashlib.sha256(open('/tmp/final.mp4','rb').read()).hexdigest())`). If they don't match, stop and report.

## D. Post (PRIVATE for the test)
11. In the workbench: `res,err = upload_local_file('/tmp/final.mp4')` → take `res['s3key']`.
12. In the workbench: `run_composio_tool("YOUTUBE_MULTIPART_UPLOAD_VIDEO", {"title":"PIPELINE TEST - private, delete me","description":"cloud pipeline integration test","tags":["test"],"categoryId":"27","privacyStatus":"private","videoFile":{"name":"final.mp4","mimetype":"video/mp4","s3key":RES_S3KEY}}, account="planes")` → report the returned video id.

## E. Verdict
State clearly: did clone → render → re-encode → bridge → post work end-to-end? Give the video id (it will be deleted) and the exact blocker for anything that failed.
