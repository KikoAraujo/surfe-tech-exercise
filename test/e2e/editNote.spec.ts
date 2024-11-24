import { test, expect, Page } from "@playwright/test";

test.describe("Edit note", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("it edits a note", async () => {
    await page.goto("http://localhost:3000");

    await expect(page.getByTestId("create_first_note_button")).toBeVisible();
    await page.getByTestId("create_first_note_button").click();

    await expect(page.getByTestId("note_component_0")).toBeVisible();

    await page
      .getByTestId("note_component_0")
      .getByTestId("title_input")
      .click();
    await page
      .getByTestId("note_component_0")
      .getByTestId("title_input")
      .fill("e2e test");

    await page
      .getByTestId("note_component_0")
      .getByTestId("textarea_with_mentions")
      .locator("div")
      .click();
    await page
      .getByTestId("note_component_0")
      .getByTestId("textarea_with_mentions")
      .locator("div")
      .fill("e2e test");

    await page.reload();
    await expect(page.getByTestId("note_component_0")).toBeVisible();

    await expect(
      page.getByTestId("note_component_0").getByTestId("title_input")
    ).toHaveValue("e2e test");
    await expect(
      page
        .getByTestId("note_component_0")
        .getByTestId("textarea_with_mentions")
        .locator("div")
    ).toHaveText("e2e test");
  });
});
