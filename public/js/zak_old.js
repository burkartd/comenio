const socket = io();

var zaci = []; //kolekce připojených žáků

var id = socket.id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');

divRoomNumber.innerHTML = '#';

const { userName, roomNumber} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });





var roomName = 'room' + roomNumber; //jméno roomky

const Tlacitko1 = document.getElementById('Tlacitko1');
const Tlacitko2 = document.getElementById('Tlacitko2');
const Tlacitko3 = document.getElementById('Tlacitko3');
const vlastni = document.getElementById('VlastniZpravaForm');

Tlacitko1.addEventListener('click', () => {
    socket.emit('upozorneni', 'Nestíhám zápis', userName);
});
Tlacitko2.addEventListener('click', () => {
    socket.emit('upozorneni', 'Nerozumím učivu', userName);
});
Tlacitko3.addEventListener('click', () => {
    socket.emit('upozorneni', 'Nezvládám tempo', userName)
});


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

socket.on('roomEnded', () => {
    window.location.href = 'ukonceni.html';
})

vlastni.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    let msg = e.target.elements.msg.value;
  
    msg = msg.trim();
  
    if (!msg) {
      return false;
    }
  
    PoslatZpravu(msg);
    e.target.elements.msg.value = '';
  });



function PoslatZpravu(msg)
{
    socket.emit('upozorneni', msg, userName);
}