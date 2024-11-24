import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./") });

Object.assign(global, {
  BASE_URL: "http://localhost:3000",
});

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [],
  expect: { timeout: 30000 },
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
    video: "off",
    screenshot: "off",
    headless: true,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 500,
    },
    permissions: ["geolocation"],
    geolocation: { longitude: 12.4924, latitude: 41.8902 },
    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "light",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
