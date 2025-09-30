import { After, Before, Given } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";

let browser: Browser;
let page: Page;

Before(async function () {
  const headless = process.env.PW_HEADED !== "1";
  const slowMo = process.env.PW_SLOW_MO ? parseInt(process.env.PW_SLOW_MO) : undefined;

  browser = await chromium.launch({
    headless,
    slowMo,
  });

  const contextOptions: any = {};

  if (process.env.PW_VIDEO === "1") {
    contextOptions.recordVideo = { dir: "test-results/videos" };
  }

  if (process.env.PW_SCREENSHOT) {
    contextOptions.screenshot = process.env.PW_SCREENSHOT;
  }

  const context = await browser.newContext(contextOptions);
  page = await context.newPage();
});

After(async function () {
  await page.close();
  await browser.close();
});

//

Given("je suis sur la page {string}", async (path: string) => {
  await page.goto(`http://localhost:3000${path}`);
});

Given("je navigue sur la page", async () => {
  await page.goto(`http://localhost:3000/`);
});
