import { defineConfig, devices } from "@playwright/test";
import { buildConfig } from "@uuv/playwright";

export default defineConfig({
  testDir: buildConfig(["features/*.feature"]),

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [["html", { open: "never" }]],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://localhost:3000",

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",

    // Video recording
    video: process.env.PW_VIDEO === "1" ? "on" : "on-first-retry",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: [
    {
      command: "npm run start",
      cwd: "../..",
      url: "http://localhost:3000",
      env: {
        NEXTAUTH_SECRET: "NEuXWL7esTRTr+I3mZRYM8wvywZ6jiyUvKxqlYReras=",
        DATABASE_URL: "postgresql://usr:pwd@localhost:5432/proconnect_ep",
        PCDB_API_URL: "http://localhost:8000",
        PCDB_API_SECRET: "pcdb-api-secret-key",
      },
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "docker compose up --wait",
      cwd: "../..",
    },
    {
      command: [
        "docker compose up postgresql --wait",
        "npx prisma db push --schema=./prisma/db_espace.prisma",
      ].join(" && "),
      cwd: "../..",
      env: {
        DATABASE_URL: "postgresql://usr:pwd@localhost:5432/proconnect_ep",
      },
    },
    {
      command: [
        "docker compose up mongo --wait",
        [
          "docker compose exec -T mongo",
          "mongosh",
          "--authenticationDatabase admin",
          "--password pass",
          "--tls",
          "--tlsAllowInvalidCertificates",
          "--username fc_admin",
          "core-fca-low",
          `--eval "db.dropDatabase()"`,
        ].join(" "),
        "npx prisma db push --schema=./prisma/db_proconnect.prisma",
      ].join(" && "),
      cwd: "../..",
      env: {
        MONGODB_CONNECTION_STRING:
          "mongodb://fc:pass@localhost:27017/core-fca-low?authSource=admin&replicaSet=rs0&directConnection=true",
      },
    },
  ],
});
