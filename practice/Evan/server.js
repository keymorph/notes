import express from 'express'
const app = express()
import cors from 'cors'
import bodyParser from 'body-parser'
import user from './routes/user.js'
import connection from './models/connection.js'
import dotenv from 'dotenv'

dotenv.config()

const host = "localhost"
const port = 5678
app.listen(port, host, () => console.log(`Back-end server running at 'http://${host}:${port}'`))

connection.connect((err) => {
    if (err) {
        console.log(err)
        throw err
    }
    console.log("MySQL Connected.")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/', user)

export { connection }