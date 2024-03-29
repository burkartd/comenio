
divRoomNumber.innerHTML = '#';

// if(jazyk === 'uk')
// {
//   vlajkacz.classList.add('border-comeniowhiteblue');
//   vlajkacz.classList.remove('border-comeniodark');
//   vlajkauk.classList.add('border-comeniodark');
//   vlajkauk.classList.remove('border-comeniowhiteblue');
//   ZakText(1);
// }

NastavJazyk();

odhlasit.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

openclose.addEventListener('click', () => { //otevření/zavření tlačítek na odpovědi
  openClose();
})

overlay.addEventListener('click', () => { //zavření tlačítek kliknutím mimo
  openClose();
})

// vlajkauk.addEventListener('click', () => {
//   vlajkacz.classList.add('border-comeniowhiteblue');
//   vlajkacz.classList.remove('border-comeniodark');
//   vlajkauk.classList.add('border-comeniodark');
//   vlajkauk.classList.remove('border-comeniowhiteblue');
//   jazyk = 'uk';
//   ZakText(1);
// })

// vlajkacz.addEventListener('click', () => {
//   vlajkauk.classList.add('border-comeniowhiteblue');
//   vlajkauk.classList.remove('border-comeniodark');
//   vlajkacz.classList.add('border-comeniodark');
//   vlajkacz.classList.remove('border-comeniowhiteblue');
//   jazyk = 'cz';
//   ZakText(0);
// })

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
  //console.log('otevřeno zavřeno');
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

document.getElementById('zavritOdpoved').addEventListener('click', () => {
  odpovedidiv.classList.remove('active');
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
       
      //console.log('tady');
      divRoomNumber.innerHTML = '#' + roomNumber;
      if(data.anketa)
      {
        ZakAnketaZacit();
      }
      if(data.odpovedi)
      {
        ZakOdpovediZacit({nazev:data.odpovediNazev, lang:data.lang});
      }
      
       
    });
});

socket.on('zpravaZakovi', (data) => {
  console.log(data);
  zpravaOdUcitele(data);
})

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
  
  ZakOdpovediZacit(data);
})

socket.on('ukoncitOdpovedi', () => {
  //console.log('ahoj');
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

async function ZakOdpovediZacit(data)
{
  odpovedidiv.classList.add('active');

  let nazev = data.nazev;

  if(data.lang === jazyk)
  {
    nazev = data.nazev;
  }
  else
  {
    const bar = await translate(nazev, {from: data.lang, to: jazyk });
    nazev = bar;
  }
  hNazevAnkety.innerHTML = nazev;
}

odpovedidiv.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }

  socket.emit('upozorneni', {zprava: msg, jmeno: userName, druh: 3, jazyk: jazyk});
  e.target.elements.msg.value = '';

  setTimeout(()=>{
    odpovedidiv.classList.remove('active');
  }, 1000)

});

async function zpravaOdUcitele(data)
{
  let text = '';
  console.log(data)
  if(data.typ === 'prednastavena'){
    text = zakDataZpravy[data.msg-1][jazyk];
  }
  else if(data.typ === 'vlastni')
  {
    console.log('vlastni')
    if(data.lang === jazyk) text = data.msg;
    else {
      const foo = await translate(data.msg, {from: data.lang, to: jazyk }); // přeloží se z jazyka učitele do jazyka žáka
      text = foo;
    } 
  }

  divZpravaOdUcitele.classList.add('active');

  document.getElementById('zpravaTxt').innerText = text;

  document.getElementById('zpravaZavrit').addEventListener('click', () => {
    divZpravaOdUcitele.classList.remove('active');
  })
}