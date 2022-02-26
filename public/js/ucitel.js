const socket = io();

var roomNumber = -1; //číslo roomky, získá se v callback funkci

var zaci = []; //kolekce připojených žáků

var id; // id sockety

socket.on('connect', () =>
{
    socket.emit('hostConnect', data => {
        roomNumber = data;
        console.log('zdar');
        console.log(roomNumber);
    });
    
    id = socket.id; 
});

//socket.emit('test', 5);


