import express from 'express'
import path from 'path'

interface Options {
    port: number
    public_path?: string
}

export class Server {

    private readonly port: number
    private readonly public_path: string

    constructor({ port, public_path= 'public' }: Options){
        this.port = port
        this.public_path = public_path
    }

    private app = express()

    async Start() {

        //* Middleware

        //* Public Folder
        this.app.use(express.static(this.public_path))

        //* Comodin para iterceptar todas las request
        this.app.get('*', (req, res) => {
            console.log(req.url)

            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)

            console.log(indexPath)

            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })

    }

}