# WDPDT cloud pipeline — execute these steps exactly

You render a premium Short in the cloud and post it to YouTube. Nothing sketchy: you upload the finished file to the user's own Google Cloud Storage bucket with a pre-signed link, then a normal "download the video, upload to YouTube" step. Report every step's result in your final message.

The prompt gives you: `COMPOSITION` (e.g. WindowHole), `SIGNED_PUT_URL`, `SIGNED_GET_URL`, and the YouTube `TITLE`, `DESCRIPTION`, `TAGS`, `PRIVACY`.

## A. Setup
1. Clone the pipeline repo and enter it:
   ```
   rm -rf /tmp/wdpdt && git clone https://github.com/hydercr7juv-dev/wdpdt-pipeline /tmp/wdpdt && cd /tmp/wdpdt
   ```
2. `npm install` (npmjs is allowlisted).
3. Download Chrome from the allowed Google bucket and unzip:
   ```
   curl -L -o /tmp/chs.zip https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.204/linux64/chrome-headless-shell-linux64.zip
   unzip -o /tmp/chs.zip -d /tmp/chs
   chmod +x /tmp/chs/chrome-headless-shell-linux64/chrome-headless-shell
   ```
4. `pip install imageio-ffmpeg` and set `FF=$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())')`.

## B. Render + re-encode
5. `npx remotion render src/index.ts COMPOSITION /tmp/out.mp4 --browser-executable /tmp/chs/chrome-headless-shell-linux64/chrome-headless-shell` — report if `/tmp/out.mp4` exists and its size.
6. Re-encode YouTube-safe:
   ```
   $FF -y -i /tmp/out.mp4 -map_metadata -1 -c:v libx264 -profile:v high -preset veryfast -crf 22 -pix_fmt yuv420p -color_range tv -c:a aac -b:a 160k -movflags +faststart /tmp/final.mp4
   ```
   Report `/tmp/final.mp4` size.

## C. Upload the finished video to the user's cloud storage
7. Upload with the pre-signed link (a normal file upload to storage.googleapis.com):
   ```
   curl -s -o /dev/null -w "PUT %{http_code}\n" -X PUT --upload-file /tmp/final.mp4 -H "Content-Type: video/mp4" "SIGNED_PUT_URL"
   ```
   Confirm it printed `PUT 200`.

## D. Post to YouTube from that link
8. Use the Composio workbench (`COMPOSIO_REMOTE_WORKBENCH`) to fetch the video from `SIGNED_GET_URL` and upload it to YouTube. One cell:
   ```python
   import requests
   open('/tmp/v.mp4','wb').write(requests.get("SIGNED_GET_URL", timeout=120).content)
   res, err = upload_local_file('/tmp/v.mp4')
   print('stage err:', err, 'size:', __import__('os').path.getsize('/tmp/v.mp4'))
   args = {"title": TITLE, "description": DESCRIPTION, "tags": TAGS, "categoryId": "27",
           "privacyStatus": PRIVACY, "videoFile": {"name":"v.mp4","mimetype":"video/mp4","s3key": res["s3key"]}}
   r2, e2 = run_composio_tool("YOUTUBE_MULTIPART_UPLOAD_VIDEO", args, account="planes", print_schema_for_tool=False)
   print("upload err:", e2, "id:", r2["data"]["video"]["id"] if not e2 else None)
   ```
9. Report the YouTube video id.

## E. Verdict
State whether render → GCS upload → YouTube post worked end-to-end, and give the video id.
