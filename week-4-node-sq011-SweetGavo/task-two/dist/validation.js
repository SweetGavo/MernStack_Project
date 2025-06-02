'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const dns_1 = __importDefault(require('dns'));
// validate  all email//
const validateMxRecord = (domain) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      dns_1.default.resolveMx(domain, (err, addresses) => {
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });
  });
function validatemailreal(emails) {
  return __awaiter(this, void 0, void 0, function* () {
    const checkedDomains = emails.map((email) =>
      __awaiter(this, void 0, void 0, function* () {
        const [uname, dname] = email.split('@');
        const checked = yield validateMxRecord(dname);
        const domain = `${uname}@${dname}`;
        return { checked, domain };
      }),
    );
    const resolvedDomains = yield Promise.all(checkedDomains);
    const valid = [];
    // Push valid domains
    resolvedDomains.forEach((item) => {
      if (item.checked === true) valid.push(item.domain);
    });
    return valid;
  });
}
// Check for valid emails
const validateEmail = (emails) => {
  const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const validEmail = [];
  emails.forEach((val) => {
    if (re.test(String(val).toLowerCase())) validEmail.push(val);
  });
  return validEmail;
};
// The main function
function validateEmailAddresses(inputPath, outputFile) {
  return __awaiter(this, void 0, void 0, function* () {
    const resolvePathin = path_1.default.join(__dirname, inputPath[0]);
    // readfile streams
    const data = new Promise((resolve, reject) => {
      const stream = fs_1.default.createReadStream(resolvePathin, {
        encoding: 'utf8',
      });
      stream.on('data', (val) => {
        if (val) {
          resolve(val);
        } else {
          console.log('Data not found');
        }
      });
    });
    // convert emails to string and split return an array
    const email = JSON.stringify(yield data).split('\\n');
    // validate email address structure
    const validEmailStructure = validateEmail(email);
    // email address that can send emails
    const validEmailMx = yield validatemailreal(validEmailStructure);
    validEmailMx.unshift('Email');
    // write file to outputpath
    const resolveOutputPath = path_1.default.join(__dirname, outputFile);
    fs_1.default.writeFile(
      resolveOutputPath,
      JSON.stringify(validEmailMx, null, 2),
      'utf8',
      (err) => {
        if (err) {
          return err;
        }
      },
    );
  });
}
exports.default = validateEmailAddresses;
