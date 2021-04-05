const fs = require('fs')
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/sms', (req, res) => {
    console.log(req.body)
    const content = JSON.stringify(req.body)
    fs.writeFileSync(path.join(__dirname, 'sms.json'), content)
})

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337')
})
