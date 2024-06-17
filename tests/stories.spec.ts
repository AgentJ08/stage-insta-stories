import { test, expect, devices } from '@playwright/test';

const deploymentUrl = 'https://stage-insta-stories-kappa.vercel.app';

test('should have page title', async ({ page }) => {
    await page.goto(`${deploymentUrl}`);
    await expect(page).toHaveTitle(/Stage Insta Stories/);
});

test('should render stories component on mobile devices', async ({ page }) => {
    await page.goto(`${deploymentUrl}`);
    const storiesComponent = page.locator('.overflow-x-auto');
    await expect(storiesComponent).toBeVisible();
});

test('should render correct number of stories', async ({ page }) => {
    await page.goto(`${deploymentUrl}`);
    const stories = page.locator('.overflow-x-auto > div');
    await expect(stories).toHaveCount(10);
});

test('should open a story on click', async ({ page }) => {
    await page.goto(`${deploymentUrl}`);
    const story = page.locator('.overflow-x-auto > div').first();
    await story.click();
    const storyView = page.locator('.h-screen.w-screen');
    await expect(storyView).toBeVisible();
});

test('should navigate through stories', async ({ page }) => {
    await page.goto(`${deploymentUrl}`);
    const story = page.locator('.overflow-x-auto > div').first();
    await story.click();
    const rightArrow = page.locator('.-mt-20 > div').nth(1);
    const storyImage = page.locator('.w-full.h-full.object-fill');
    const initialSrc = await storyImage.getAttribute('src');
    await rightArrow.click();
    const newSrc = await storyImage.getAttribute('src');
    expect(newSrc).not.toEqual(initialSrc);
});

test('should close story view', async ({ page }) => {
    await page.goto(`${deploymentUrl}`);
    const story = page.locator('.overflow-x-auto > div').first();
    await story.click();
    const closeButton = page.locator('button:has-text("x")');
    await closeButton.click();
    const storyView = page.locator('.h-screen.w-screen');
    await expect(storyView).not.toBeVisible();
});