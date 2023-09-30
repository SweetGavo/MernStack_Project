const http = require('http')
const org = require('./controllers/organisationController')
// import http from "http";
// const database = require('./data/database')
// /*
// implement your server code here
// */
  

const server = http.createServer((req: { url: string; method: string }, res: any) => {
  if (req.url === '/api/database' && req.method === 'GET') {
        org.getOrganisations(req, res)
    } else if(req.url.match(/\/api\/database\/([0-9a-z-]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        org.getOrganisation(req, res, id)
    } else if(req.url === '/api/database' && req.method === 'POST') {
        org.createOrganisation(req, res)
    } else if(req.url.match(/\/api\/database\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        org.updateOrganisation(req, res, id)
    } else if(req.url.match(/\/api\/database\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        org.deleteOrganisation(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT =  process.env.PORT || 5006

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;


// server.listen(5000);
