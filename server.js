//kód serveru, backend
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public'))); //abysme měli přístup k frontendu

//když se připojí klient
io.on('connection', socket => {
    console.log('novy pripojeni...');

    //příchozí zpráva od žáka
    io.on('zpravaUciteli', (msg) =>{
        console.log(msg);
    })

    //když se klient odpojí
    io.on('disconnect', ()=>{
        console.log('typek to leavnul :(');
    })
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Servr frci na portu ${PORT} vole`)); 
