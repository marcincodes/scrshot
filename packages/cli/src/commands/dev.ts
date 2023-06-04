import path from 'node:path';
import fs from 'node:fs';
import { Browser, BrowserContextOptions, Page, chromium } from 'playwright';
import sharp from 'sharp';
import ora from 'ora';
import ms from 'ms';

import { Config, getConfig } from '@scrshot/helpers'
import { validateLicense } from '../helpers/license';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const authSpinner = ora('Waiting for authorization').start();

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

      authSpinner.succeed('Authorized');

      return createContext(browser, config, {
        storageState: path.resolve(BASEDIR, filename)
      })
  }

  authSpinner.succeed('Authorized');

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
  const configSpinner = ora('Loading config').start();

  if (!fs.existsSync(path.resolve(BASEDIR))) {
    fs.mkdirSync(BASEDIR);
  }

  const { config, filepath } = await getConfig();

  if (!fs.existsSync(path.resolve(config.dest))) {
    configSpinner.fail(`${config.dest} is not existing`);
    return;
  }

  configSpinner.succeed(`Config loaded from ${filepath}`);

  const licenseSpinner = ora('Validating license').start();

  const { error } = await validateLicense(config.license);
  
  if (error) {
    licenseSpinner.fail('License invalid');
    return;
  }

  licenseSpinner.succeed('License valid');


  const browser = await createBrowser();
  const context = config.auth
    ? await createAuthContext(browser, config) 
    : await createContext(browser, config);
  const page = await context.newPage();

  for await (const name of Object.keys(config.screenshots)) {
    const screenshotSpinner = ora(`Taking "${name}" screenshot`).start();
    screenshotSpinner.indent = 0;

    const screenshot = config.screenshots[name];

    if (screenshot.skip) {
      screenshotSpinner.info(`Taking "${name}" screenshot [SKIPPED]`);

      continue;
    }

    if (typeof screenshot.auth !== 'undefined' && !screenshot.auth) {
      // const unauthorizedBrowser = await createBrowser({ headless: false });
      const unauthorizedContext = await createContext(browser, config);
      const unauthorizedPage = await unauthorizedContext.newPage();

      await setupScreenshotPage(unauthorizedPage, { config, screenshot });

      if (screenshot.wait) {
        let _wait = screenshot.wait;
  
        if (typeof screenshot.wait === 'string') {
          _wait = ms(screenshot.wait);
        }
  
        screenshotSpinner.warn(`Taking "${name}" screenshot [SLEEPING ${ms(Number(_wait))}]`);
  
        await sleep(Number(_wait));
      }
  
      await takeScreenshot(unauthorizedPage, { name, dest: config.dest });
  
      screenshotSpinner.succeed(`"${name}" screenshot taken 📸`);
    } else {
      await setupScreenshotPage(page, { config, screenshot });

      if (screenshot.wait) {
        let _wait = screenshot.wait;
  
        if (typeof screenshot.wait === 'string') {
          _wait = ms(screenshot.wait);
        }
  
        screenshotSpinner.warn(`Taking "${name}" screenshot [SLEEPING ${ms(Number(_wait))}]`);
  
        await sleep(Number(_wait));
      }
  
      await takeScreenshot(page, { name, dest: config.dest });
  
      screenshotSpinner.succeed(`"${name}" screenshot taken 📸`);
    }
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
