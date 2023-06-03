// @ts-expect-error
import minimist from 'minimist';

import dev from './commands/dev';
import license from './commands/license';

const argv = minimist(process.argv.slice(2));
const command = argv._[0];

switch(command) {
  case 'dev':
    if (argv.help) {
      dev.help();
    } else {
      dev.run();
    }
  break;
  case 'license':
    if (argv.help) {
      license.help();
    } else {
      license.run();
    }
  break;
  default:
    // init
  break;
}



