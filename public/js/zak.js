
divRoomNumber.innerHTML = '#';

odhlasit.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

openclose.addEventListener('click', () => { //otevření/zavření tlačítek na odpovědi
  openClose();
})

overlay.addEventListener('click', () => { //zavření tlačítek kliknutím mimo
  openClose();
})

vlajkauk.addEventListener('click', () => {
  vlajkacz.classList.add('border-comeniowhiteblue');
  vlajkacz.classList.remove('border-comeniodark');
  vlajkauk.classList.add('border-comeniodark');
  vlajkauk.classList.remove('border-comeniowhiteblue');
  jazyk = 'uk';
  ZakText(1);
})

vlajkacz.addEventListener('click', () => {
  vlajkauk.classList.add('border-comeniowhiteblue');
  vlajkauk.classList.remove('border-comeniodark');
  vlajkacz.classList.add('border-comeniodark');
  vlajkacz.classList.remove('border-comeniowhiteblue');
  jazyk = 'cz';
  ZakText(0);
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

document.getElementById('anketazavrit').addEventListener('click', ()=>
{
  anketadiv.classList.remove('active');
})

Tlacitko1.addEventListener('click', () => {
  socket.emit('upozorneni', {zprava: 0, jmeno: userName, druh: 1, jazyk: jazyk}); openClose();
});
Tlacitko2.addEventListener('click', () => {
  socket.emit('upozorneni', {zprava: 1, jmeno: userName, druh: 1, jazyk: jazyk}); openClose();
});
Tlacitko3.addEventListener('click', () => {
  socket.emit('upozorneni', {zprava: 2, jmeno: userName, druh: 1, jazyk: jazyk}); openClose();
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
        ZakOdpovediZacit(data.odpovediNazev);
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

socket.on('spustitAnketu', () => { //spustí se anketa
    
  ZakAnketaZacit();
})

socket.on('ukoncitAnketu', () => { //ukončí probíhající anketu
  anketadiv.classList.remove('active');
})

socket.on('spustitOdpovedi', (data) => {
  
  ZakOdpovediZacit(data.nazev);
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

function PoslatZpravu(msg) {socket.emit('upozorneni', {zprava: msg, jmeno: userName, druh: 2, jazyk: jazyk});}

function ZakAnketaZacit()
{
  anketadiv.classList.add('active');
  splneno.disabled = false;
  nesplneno.disabled = true;
}

function ZakOdpovediZacit(nazev)
{
  odpovedidiv.classList.add('active');
  hNazevAnkety.innerHTML = nazev;
}

odpovedidiv.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }
  // socket.emit('upozorneni', msg, userName, 3); //3 - odpověď
  socket.emit('upozorneni', {zprava: msg, jmeno: userName, druh: 3, jazyk: jazyk});
  e.target.elements.msg.value = '';

  setTimeout(()=>{
    odpovedidiv.classList.remove('active');
  }, 1000)

});