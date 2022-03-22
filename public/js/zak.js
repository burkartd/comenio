//const { info } = require("autoprefixer");

const socket = io();

var id = socket.id; // id sockety
var jazyk = 'cz'; //česky

const divRoomNumber = document.getElementById('roomNumber');
const openclose = document.getElementById('openclose');
const overlay = document.getElementById('overlay')
const odhlasit = document.getElementById('odhlasit');
const anketadiv = document.getElementById('anketapopup');
const odpovedidiv = document.getElementById('odpovedipopup');
var jsouOtevrene = false;
const splneno = document.getElementById('btnsplneno');
const nesplneno = document.getElementById('btnnesplneno');
const vlajka = document.getElementById('vlajka');

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

vlajka.addEventListener('click', () => {
  if(jazyk === 'cz')
  {
    vlajka.innerHTML = `<img src="./img/ua.png" id="ua" class="mx-auto px-auto ">`;
    jazyk = 'ua';
    ZakText(1); //do ua
  }
  else if(jazyk === 'ua')
  {
    vlajka.innerHTML = `<img src="./img/cz.png" id="ua" class="mx-auto px-auto ">`;
    jazyk = 'cz';
    ZakText(0); //do ua
  }
})

splneno.addEventListener('click', () => {
  socket.emit('splneno', true);
  splneno.disabled = true;
  nesplneno.disabled = false;
})
nesplneno.addEventListener('click', () => {
  socket.emit('splneno', false);
  nesplneno.disabled = true;
  splneno.disabled = false;
})

function openClose()
{
  console.log('otevřeno zavřeno');
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
  socket.emit('upozorneni', 0, userName, 1); openClose(); console.log('xxx');
});
Tlacitko2.addEventListener('click', () => {
  socket.emit('upozorneni', 1, userName, 1); openClose();
});
Tlacitko3.addEventListener('click', () => {
  socket.emit('upozorneni', 2, userName, 1); openClose();
});


socket.on('connect', () => { //připojení - ohlášení uživatele
    socket.emit('userConnect', userName, roomNumber, (data)=> {
      if(data.pripojit == false)
      {
          window.location.href = 'index.html';
      } 
       
      console.log('tady');
      divRoomNumber.innerHTML = '#' + roomNumber;
      if(data.anketa)
      {
        ZakAnketaZacit();
      }
      if(data.odpovedi)
      {
        ZakOdpovediZacit();
      }
      
       
    });

    

    // socket.emit('userJoin', userName, id, roomName); 
    // socket.emit('upozorneni', 'pripojil jsem se', userName, 4);
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
  ZakAnketaZacit();
})

socket.on('ukoncitAnketu', () => { //ukončí probíhající anketu
  anketadiv.classList.remove('active');
})

socket.on('spustitOdpovedi', () => {
  
  ZakOdpovediZacit();
})

socket.on('ukoncitOdpovedi', () => {
  console.log('ahoj');
  odpovedidiv.classList.remove('active');
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

function ZakAnketaZacit()
{
  anketadiv.classList.add('active');
  splneno.disabled = false;
  nesplneno.disabled = true;
}

function ZakOdpovediZacit()
{
  odpovedidiv.classList.add('active');
}

odpovedidiv.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }
  socket.emit('upozorneni', msg, userName, 3); //3 - odpověď
  e.target.elements.msg.value = '';

  setTimeout(()=>{
    odpovedidiv.classList.remove('active');
  }, 1000)

});