import { Command } from 'commander';
import { sync } from 'glob';
import path from 'path';
import chalk from 'chalk';

import validateEmailAddresses from '../validation';
import analyseFiles from '../analysis';

const program = new Command();

program
  .version('1.0.0')
  .description('Email analysis tool')
  .option('-i, --input <files...>', 'Input files to analyze')
  .option('-o, --output <file>', 'Output file for results')
  .action(async ({ input, output }) => {
    try {
      const inputFiles = input.map((file: string) => path.resolve(file));
      const outputFile = path.resolve(output);
      
      const validationResult = await validateEmailAddresses(
        inputFiles,
        outputFile
      );

      if (typeof validationResult === 'string') {
        console.error(chalk.red(validationResult));
        return;
      }

      await analyseFiles(inputFiles, outputFile);
      console.log(
        chalk.green(
          'Analysis complete! Results written to:',
          outputFile
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red('Error:', error.message));
      } else {
        console.error(chalk.red('An unknown error occurred'));
      }
    }
  });

program
  .command('validate <input> <output>')
  .description('Validate emails for format and MX records')
  .action((input, output) => {
    const inputFiles = sync(input);
    if (!inputFiles.length) {
      throw new Error('No CSV files found at provided input path.');
    }

    const outputFile = path.resolve(output);
    validateEmailAddresses(inputFiles, outputFile);
  });

program.parse(process.argv);
