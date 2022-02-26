const socket = io();

var roomNumber = -1; //číslo roomky, získá se v callback funkci
var roomName = '';

var zaci = []; //kolekce připojených žáků

var id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');




socket.on('connect', () =>
{
    socket.emit('hostConnect', data => {
        roomName = data;
        roomNumber = data.substring(4);
        divRoomNumber.innerHTML = ('#' + roomNumber);
    });
    
    id = socket.id; 
});

//socket.emit('test', 5);


