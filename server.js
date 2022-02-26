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
    console.log('počet přihlášených ' + usersCount);

    // io.on('join room', (username, role) => {
    //     const user = {
    //         username,
    //         role,
    //         id: socket.id
    //     };
    //     users.push(user);
    //     io.emit('new user', users);
    // });

    //příchozí zpráva od žáka
    socket.on('zpravaUciteli', (msg) =>{
        console.log(msg);
    });

    //když se klient odpojí
    socket.on('disconnect', ()=>{
        console.log('typek to leavnul :(');
        usersCount--; //zmenšení počtu přihlášeních
        console.log('počet přihlášených ' + usersCount);
    });

    socket.on('test', (data)=>{
        console.log(data);
    });

    //připojí se učitel a založí roomku
    socket.on('hostConnect', (cb) => {
        var room = generateRoom();
        socket.join('room'+room); //připojí učitele do nové roomky
        const user = {
            username: 'ucitel',
            role: 1,
            id: socket.id,
            roomnumber: room
        };
        users.push(user);
  
        console.log('nova roomka: ' + room); //do konzole serveru jmeno roomky
        cb(room); //callback funkce pro poslání čísla roomky
    });

    //když se připojí žák
    socket.on('userConnect', (username, roomNumber, cb) => {

        
        if(io.sockets.adapter.rooms.has('room'+roomNumber))
        {
            socket.join('room'+roomNumber);
            const user = {
                username,
                role: 2,
                id: socket.id,
                roomnumber: roomname
            };
            users.push(user);
            
            console.log('přihlášení do roomky: ' + roomname);
            cb('jo kokote');
        }
        else
        {
            socket.emit('wrongRoom'); //pošle event že je špatné číslo roomky
            cb('ne kokote');
        }

    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Servr frci na portu ${PORT} vole`)); 


function generateRoom()
{
    var num;
    var name = "kundomrd";
    var opakuj = true;
    while(opakuj){
        //dokud roomky existujou
        num = Math.floor(Math.random() * 89) + 10; //vygeneruje číslo roomky
        name = "room" + num; //poskládá název roomky
        //console.log(name);
        opakuj = io.sockets.adapter.rooms.has(name);
    }
    
    return name;
}