import path from 'node:path';
import fs from 'node:fs';

import detox from 'detox/internals';
import { device, element, by } from 'detox';

import { Config } from "@scrshot/config";

import { Runner } from "./runner";
import sharp from 'sharp';


export class AndroidRunner extends Runner {
  // static config = {};

  #detox = detox;
  #device = device;
  #screenshot!: Config['screenshots'][string];

  constructor(config: Config) {
    super(config);

    if (typeof config.android === 'undefined') {
      throw new Error('Android config is not defined');
    }
  }

  ensureAppExists() {
    const spinner = this.createSpinner('Validating app and test-app exists');
    const appPath = this.config.android?.paths.app!;
    const testPath = this.config.android?.paths.test!;

    if (!fs.existsSync(path.resolve(appPath))) {
      spinner.fail(`Cannot find app at path ${appPath}`);
    } else if (!fs.existsSync(path.resolve(testPath))) {
      spinner.fail(`Cannot find test-app at path ${testPath}`);
    } else {
      spinner.succeed(`App and test-app path exists at ${appPath} and ${testPath}`);
    }
  }

  async createDetox() {
    const spinner = this.createSpinner('Connecting to emulator');
    try {
      await this.#detox.init({
        argv: {
          configuration: 'android'
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
            android: {
              type: "android.apk",
              testBinaryPath: this.config.android?.paths.test,
              binaryPath: this.config.android?.paths.app,
            },
          },
          devices: {
            emulator: {
              type: 'android.emulator',
              device: {
                avdName: this.config.android?.device === 'running' ? '.*' : this.config.android?.device
              }
            }
          },
          configurations: {
            android: {
              device: 'emulator',
              app: 'android',
            }
          }
        }
      });
      spinner.succeed('Emulator connected');
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
  
    await device.launchApp({ url: screenshotURL, newInstance: true });
  }

  async take(name: string) {
    const filename = `${name}.png`
    const dest = this.config.android?.dest 
      ? path.resolve(this.config.android?.dest , filename) 
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

    this.#device.terminateApp();
    this.#detox.cleanup();
  }
}
