const fsmodule = require('fs');
const path  = require('path')
const { v4: uuidv4 } = require('uuid')
const writeData = require('../utils')
const filePath = path.resolve('../server/src/data/database.json');

let data = fsmodule.readFileSync(filePath);

let database = JSON.parse(data);


 

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(database)
    })
}

function findById(id: any) {
    return new Promise((resolve, reject) => {
        const organisation = database.find((p: { id: any }) => p.id == id)
        resolve(organisation)
    })
}

function create(organisation: any) {
    return new Promise((resolve, reject) => {
        const neworganisation = { id: uuidv4(), ...organisation }
        
        database.push(neworganisation) 
        writeData.writeDataToFile(filePath,database );

        resolve(neworganisation)
    })
}


function update(id: any, organisation: any) {
    return new Promise((resolve, reject) => {
        const index = database.findIndex((p: { id: any }) => p.id === id)
        database[index] = {id: id, ...organisation}
        if (process.env.NODE_ENV !== 'test') {
            writeData.writeDataToFile(filePath, database);
        }
        resolve(database[index])
    })
}

function remove(id: any) {
    return new Promise<void>((resolve, reject) => {
        database = database.filter((p: { id: any }) => p.id !== id)
        
     writeData.writeDataToFile('/Users/macbookair/Downloads/MernStack_Project/week-5-node-sq011-SweetGavo/server/src/data/database.json', database);
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
