import path from 'node:path';
import fs from 'node:fs';

import fetch from "node-fetch";
import { Browser, BrowserContext, BrowserContextOptions, LaunchOptions, Page, chromium } from "playwright";

import { Config } from "@scrshot/config";

import { Runner } from "./runner";
import type { Image } from '../outputs/image';


export class WebRunner extends Runner {
  static config = {
    auth: {
      timeout: 1_200_000
    },
    viewport: {
      width: 1960,
      height: 1080
    }
  };

  #browser!: Browser;
  #context!: BrowserContext;
  #page!: Page;
  #screenshot!: Config['screenshots'][string];
  #image!: Image;

  constructor(config: Config, image: Image) {
    super(config);
    this.#image = image;
  }

  async ensureUrlResponding() {
    const url = this.config.url;
    const spinner = this.createSpinner('Validating URL');

    if (!url) {
      spinner.fail('Config URL is not defined')
    } else {
      try {
        const response = await fetch(url, {
          method: 'HEAD',
        });
      
        if (response.ok) {
          spinner.succeed(`${url} is valid`)
        } else {
          spinner.fail('URL is not returning 200 status code')
        }
      } catch (cause) {
        if (cause instanceof Error) {
          spinner.fail(cause?.message as string)
        }
      }
    }
  }

  async createBrowser(options?: LaunchOptions) {
    return chromium.launch(options);
  }

  async createContext(browser: Browser, options?: BrowserContextOptions) {
    return browser.newContext({ 
      viewport: {
        width: this.config?.viewport?.width || WebRunner.config.viewport.width,
        height: this.config?.viewport?.height || WebRunner.config.viewport.height
      },
      ...options
    });
  }

  async createAuthContext(browser: Browser) {
    const spinner = this.createSpinner('Waiting for authorization');
  
    const filename = 'auth.json';
    const needAuth = !fs.existsSync(path.resolve(this.baseDir, filename));
  
    if (this.config.auth && needAuth) {
        const authBrowser = await this.createBrowser({ headless: false });
        const context = await this.createContext(authBrowser);
        const page = await context.newPage();
  
        const loginURL = new URL(this.config.auth.path, this.config.url);
        await page.goto(loginURL.href);
  
        const successLoginURL = new URL(this.config.auth.success.path, this.config.url);
        await page.waitForURL(successLoginURL.href, { timeout: WebRunner.config.auth.timeout });
  
        await context.storageState({
          path: path.resolve(this.baseDir, filename)
        });
  
        authBrowser.close();
  
        spinner.succeed('Authorized');
  
        return this.createContext(browser, {
          storageState: path.resolve(this.baseDir, filename)
        })
    }
  
    spinner.succeed('Authorized');
  
    return this.createContext(browser, {
      storageState: path.resolve(this.baseDir, filename)
    })
  }

  async setup() {
    const { path, url } = this.#screenshot;
    const screenshotURL = new URL(path, url || this.config.url);
  
    screenshotURL.searchParams.append('scrshot', '1')
  
    await this.#page.goto(screenshotURL.href);
  }

  async take(name: string) {
    const filename = `${name}.png`
    const dest = this.config.dest 
      ? path.resolve(this.config.dest, filename)
      : path.resolve(this.baseDir, filename);
    const buffer = await this.#page
      .getByTestId('scrshot-area')
      .screenshot({ scale: 'device', type: 'png' });


    await this.#image.cache(buffer, filename);
    await this.#image.process(buffer, dest);
  }

  async run() {
    this.ensureScrshotDirExists();
    this.ensureScreenshotsExists();
    this.ensureDestExists();

    await this.ensureUrlResponding();

    this.#browser = await this.createBrowser();
    this.#context = this.config.auth 
      ? await this.createAuthContext(this.#browser) 
      : await this.createContext(this.#browser);
    this.#page = await this.#context.newPage();

    for await (const name of Object.keys(this.config.screenshots)) {
      const spinner = this.createSpinner(`Taking "${name}" screenshot`);
      this.#screenshot = this.config.screenshots[name];

      if (this.#screenshot.skip) {
        spinner.info(`Taking "${name}" screenshot [SKIPPED]`);
        continue;
      }

      if (typeof this.#screenshot.auth !== 'undefined' && !this.#screenshot.auth) {
        this.#context = await this.createContext(this.#browser);
        this.#page = await this.#context.newPage();
      }

      await this.setup();

      if (this.#screenshot.wait) {
        await this.wait({ name, spinner, time: this.#screenshot.wait });
      }

      await this.take(name);

      spinner.succeed(`"${name}" screenshot taken 📸`);
    }

    this.#browser.close();
  }
}
