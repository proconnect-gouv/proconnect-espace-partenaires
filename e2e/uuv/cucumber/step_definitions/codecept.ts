//

import { expect } from "@playwright/test";
import { Given, Then, World } from "@uuv/playwright";

//

Given("je clique sur {string}", async function (this: World, text: string) {
  await this.page.getByText(text).click();
});

//

Then("je vois {string}", async function (this: World, text: string) {
  await expect(this.page.getByText(text)).toBeVisible();
});

//

Given("je vide le champ focalisé", async function (this: World) {
  await this.page.locator(":focus").clear();
});
