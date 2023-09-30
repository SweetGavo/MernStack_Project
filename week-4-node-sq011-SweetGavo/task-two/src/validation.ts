
import fs from 'fs';
import path from 'path';
import dns, { MxRecord } from 'dns';
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 *
 */
interface ErrorObject extends Error {
  path?: string;
  systemC?: string;
  stack?: string;
  err?: number;
  code?: string;
  
}
// validate  all email//
const validateMxRecord = async (domain: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err: ErrorObject | null, addresses: MxRecord[]) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
};


async function validatemailreal(emails: string[]) {
  
  const checkedDomains = emails.map(async (email) => {
    const [uname, dname] = email.split('@');
    const checked = await validateMxRecord(dname);
    const domain = `${uname}@${dname}`;
    return { checked, domain };
  });
  const resolvedDomains = await Promise.all(checkedDomains);
  const valid: string[] = [];
  // Push valid domains
  resolvedDomains.forEach((item) => {
    if(item.checked === true) valid.push(item.domain);
  });
  return valid;

  

// Check for valid emails
const validateEmail = (emails: string[]) => {
  const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const validEmail: string[] = [];
  emails.forEach((val) => {
    if (re.test(String(val).toLowerCase())) validEmail.push(val);
  });
  return validEmail;
};

// The main function
async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const resolvePathin = path.join(__dirname, inputPath[0]);
  // readfile streams
  const data = new Promise((resolve, reject) => {
    const stream = fs.createReadStream(resolvePathin, { encoding: 'utf8' });
    stream.on('data', (val: string) => {
      if (val){
        resolve(val);
      } 
      else {

        console.log('Data not found');
    }

    });
  });

  // convert emails to string and split return an array
  const email = JSON.stringify(await data).split('\\n');

  // validate email address structure
  const validEmailStructure = validateEmail(email);

  // email address that can send emails
  const validEmailMx = await validatemailreal(validEmailStructure);
  validEmailMx.unshift('Email');

  // write file to outputpath
  const resolveOutputPath = path.join(__dirname, outputFile);
  fs.writeFile(
    resolveOutputPath,
    JSON.stringify(validEmailMx, null, 2),
    'utf8',
    (err) => {
      if (err) {
        return err;
      }
    },
  );
}
export default validateEmailAddresses;


















