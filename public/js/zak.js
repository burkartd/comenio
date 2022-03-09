const socket = io();

var id = socket.id; // id sockety
const divRoomNumber = document.getElementById('roomNumber');
const openclose = document.getElementById('openclose');
const overlay = document.getElementById('overlay')
const odhlasit = document.getElementById('odhlasit');
var jsouOtevrene = false;

divRoomNumber.innerHTML = '#';

const { userName, roomNumber} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

odhlasit.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

openclose.addEventListener('click', () => { //otevření/zavření tlačítek na odpovědi
  openClose();
})

overlay.addEventListener('click', () => { //zavření tlačítek kliknutím mimo
  openClose();
})

function openClose()
{
  var elements = document.getElementsByClassName('modal');
  Array.from(elements).forEach(element => openCloseModal(element));
  jsouOtevrene = !jsouOtevrene;
}

function openCloseModal(modal)
{
  if(jsouOtevrene === false)
  {
    modal.classList.add('active');
    overlay.classList.add('active');
    openclose.classList.add('otoc');
    return;
  }

  modal.classList.remove('active');
  overlay.classList.remove('active');
  openclose.classList.remove('otoc');
}

var roomName = 'room' + roomNumber; //jméno roomky

const Tlacitko1 = document.getElementById('Tlacitko1');
const Tlacitko2 = document.getElementById('Tlacitko2');
const Tlacitko3 = document.getElementById('Tlacitko3');
const vlastni = document.getElementById('VlastniZpravaForm');

Tlacitko1.addEventListener('click', () => {
  socket.emit('upozorneni', 'Nestíhám zápis', userName); openClose();
});
Tlacitko2.addEventListener('click', () => {
  socket.emit('upozorneni', 'Nerozumím učivu', userName); openClose();
});
Tlacitko3.addEventListener('click', () => {
  socket.emit('upozorneni', 'Nezvládám tempo', userName); openClose();
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
    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    if (!msg) {
      return false;
    }
    PoslatZpravu(msg);
    e.target.elements.msg.value = '';
  });

function PoslatZpravu(msg) {socket.emit('upozorneni', msg, userName);}