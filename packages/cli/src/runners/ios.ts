import path from 'node:path';
import fs from 'node:fs';

import detox from 'detox/internals';
import { device, element, by } from 'detox';

import { Config } from "@scrshot/config";

import { Runner } from "./runner";
import sharp from 'sharp';


export class IOSRunner extends Runner {
  // static config = {};

  #detox = detox;
  #device = device;
  #screenshot!: Config['screenshots'][string];

  constructor(config: Config) {
    super(config);

    if (typeof config.ios === 'undefined') {
      throw new Error('IOS config is not defined');
    }
  }

  ensureAppExists() {
    const spinner = this.createSpinner('Validating app exists');

    if (!fs.existsSync(path.resolve(this.config.ios?.path!))) {
      spinner.fail(`Cannot find app at path ${this.config.ios?.path}`);
    } else {
      spinner.succeed(`App exists at path ${this.config.ios?.path}`);
    }
  }

  async createDetox() {
    const spinner = this.createSpinner('Connecting to simulator');
    try {
      await this.#detox.init({
        argv: {
          configuration: 'ios'
        },
        override: {
          logger: {
            overrideConsole: false,
            level: 'error'
          },
          artifacts: {
            rootDir: path.resolve(this.baseDir, 'cache')
          },
          apps: {
            ios: {
              type: 'ios.app',
              binaryPath: this.config.ios?.path,
            },
          },
          devices: {
            simulator: {
              type: 'ios.simulator',
              device: {
                type: this.config.ios?.device
              }
            },
          },
          configurations: {
            ios: {
              device: 'simulator',
              app: 'ios',
            },
          }
        }
      });
      spinner.succeed('Simulator connected');
    } catch (cause) {
      if (cause instanceof Error) {
        spinner.fail(cause.message);
      }
    }
  }

  async launchApp() {
    const spinner = this.createSpinner('Launching app');
    try {
      await this.#device.launchApp();

      spinner.succeed('App launched');
    } catch (cause) {
      if (cause instanceof Error) {
        spinner.fail(cause.message)
      }
    }
  }

  async setup() {
    const url = this.#screenshot.url || this.config.url;
    const screenshotURL = `${url}:${this.#screenshot.path}`;
  
    await this.#device.openURL({ url: screenshotURL });
  }

  async take(name: string) {
    const filename = `${name}.png`
    const dest = this.config.ios?.dest 
      ? path.resolve(this.config.ios.dest , filename) 
      : this.config.dest 
        ? path.resolve(this.config.dest, filename)
        : path.resolve(this.baseDir, filename);

    const img = await element(by.id("scrshot-area")).takeScreenshot(name);
  
    await sharp(img)
      // .composite([{
      //   input: await getWatermark(),
      //   gravity: 'southeast',
      // }])
      .toFormat('png')
      .toFile(dest);
  }

  async run() {
    this.ensureScrshotDirExists();
    this.ensureScreenshotsExists();
    this.ensureDestExists();
    this.ensureAppExists();

    await this.createDetox();
    await this.launchApp();

    for await (const name of Object.keys(this.config.screenshots)) {
      const spinner = this.createSpinner(`Taking "${name}" screenshot`);
      this.#screenshot = this.config.screenshots[name];

      if (this.#screenshot.skip) {
        spinner.info(`Taking "${name}" screenshot [SKIPPED]`);
        continue;
      }

      await this.setup();

      if (this.#screenshot.wait) {
        await this.wait({ name, spinner, time: this.#screenshot.wait });
      }

      await this.take(name);

      spinner.succeed(`"${name}" screenshot taken 📸`);
    }

    this.#detox.cleanup();
  }
}
