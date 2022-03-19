//kód serveru, backend
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servr frci na portu ${PORT}`)); 


var usersCount = 0;
var roomsCount = 0;

let users = []; //list připojených uživatelů
let hosts = []; //list učitelů - pro uchování id učitelů
let rooms = [];

app.use('/scripts', express.static(path.join(__dirname, '/node_modules/chart.js/dist/'))); //abysme měli přístup k frontendu

//nastavení static folder
app.use(express.static(path.join(__dirname, 'public'))); //abysme měli přístup k frontendu


//když se připojí klient
io.on('connection', socket => {
    console.log('novy pripojeni...');
    //kontrola existence místnosti - z index.js
    socket.on('checkRoom', (num, jmeno, cb) => {
        var roomtest = 'room' + num;        
        var rexistuje = io.sockets.adapter.rooms.has(roomtest);
        var jmenook = true;
        if(rexistuje)
        {
            const roomi = rooms.findIndex(tmp => tmp.roomName === roomtest);
            console.log(rooms[roomi]);
            const zaki = rooms[roomi].userList.findIndex(zak => zak.userName === jmeno);
            if(zaki !== -1) jmenook = false;
        }
        cb(
            {
                mistnostExistuje: rexistuje, jmenoOk: jmenook
            }
        );
    });

    //připojí se učitel a založí roomku - z ucitel.js
    socket.on('hostConnect', (cb) => {
        var room = generateRoom(); //najde unikátní číslo roomky
        socket.join(room); //připojí učitele do nové roomky
        const user = { //novy
            username: 'ucitel',
            role: 1,
            id: socket.id,
            roomnumber: room
        };

        const roomObj = { //nová roomka
            host: user,
            userList: [],
            roomName: room,
            usersCount: 0
        }

        rooms.push(roomObj);
        roomsCount++;
  
        cb(room); //callback funkce pro poslání čísla roomky

        rooms.forEach(room => {
            console.log(room);
        }); 

        socket.on('spustitAnketu', (nazev) => { //spustí anketu žákům v roomce
            socket.broadcast.to(room).emit('spustitAnketu', nazev);
        });

        socket.on('ukoncitAnketu', () => { //ukončí anketu
            socket.broadcast.to(room).emit('ukoncitAnketu');
        });

        //učitel se odpojí - ukončí místnost
        socket.on('disconnect', () => {
            socket.broadcast.to(room).emit('roomEnded');

            const index = rooms.findIndex(room => room.host.id === socket.id);
            if(index !== -1)
            {
                rooms.splice(index, 1);
                roomsCount--;
                console.log('mistnosti: ', roomsCount); 
            }
        })
    });

    //když se připojí žák - z zak.js
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
            const index = rooms.findIndex(room => room.roomName === roomka);
            if(index !== -1)
            {
                rooms[index].userList.push(user);
                rooms[index].usersCount++;
                console.log(rooms[index]);
            }

            socket.broadcast.to(rooms[index].host.id).emit('newUser', (user)); //ohlásí nového uživatele

            io.sockets.sockets.get(rooms[index].host.id).emit('getinfo', (datainfo) => {
                cb(datainfo);
            });

            //cb(true);

            socket.on('disconnect', () => { //žák se odpojí
    
                socket.broadcast.to(roomka).emit('userLeft', user.id);

                const index = rooms.findIndex(room => room.roomName === roomka);
                if(index !== -1)
                {
                    const zak = rooms[index].userList.findIndex(tmp => tmp.userName === userName);
                    if(zak !== -1)
                    {
                        console.log('zak se odpojil');
                        rooms[index].userList.splice(zak, 1);
                        rooms[index].usersCount--;
                        console.log(rooms[index]);
                    }               
                }
            });

            socket.on('upozorneni', (msg, jmeno, druh) => { //druh: 1-prednastavena, 2-vlastni, 3-anketa
                console.log('zprava: ' + msg + jmeno);
                socket.broadcast.to(roomka).emit('upozorneni', msg, jmeno, druh);
            });

            socket.on('splneno', (data) => { //učiteli se pošle, že někdo splnil/nesplnil úkol
                socket.broadcast.to(roomka).emit('splneno', data, socket.id);
            })

            
            
        }
        else cb(false);        
    });

        
});



function generateRoom()
{
    var num;
    var name = "xxx";
    var opakuj = true;
    while(opakuj){
        //dokud roomky existujou
        num = Math.floor(Math.random() * 899) + 100; //vygeneruje číslo roomky
        name = "room" + num; //poskládá název roomky
        opakuj = io.sockets.adapter.rooms.has(name);
    }
    
    return name;
}