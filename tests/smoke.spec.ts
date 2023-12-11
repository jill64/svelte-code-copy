import { expect, test } from '@playwright/test'
import { code } from '../src/routes/code'

test('smoke', async ({ page, browser, browserName }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'svelte-code-copy' })
  ).toBeVisible()

  await expect(page.getByText('Your code here')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Copy' })).toBeVisible()

  if (browserName === 'chromium') {
    browser.contexts().forEach((x) => x.grantPermissions(['clipboard-write']))
  }

  await page.getByRole('button', { name: 'Copy' }).click()

  await expect(page.getByRole('alert')).toContainText('Copied!')

  if (browserName === 'webkit' || browserName === 'chromium') {
    browser.contexts().forEach((x) => x.grantPermissions(['clipboard-read']))
  }

  if (browserName !== 'firefox') {
    const text = await page.evaluate(() => navigator.clipboard.readText())
    expect(text).toBe(code())
  }
})
