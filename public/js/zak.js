const socket = io();

var id = socket.id; // id sockety
const divRoomNumber = document.getElementById('roomNumber');
const openclose = document.getElementById('openclose');
const overlay = document.getElementById('overlay')
const odhlasit = document.getElementById('odhlasit');
const anketadiv = document.getElementById('anketadiv');
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
  socket.emit('upozorneni', 0, userName, 1); openClose();
});
Tlacitko2.addEventListener('click', () => {
  socket.emit('upozorneni', 1, userName, 1); openClose();
});
Tlacitko3.addEventListener('click', () => {
  socket.emit('upozorneni', 2, userName, 1); openClose();
});


socket.on('connect', () => { //připojení - ohlášení uživatele
    socket.emit('userConnect', userName, roomNumber, (data) => {
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
    socket.emit('upozorneni', 'pripojil jsem se', userName, 4);
});

socket.on('disconnect', () => { //při odpojení se pošle event
    socket.emit('userLeave');
})

socket.on('roomEnded', () => { //učitel ukončil místnost
    window.location.href = 'ukonceni.html';
})

socket.on('spustitAnketu', (nazev) => { //spustí se anketa
  if(typeof nazev === 'undefined')
  {
    nazev = 'Anketa';
  }  
  anketadiv.querySelector('h1').innerHTML = nazev;
  anketadiv.classList.add('active');
})

socket.on('ukoncitAnketu', () => { //ukončí probíhající anketu
  anketadiv.classList.remove('active');
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

function PoslatZpravu(msg) {socket.emit('upozorneni', msg, userName, 2);}