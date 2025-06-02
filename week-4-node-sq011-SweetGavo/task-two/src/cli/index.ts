import { Command } from 'commander';
import { sync } from 'glob';
import path from 'path';
import chalk from 'chalk';

import analyseFiles from '../analysis';
import validateEmailAddresses from '../validation';

const program = new Command();

program
  .command('analysis <input> <output>')
  .description('Analyse emails for TLDs, duplicates, and domain grouping')
  .action((input, output) => {
    const inputFiles = sync(input);
    if (!inputFiles.length) {
      console.error(chalk.red('❌ No CSV files found at provided input path.'));
      process.exit(1);
    }

    const outputFile = path.resolve(output);
    analyseFiles(inputFiles, outputFile);
  });

program
  .command('validate <input> <output>')
  .description('Validate emails for format and MX records')
  .action((input, output) => {
    const inputFiles = sync(input);
    if (!inputFiles.length) {
      console.error(chalk.red('❌ No CSV files found at provided input path.'));
      process.exit(1);
    }

    const outputFile = path.resolve(output);
    validateEmailAddresses(inputFiles, outputFile);
  });

program.parse(process.argv);
