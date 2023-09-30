import fs from 'fs';

const myDb = () => {
    try {
        fs.readFileSync('./db.json');
    } catch (error) {
        fs.writeFileSync('./db.json', JSON.stringify([], null, 2));
    }
}



const customWriteToFile = (fileName: string, data: any) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8', (err: any) => {
        if(err){
            console.log(err)
        }
    })
}

module.exports = {
    myDb,
    customWriteToFile
}