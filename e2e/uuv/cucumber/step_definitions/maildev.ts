//

import { Given, When, type World } from "@uuv/playwright";

//

const maildevApi = () => {
  const { MAILDEV_API_HOST: host = "localhost", MAILDEV_API_PORT: port = 1080 } = process.env;
  return `http://${host}:${port}`;
};

//

// The mail is sent over SMTP after the browser gets its answer, so it can still
// be in flight when the step runs.
const waitForEmail = async (search_params: URLSearchParams, timeout = 10_000) => {
  const deadline = Date.now() + timeout;
  do {
    const response = await fetch(`${maildevApi()}/email?${search_params}`, {
      method: "GET",
    });
    const [email]: { id: string }[] = await response.json();
    if (email) return email.id;
    await new Promise((resolve) => setTimeout(resolve, 200));
  } while (Date.now() < deadline);

  throw new Error(`No email matching ${search_params} after ${timeout}ms`);
};

//

When(
  "je vais à l'intérieur de l'email avec les filtres",
  async function (this: World, dataTable: any) {
    const filters = dataTable.rowsHash();

    const id = await waitForEmail(new URLSearchParams(filters));

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
