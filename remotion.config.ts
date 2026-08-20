import { Config } from "@remotion/cli/config";

// PNG frames encode to yuv420p (TV range). jpeg frames produce yuvj420p
// (full range) + an ICC profile, which makes YouTube abandon processing.
Config.setVideoImageFormat("png");
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
Config.setOverwriteOutput(true);
// Lower concurrency + generous font timeout keeps the cloud render reliable
// (high concurrency starved the font load and timed out delayRender).
Config.setConcurrency(2);
Config.setChromiumIgnoreCertificateErrors(true);
Config.setChromiumDisableWebSecurity(true);
