import { test, expect, Page } from "@playwright/test";

test.describe("Create first note", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("it creates the first note", async () => {
    await page.goto("http://localhost:3000");

    await expect(page.getByTestId("create_first_note_button")).toBeVisible();
    await page.getByTestId("create_first_note_button").click();

    await expect(page.getByTestId("note_component_0")).toBeVisible();
  });
});
