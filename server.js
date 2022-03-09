//kód serveru, backend
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var usersCount = 0;
var roomsCount = 0;

let users = []; //list připojených uživatelů
let hosts = []; //list učitelů - pro uchování id učitelů

//set static folder
app.use(express.static(path.join(__dirname, 'public'))); //abysme měli přístup k frontendu

//když se připojí klient
io.on('connection', socket => {
    console.log('novy pripojeni...');
    usersCount++; //zvětšení počtu přihlášených
    console.log('počet přihlášených ' + usersCount);

    socket.on('checkRoom', (num, cb) => {
        var room = 'room' + num;        
        var existuje = io.sockets.adapter.rooms.has(room);
        console.log(existuje);
        cb(existuje);

    });

    socket.on('test', ()=>{
        console.log('test emit');
    });


    //připojí se učitel a založí roomku
    socket.on('hostConnect', (cb) => {
        var room = generateRoom();
        socket.join(room); //připojí učitele do nové roomky
        const user = {
            username: 'ucitel',
            role: 1,
            id: socket.id,
            roomnumber: room
        };
        users.push(user);
  
        cb(room); //callback funkce pro poslání čísla roomky

        socket.on('disconnect', () => {
            socket.broadcast.to(room).emit('roomEnded');
        })
    });

    //když se připojí žák
    socket.on('userConnect', (userName, roomNumber, cb) => {        
        
        var roomka = 'room' + roomNumber;        
        var prihlasit = io.sockets.adapter.rooms.has(roomka);
        if(prihlasit)
        {
            socket.join(roomka);
            const user = {
                userName,
                role: 2,
                id: socket.id,
                roomnumber: roomka
            };
            users.push(user);

            socket.broadcast.to(roomka).emit('newUser', user); //ohlásí nového uživatele

            socket.on('userLeave', () => {
                console.log('ahoj');
                socket.broadcast.to(roomka).emit('userLeft', user.id);

            })

            cb(true);

            socket.on('disconnect', ()=>{
                console.log('typek to leavnul :(');
                
                socket.broadcast.to(roomka).emit('userLeft', socket.id);
            });

            socket.on('upozorneni', (msg, jmeno) => {
                console.log('zprava: ' + msg + jmeno);
                socket.broadcast.to(roomka).emit('upozorneni', msg, jmeno);
            });
            
        }
        else cb(false);

        //když se klient odpojí
        
        
    });

        //příchozí zpráva od žáka
        socket.on('zpravaUciteli', (msg) =>{
            console.log(msg);
        });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servr frci na portu ${PORT} vole`)); 


function generateRoom()
{
    var num;
    var name = "xxx";
    var opakuj = true;
    while(opakuj){
        //dokud roomky existujou
        num = Math.floor(Math.random() * 899) + 100; //vygeneruje číslo roomky
        name = "room" + num; //poskládá název roomky
        //console.log(name);
        opakuj = io.sockets.adapter.rooms.has(name);
    }
    
    return name;
}