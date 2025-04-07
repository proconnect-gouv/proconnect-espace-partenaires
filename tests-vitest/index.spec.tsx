import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../src/pages/index";

test("Has index page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Template" })).toBeDefined();
});
