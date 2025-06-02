
import fs from 'fs';
import path from 'path';
import dns, { MxRecord } from 'dns';
import { parse } from 'csv-parse/sync';
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 *
 */


const isValidEmail = (email: string): boolean => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return re.test(email.toLowerCase());
};

const validateMx = (domain: string): Promise<boolean> => {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      resolve(!err && addresses && addresses.length > 0);
    });
  });
};

async function validateEmailAddresses(inputPaths: string[], outputFile: string) {
  const emails: string[] = [];

  for (const inputPath of inputPaths) {
    const content = fs.readFileSync(path.resolve(inputPath), 'utf-8');
    const records = parse(content, { columns: false, skip_empty_lines: true });

    records.forEach(([emailRaw]: string[]) => {
      const email = emailRaw.trim();
      if (email) emails.push(email);
    });
  }

  const validFormat = emails.filter(isValidEmail);
  const result: { email: string; hasMX: boolean }[] = [];

  for (const email of validFormat) {
    const domain = email.split('@')[1];
    const hasMX = await validateMx(domain);
    result.push({ email, hasMX });
  }

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
}

export default validateEmailAddresses;
