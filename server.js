//kód serveru, backend
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { disconnect } = require('process');
const fs = require('fs');
const { data } = require('jquery');

// let rawdata = fs.readFileSync('student.json');
let InfoRoomObject = JSON.parse(fs.readFileSync('infoPage.json'));

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servr frci na portu ${PORT}`)); 

var roomsCount = 0;

let rooms = [];

app.use('/scripts', express.static(path.join(__dirname, '/node_modules/chart.js/dist/'))); //abysme měli přístup k frontendu

//nastavení static folder
app.use(express.static(path.join(__dirname, 'public'))); //abysme měli přístup k frontendu

process.on('uncaughtException', err => {
    console.error(err && err.stack)
  });

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

        socket.on('spustitAnketu', () => { //spustí anketu žákům v roomce
            socket.broadcast.to(room).emit('spustitAnketu');
        });

        socket.on('ukoncitAnketu', () => { //ukončí anketu
            socket.broadcast.to(room).emit('ukoncitAnketu');
        });

        socket.on('spustitOdpovedi', (data) => {
            socket.broadcast.to(room).emit('spustitOdpovedi', data);
        })

        socket.on('ukoncitOdpovedi', () => {
            socket.broadcast.to(room).emit('ukoncitOdpovedi');
        })

        socket.on('zpravaZakovi', (data) => {
            console.log(data);
            
            const tmp = io.sockets.sockets.get(data.zakid);
            
            let zprava = {typ: data.typ, msg: data.msg, lang: data.lang, typ: data.typ};

            if(tmp) tmp.emit('zpravaZakovi', zprava);

            //io.sockets.sockets.get(data.zakid).emit('zpravaZakovi', data.msg);
            
        })

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

            //socket.on('upozorneni', (msg, jmeno, druh) => { //druh: 1-prednastavena, 2-vlastni, 3-anketa
            socket.on('upozorneni', (data) => { //druh: 1-prednastavena, 2-vlastni, 3-anketa
                //console.log('zprava: ' + msg + jmeno);
                // socket.broadcast.to(roomka).emit('upozorneni', msg, jmeno, socket.id, druh);
                socket.broadcast.to(roomka).emit('upozorneni', data, socket.id);
            });

            socket.on('splneno', (data) => { //učiteli se pošle, že někdo splnil/nesplnil úkol
                socket.broadcast.to(roomka).emit('splneno', data, socket.id);
            })

            
            
        }
        else cb({pripojit: false});        
    });

    socket.on('infoPageConnect', (cb) => {

        var data = {pripojit: true, pocet: 0};
        data.pripojit = true;
        data.pocet = InfoRoomObject.Infoslide.Length;
        cb(data);
    })

    socket.on('ziskejInfoSlide', (CisloSlidu, cb)=>{
        var data = {posledni :false, text: ""};

        var pocetSlidu = Array.from(InfoRoomObject.Infoslide).length;

        if(CisloSlidu >= pocetSlidu)
        {
            data.posledni = true;
            data.text = InfoRoomObject.posledni;
            cb(data);
        }
        else
        {
            data.posledni = false;
            data.text = InfoRoomObject.Infoslide[CisloSlidu].text;
            cb(data);
        }
        
    })

    socket.on('ziskejInfoOtazka', (cisloOtazky, cb)=>{
        var data = {posledni: false, otazka: null, odpovedi: null};
        var pocetOtazek = Array.from(InfoRoomObject.Otazky).length;
        if(cisloOtazky >= pocetOtazek)
        {
            data.posledni = true;
            cb(data);
        }
        else
        {
            data.otazka = InfoRoomObject.Otazky[cisloOtazky].otazka;
            data.odpovedi = InfoRoomObject.Otazky[cisloOtazky].odpovedi;
            cb(data);
        }
    })

    socket.on('kontrolaOdpovedi', (cisloOtazky, cb)=>{

        var data = {spravna: null}
        //const odpoved_i = InfoRoomObject.Otazky.findIndex(tmp => tmp.id === cisloOtazky);
        //console.log(odpoved_i);
        const ota = InfoRoomObject.Otazky[cisloOtazky];
        if (!ota) return;
        data.spravna = ota.spravna;
        cb(data);

    })
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