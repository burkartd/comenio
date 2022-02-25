//kód serveru, backend
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var usersCount = 0;
var roomsCount = 0;

let users = []; //list připojených uživatelů

//set static folder
app.use(express.static(path.join(__dirname, 'public'))); //abysme měli přístup k frontendu

//když se připojí klient
io.on('connection', socket => {
    console.log('novy pripojeni...');
    usersCount++; //zvětšení počtu přihlášených

    //příchozí zpráva od žáka
    io.on('zpravaUciteli', (msg) =>{
        console.log(msg);
    })

    //když se klient odpojí
    io.on('disconnect', ()=>{
        console.log('typek to leavnul :(');
        usersCount--; //zmenšení počtu přihlášeních
    })


    //připojí se učitel a založí roomku
    io.on('hostConnect', (socket, user) => {
        var room = generateRoom();
        socket.join(room); //připojí učitele do nové roomky
        users.push(user);
        console.log('nova roomka: ' + room); //do konzole serveru jmeno roomky
    })

    //když se připojí žák
    io.on('userConnect', (socket, user, roomname) => {

        if(io.sockets.adapter.rooms[roomname])
        {
            socket.join(roomname);
            users.push(user);
            console.log('přihlášení do roomky: ' + roomname);
        }
        else
        {
            socket.emit('wrongRoom'); //pošle event že je špatné číslo roomky
        }

    })
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Servr frci na portu ${PORT} vole`)); 


function generateRoom()
{
    var num;
    var name;
    while(io.sockets.adapter.rooms[name])
    {
        //dokud roomky existujou
        num = Math.floor(Math.random() * 89) + 10; //vygeneruje číslo roomky
        name = "room" + num; //poskládá název roomky
    }
    return name;
}