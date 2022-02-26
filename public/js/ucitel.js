const socket = io();

var roomNumber = -1; //číslo roomky, získá se v callback funkci

var zaci = []; //kolekce připojených žáků

var id; // id sockety

socket.on('connect')
{
    socket.emit('hostConnect', data => {
        roomNumber = data;
    });
    console.log(roomNumber);
    socket.emit('test', 'kokot');
}

socket.emit('test', 5);
console.log('zdar');

