const socket = io();

var zaci = []; //kolekce připojených žáků

var id = socket.id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');
const openclose = document.getElementById('openclose');
const overlay = document.getElementById('overlay')

// var elements = document.getElementsByClassName('modal');
var jsouOtevrene = false;

divRoomNumber.innerHTML = '#';

const { userName, roomNumber} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

openclose.addEventListener('click', () => {

  var elements = document.getElementsByClassName('modal');
  //openCloseModal(elements[0]);
  Array.from(elements).forEach(element => openCloseModal(element));
  
  jsouOtevrene = !jsouOtevrene;
})

overlay.addEventListener('click', () => {

  var elements = document.getElementsByClassName('modal');
  //openCloseModal(elements[0]);
  Array.from(elements).forEach(element => openCloseModal(element));
  
  jsouOtevrene = !jsouOtevrene;
})

function openCloseModal(modal)
{
  if(jsouOtevrene === false)
  {
    modal.classList.add('active');
    overlay.classList.add('active');
    return;
  }

  modal.classList.remove('active');
  overlay.classList.remove('active');
}

var roomName = 'room' + roomNumber; //jméno roomky

const Tlacitko1 = document.getElementById('Tlacitko1');
const Tlacitko2 = document.getElementById('Tlacitko2');
const Tlacitko3 = document.getElementById('Tlacitko3');
const vlastni = document.getElementById('VlastniZpravaForm');


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