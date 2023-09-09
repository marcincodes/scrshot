import ora from 'ora';

import { getConfig } from '@scrshot/config'

import { WebRunner } from '../runners/web';
import { IOSRunner } from '../runners/ios';
import { AndroidRunner } from '../runners/android';

import { Image } from '../outputs/image';


export async function run() {
  const spinner = ora('Loading config').start();
  const { config, filepath, error } = await getConfig();

  if (error) {
    spinner.fail(error.message);
    return;
  }

  spinner.succeed(`Config loaded from ${filepath}`);

  const image = new Image(config);

  if (typeof config.ios !== 'undefined') {
    const ios = new IOSRunner(config);
    await ios.run();
  } else if (typeof config.android !== 'undefined') {
    const ios = new AndroidRunner(config);
    await ios.run();
  } else {
    const web = new WebRunner(config, image);
    await web.run();
  }
}

export async function help() {
  console.log('Run screenshots generation in development mode');
}

export default {
  run,
  help
}
