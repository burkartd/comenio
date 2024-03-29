const socket = io();

var roomNum = -1; //číslo roomky, získá se v callback funkci
var roomName = '';

var pocetZaku = 0;
var hotovychZaku = 0;
var procent = 0.0;
var pocetUpozorneni = 0;

var zaci = []; //kolekce připojených žáků

var id; // id sockety

var jeAnketaAktivni = false;
var jeOdpovedAktivni = false;

var AnketaSplneno = []; //list žáků - splněno/nesplněno

var nazevOtazky = '';

var JazykUcitelGlob = 'cs'


const divRoomNumber = document.getElementById('roomNumber'); //číslo místnosti

const konecmistnosti = document.getElementById('konecmistnosti');
konecmistnosti.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

const seznamZaku = document.getElementById('seznamZaku'); //div se sezamem žáků
seznamZaku.innerHTML = '';

const seznamUpozorneni = document.getElementById('seznamUpozorneni'); //seznam upozornění
seznamUpozorneni.innerHTML = '';

const zaku = document.getElementById('pocetzaku'); //zobrazení počtu žáků
zaku.innerHTML = '0';

const zadaniNazvuOtazky = document.getElementById('zadaniNazvuOtazky');
const inputNazevOtazky = document.getElementById('inputNazevOtazky')


const vymazatvse = document.getElementById('odstranitvse');

const btnZacitAnketu = document.getElementById('zacitanketu');
const ukoncit = document.getElementById('ukoncitanketu');

const btnZacitOdpovedi = document.getElementById('zacitodpovedi');

const ankety = document.getElementById('anketydiv'); //div kde je graf a ankety

const nadpis = document.getElementById('grafnadpis');

const zrusitOtazku = document.getElementById('zrusitOtazku');

const divZpravaZakovi = document.getElementById('divZpravaZakovi');

const zpravaForm = document.getElementById('ZpravaZakoviForm');

const ukrajinacb = document.getElementById('cbukrajina');

const {lang} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  JazykUcitelGlob = lang;

function NastavJazyk()
{
  let vlajky = [vlajka1, vlajka2, vlajka3, vlajka4, vlajka5];
  const jazyky = ['uk', 'cs', 'de', 'pl', 'en']

  if(!jazyky.includes(JazykUcitelGlob)) JazykUcitelGlob = 'en'; //kdyby něco jazyk se nastaví na angličtinu

  vlajky.forEach(element => {
    if(JazykUcitelGlob === element.dataset.jazyk){
      console.log(element.dataset.jazyk)
      element.click();
    }
  })
}