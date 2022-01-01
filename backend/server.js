import express from 'express'
const app = express()
import cors from 'cors'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

import database from './api/models/database.js'
import user from './api/routes/user.js'
import note from './api/routes/note.js'

console.log('---------')

const port = 3000
const host = 'localhost'
app.listen(port, host, () => console.log(`✓ Back-end server running at 'http://${host}:${port}'`))

database.connect((err) => {
    if (err) {
        console.log(err)
        throw err
    }
    console.log('✓ MySQL Connected.')
    console.log('---------')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/', user)
app.use('/api/', note)

export default database;