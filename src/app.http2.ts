import fs from 'fs'
import http2 from 'http2'

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
},
    (req, res) => {

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

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.end(responseContent)        
    } catch (error) {
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end()
    }

})

server.listen(8080, () => {
    console.log('Server running en port 8080')
})