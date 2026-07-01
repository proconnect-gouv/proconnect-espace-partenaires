//

import { expect } from "@playwright/test";
import { Given, Then, World } from "@uuv/playwright";
import { randomBytes } from "node:crypto";
import { PrismaClient } from "../../../../prisma/generated_clients/db_espace";

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

//

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL ?? "postgresql://usr:pwd@localhost:5432/proconnect_ep",
    },
  },
});

//

Given("je suis connecté en tant que {string}", async function (this: World, email: string) {
  const user = await prisma.user.create({
    data: { email },
  });

  const sessionToken = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: { sessionToken, userId: user.id, expires },
  });

  await this.page.context().addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      expires: expires.getTime() / 1000,
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
});

//
