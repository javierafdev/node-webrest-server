import fs from 'fs'
import http from 'http'

const server = http.createServer((req, res) => {

    console.log(req.url)

    // res.writeHead(200, { 'Conten-type': 'text/html' })
    // res.write('<H1>Hola mundo<H1>')
    // res.end()

    // const data = { name: 'Javier', age: 54, city: 'San justo' }
    // res.writeHead(200, { 'Content-type': 'application/json' })
    // res.end(JSON.stringify(data))

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Conten-type': 'text/html' })
        res.end(htmlFile)
        return
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Conten-type': 'application/javascript' })
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Conten-type': 'text/css' })
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(responseContent)

})

server.listen(8080, () => {
    console.log('Server running en port 8080')
})