import path from "path";
import fs from "fs";
// import {Transform} from 'stream';
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
async function analyseFiles(inputPaths: string[], outputPath: string) {
  const filePath = path.join(process.cwd(), inputPaths[0]);

  const stream = fs.createReadStream(filePath);

  let array: string[] = [];

  for await (let element of stream) {
    array.push(...element.toString().split("\n"));
  }

  let outputArr: string[] = [];

  for (let num of array) {
    if (num) {
      let validDomain = num.split(".");

      if (validDomain.length > 1) {
        outputArr.push(validDomain.join("."));
      }
    }
  }

  const output = path.join(outputPath);

  let dataOutput = fs.createWriteStream(output);

  const jsonString = JSON.stringify(outputArr, null, 1);

  dataOutput.write(jsonString);
}

export default analyseFiles;
