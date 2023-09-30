"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const myDb = () => {
    try {
        fs_1.default.readFileSync('./db.json');
    }
    catch (error) {
        fs_1.default.writeFileSync('./db.json', JSON.stringify([], null, 2));
    }
};
const customWriteToFile = (fileName, data) => {
    fs_1.default.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
};
module.exports = {
    myDb,
    customWriteToFile
};
