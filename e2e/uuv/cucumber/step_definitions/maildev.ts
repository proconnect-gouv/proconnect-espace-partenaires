//

import { expect } from "@playwright/test";
import { Given, When, type World } from "@uuv/playwright";

//

const maildevApi = () => {
  const { MAILDEV_API_HOST: host = "localhost", MAILDEV_API_PORT: port = 1080 } = process.env;
  return `http://${host}:${port}`;
};

//

Given("une boîte de réception vide", async function () {
  const response = await fetch(`${maildevApi()}/email/all`, {
    method: "DELETE",
  });
  const body = await response.json();

  expect(response.ok, JSON.stringify(body)).toBe(true);
});

When(
  "je vais à l'intérieur de l'email avec les filtres",
  async function (this: World, dataTable: any) {
    const filters = dataTable.rowsHash();

    const search_params = new URLSearchParams(filters);
    const response = await fetch(`${maildevApi()}/email?${search_params}`, {
      method: "GET",
    });
    const body: [{ id: string }] = await response.json();
    const [{ id }] = body;

    {
      // Mark as read
      await fetch(`${maildevApi()}/email/${id}`, {
        method: "GET",
      });
    }

    this.testInfo.annotations.push({
      type: "email_id",
      description: id,
    });

    await this.page.goto(`${maildevApi()}/email/${id}/html`);
    await this.page.$eval("a", (el) => el.removeAttribute("target"));
  },
);

Given("je supprime l'email", async function (this: World) {
  const id = this.testInfo.annotations.find((a) => a.type === "email_id")?.description;
  if (!id) {
    throw new Error("No email id found");
  }

  await fetch(`${maildevApi()}/email/${id}`, {
    method: "DELETE",
  });
});
