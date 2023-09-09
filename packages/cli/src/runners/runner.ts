import fs from 'node:fs';
import path from 'node:path';

import ora, { Ora } from 'ora';
import ms from 'ms';

import { Config } from '@scrshot/config';

export class Runner {
  config!: Config;
  baseDir = '.scrshot';

  constructor(config: Config) {
    this.config = config;
  }
  
  async wait({ name, spinner, time }: { name: string; spinner: Ora; time: Config['screenshots'][string]['wait'] }) {
    let _time = time;
  
    if (typeof time === 'string') {
      _time = ms(time);
    }

    spinner.text = `Waiting ${ms(Number(_time))} before taking "${name}" screenshot`;

    await new Promise((resolve) => setTimeout(resolve, Number(_time)));
  }

  createSpinner(text: string) {
    return ora(text).start();
  }

  ensureScrshotDirExists() {
    const spinner = this.createSpinner('Validating scrshot directory');

    if (!fs.existsSync(path.resolve(this.baseDir))) {
      fs.mkdirSync(this.baseDir);
      spinner.succeed('.scrshot directory created');
    } else {
      spinner.succeed('.scrshot already exists');
    }
  }

  ensureScreenshotsExists() {
    const spinner = this.createSpinner('Validating screenshots');

    const screenshots = Object.keys(this.config.screenshots);

    if (screenshots.length === 0) {
      spinner.fail('Screenshots are not defined');
    } else {
      spinner.succeed('Screenshots are defined');
    }
  }

  ensureDestExists() {
    const spinner = this.createSpinner('Validating dest');

    if (!fs.existsSync(path.resolve(this.config.dest))) {
      spinner.fail(`${this.config.dest} is not exists`);
    } else {
      spinner.succeed(`${this.config.dest} is valid path`);
    }
  }
}
