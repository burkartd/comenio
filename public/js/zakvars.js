const socket = io();

var id = socket.id; // id sockety
var jazyk = 'cz'; //česky
var jsouOtevrene = false;
var roomName = 'room' + roomNumber; //jméno roomky

const divRoomNumber = document.getElementById('roomNumber');
const openclose = document.getElementById('openclose');
const overlay = document.getElementById('overlay')
const odhlasit = document.getElementById('odhlasit');
const anketadiv = document.getElementById('anketapopup');
const odpovedidiv = document.getElementById('odpovedipopup');
const splneno = document.getElementById('btnsplneno');
const nesplneno = document.getElementById('btnnesplneno');
const vlajka = document.getElementById('vlajka');
const vlajkauk = document.getElementById('ua');
const vlajkacz = document.getElementById('cz');
const Tlacitko1 = document.getElementById('Tlacitko1');
const Tlacitko2 = document.getElementById('Tlacitko2');
const Tlacitko3 = document.getElementById('Tlacitko3');
const vlastni = document.getElementById('VlastniZpravaForm');

const { userName, roomNumber, lang} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
jmeno = lang;


