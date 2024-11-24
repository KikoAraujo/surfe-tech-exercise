import { test, expect, Page } from "@playwright/test";

test.describe("Create multiple notes", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("it creates multiple notes", async () => {
    await page.goto("http://localhost:3000");

    await expect(page.getByTestId("create_first_note_button")).toBeVisible();
    await page.getByTestId("create_first_note_button").click();

    await expect(page.getByTestId("note_component_0")).toBeVisible();
    await expect(page.getByText("Add Note")).toBeVisible();

    await page.getByText("Add Note").click();
    await expect(page.getByTestId("note_component_1")).toBeVisible();

    await page.getByText("Add Note").click();
    await expect(page.getByTestId("note_component_2")).toBeVisible();

    await page.getByText("Add Note").click();
    await expect(page.getByTestId("note_component_3")).toBeVisible();
  });
});
