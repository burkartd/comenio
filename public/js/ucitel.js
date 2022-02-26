const socket = io();

var roomNum = -1; //číslo roomky, získá se v callback funkci
var roomName = '';

var zaci = []; //kolekce připojených žáků

var id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');




socket.on('connect', () =>
{
    socket.emit('hostConnect', data => {
        roomName = data;
        roomNum = data.substring(4);
        divRoomNumber.innerHTML = ('#' + roomNum);
    });
    
    id = socket.id; 
});

//socket.emit('test', 5);


