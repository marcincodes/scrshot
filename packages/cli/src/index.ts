import minimist from 'minimist';

import dev from './commands/dev';

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
  default:
    console.error(`${command} command not found`);
  break;
}



