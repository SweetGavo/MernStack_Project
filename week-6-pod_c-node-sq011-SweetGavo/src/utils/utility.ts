import fs from 'fs';
import bcrypt from 'bcrypt';


export const myDb = () => {
    try {
        fs.readFileSync('./db.json');
    } catch (error) {
        fs.writeFileSync('./db.json', JSON.stringify([], null, 2));
    }
}



export const customWriteToFile = (fileName: string, data: any) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8', (err: any) => {
        if(err){
            console.log(err)
        }
    })
}



export const hashPassword = async (plainText: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
};

export const comparePasswords = async (plainText: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hash);
};


