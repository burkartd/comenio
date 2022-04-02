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

var nazevAnkety = '';

var zpravy = ['Nestíhám zápis', 'Nerozumím učivu', 'Zvládám bez problému']; //předvolené zprávy

const divRoomNumber = document.getElementById('roomNumber'); //číslo místnosti

const konecmistnosti = document.getElementById('konecmistnosti');
konecmistnosti.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

const seznamZaku = document.getElementById('seznamZaku'); //div se sezamem žáků
seznamZaku.innerHTML = '';

const seznamUpozorneni = document.getElementById('seznamUpozorneni'); //seznam upozornění
seznamUpozorneni.innerHTML = '';

const zaku = document.getElementById('pocetzaku'); //zobrazení počtu žáků
zaku.innerHTML = '0';

const vymazatvse = document.getElementById('odstranitvse');