import path from 'node:path';
import fs from 'node:fs';
import { Browser, BrowserContextOptions, Page, chromium } from 'playwright';
import sharp from 'sharp';

import { Config, getConfig } from '@scrshot/helpers'

async function getWatermark() {
  return sharp({
    text: {
      text: '<span background="white">scrshot</span>',
      width: 120,
      font: 'sans',
      rgba: true,
      dpi: 240,
      spacing: 2,
    }
  })
    .png()
    .toBuffer();
}

async function createBrowser(browserConfig = {}) {
  return chromium.launch(browserConfig);
}

async function createContext(browser: Browser, config: Config, contextConfig: Partial<BrowserContextOptions> = {}) {
  return browser.newContext({ 
    viewport: {
      width: config?.viewport?.width || 1960,
      height: config?.viewport?.height || 1080
    },
    ...contextConfig
  });
}

const BASEDIR = '.scrshot';

async function createAuthContext(browser: Browser, config: Config) {
  const filename = 'auth.json';
  const needAuth = !fs.existsSync(path.resolve(BASEDIR, filename));

  if (config.auth && needAuth) {
      const authBrowser = await createBrowser({ headless: false });
      const context = await createContext(authBrowser, config);
      const page = await context.newPage();

      const loginURL = new URL(config.auth.path, config.url);
      await page.goto(loginURL.href);

      const successLoginURL = new URL(config.auth.success.path, config.url);
      await page.waitForURL(successLoginURL.href, { timeout: 1_200_000 });

      await context.storageState({
        path: path.resolve(BASEDIR, filename)
      });

      authBrowser.close();

      return createContext(browser, config, {
        storageState: path.resolve(BASEDIR, filename)
      })
  }

  return createContext(browser, config, {
    storageState: path.resolve(BASEDIR, filename)
  })
}

async function setupScreenshotPage(page: Page, { config, screenshot }: { config: Config, screenshot: Config['screenshots'][number]}) {
  const { path, url } = screenshot;
  const screenshotURL = new URL(path, url || config.url);

  screenshotURL.searchParams.append('scrshot', '1')

  await page.goto(screenshotURL.href);
}

async function takeScreenshot(page: Page, screenshot: { name: string, dest: Config['dest']}) {
  const { name, dest } = screenshot;
  const filename = `${name}.png`

  const buffer = await page
    .getByTestId('scrshot-area')
    .screenshot({ scale: 'device', type: 'png' });

  await sharp(buffer)
    // .composite([{
    //   input: await getWatermark(),
    //   gravity: 'southeast',
    // }])
    .toFormat('png')
    .toFile(dest ? path.resolve(dest, filename) : path.resolve(BASEDIR, filename));
}

export async function run() {
  if (!fs.existsSync(path.resolve(BASEDIR))) {
    fs.mkdirSync(BASEDIR);
  }

  const config = await getConfig();
  const browser = await createBrowser();
  const context = config.auth
    ? await createAuthContext(browser, config) 
    : await createContext(browser, config);
  const page = await context.newPage();

  if (!config.screenshots) {
    throw new Error('None screenshots are defined')
  }

  for await (const name of Object.keys(config.screenshots)) {
    const screenshot = config.screenshots[name];
    
    await setupScreenshotPage(page, { config, screenshot });
    await takeScreenshot(page, { name, dest: config.dest })
  }

  await browser.close();
}

export async function help() {
  console.log('dev help');
}

export default {
  run,
  help
}
