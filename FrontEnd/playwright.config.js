import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const isCI = Boolean(process.env.CI);

const baseURL = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";

const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/.test(baseURL);

export default defineConfig({
  testDir: "./tests",

  testMatch: "**/*.spec.js",

  timeout: 60_000,

  expect: {
    timeout: 15_000,
  },

  fullyParallel: false,

  workers: 1,

  retries: isCI ? 2 : 0,

  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL,

    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  ...(isLocal
    ? {
        webServer: {
          command: "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort",

          url: "http://127.0.0.1:5173",

          reuseExistingServer: !isCI,

          timeout: 60_000,
        },
      }
    : {}),
});
