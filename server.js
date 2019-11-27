const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const app = express()
const ws = new WebSocket.Server({port: 3001}, () => console.info(`WS server listen on port 3001`))

let clients = []

ws.on('connection', (ws, req) => {
    clients.push(ws)

    ws.on('message', data => {
        clients.forEach(client => {
            client.send(data)
        })
    })
})

app.get('/', express.static('./public'))
app.listen(3000, () => console.info(`Server listen on port 3000`))