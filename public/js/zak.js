const socket = io();

var zaci = []; //kolekce připojených žáků

var id = socket.id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');

divRoomNumber.innerHTML = '#';

const { userName, roomNumber} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });



var roomName = 'room' + roomNumber; //jméno roomky


socket.on('connect', () => {
    socket.emit('userConnect', userName, roomNumber, (data) => {
       //alert(data);
       if(data == false)
       {
           window.location.href = 'index.html';
       } 
       else{
        console.log('tady');
        divRoomNumber.innerHTML = '#' + roomNumber;
       }
    });

    socket.emit('userJoin', userName, id, roomName); 
    socket.emit('upozorneni', 'pripojil jsem se', userName);
});

socket.on('disconnect', () => {
    socket.emit('userLeave');
})



function TempoHodiny()
{
    
    socket.emit('upozorneni', 'ahoj pane uciteli', userName);
}