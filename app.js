const express = require('express')
const app = express()
let port = process.env.PORT || 3000
const fs = require('fs')
const bodyParser = require('body-parser');

// fs.readFile('./data.json', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data.toString())
//     }
// })

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json({limit: '50mb'}));

app.get('/greeting', (req,res) => {
    res.send('hello this is aaron dizon')
})

app.post('/api/authenticate', (req, res) => {
    const {username, password} = req.body
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.writeHead(500,{
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify({
                error: err    
            }))
        } else {
            let stringData = data.toString()
            let parsedData = JSON.parse(stringData)
            let accounts = parsedData.accounts
            let status = 0;
            for (let x = 0; x < accounts.length; x++) {
                if (accounts[x].username === username) {
                    if (accounts[x].password === password) {
                        status = 1;
                    } else {
                        status = 2;
                    }
                    break;
                }
            }
            if (status === 0) {
                res.writeHead(400,{
                    'Content-Type':'application/json'
                })
                res.end(JSON.stringify({
                    error: 'username not found'
                }))
            } else if (status === 1) {
                res.writeHead(200,{
                    'Content-Type':'application/json'
                })
                res.end(JSON.stringify({
                    success: true
                }))
            } else {
                res.writeHead(400,{
                    'Content-Type':'application/json'
                })
                res.end(JSON.stringify({
                    error: 'invalid username and password'
                }))
            }


        }
    })
})

app.listen(port, () => {
    console.log('listening at port ' + port)
})