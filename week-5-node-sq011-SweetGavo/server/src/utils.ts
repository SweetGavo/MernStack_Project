const fs = require('fs')

function writeDataToFile(filename: any, content: any) {
    fs.writeFile(filename, JSON.stringify(content), 'utf8', (err: any) => {
        if(err) {
            console.log(err,"its not writing to db")
        }
    })
}

function getPostData(req: any) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk: Buffer) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}

function err(err: any) {
    throw new Error("Function not implemented.")
}
