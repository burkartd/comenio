const socket = io();

var roomNum = -1; //číslo roomky, získá se v callback funkci
var roomName = '';

var pocetZaku = 0;
var hotovychZaku = 0;
var procent = 0.0;
var pocetUpozorneni = 0;

var zaci = []; //kolekce připojených žáků

var id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');

const konecmistnosti = document.getElementById('konecmistnosti');
konecmistnosti.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

const seznamZaku = document.getElementById('seznamZaku'); //div se sezamem žáků
seznamZaku.innerHTML = '';

const seznamUpozorneni = document.getElementById('seznamUpozorneni');
seznamUpozorneni.innerHTML = '';

const zaku = document.getElementById('pocetzaku');
zaku.innerHTML = '0';

const vymazatvse = document.getElementById('odstranitvse');

vymazatvse.addEventListener('click', () => {
    seznamUpozorneni.innerHTML = '';
    pocetUpozorneni = 0;
}); //odhlášení z místnosti

var zpravy = ['Nestíhám zápis', 'Nerozumím učivu', 'Zvládám bez problému']; //předvolené zprávy

function pocetZakuUpdate()
{
    zaku.innerHTML = pocetZaku;
}

//při připojení
socket.on('connect', () =>
{
    socket.emit('hostConnect', data => {
        roomName = data;
        roomNum = data.substring(4);
        divRoomNumber.innerHTML = ('#' + roomNum);
        console.log(data);
    });
    
    id = socket.id; 

    pocetZakuUpdate();
});

socket.on('newUser', (user) => {
    prihlaseni(user);
    pocetZaku++;
    pocetZakuUpdate();
});

socket.on('userLeft', (id) => {
    odhlaseni(id);
    pocetZaku--;
    pocetZakuUpdate();
})

socket.on('upozorneni', (msg, name, druh) => {   
    if(druh === 1) { prednastavenaZprava(msg, name); return; } //předvolená zpráva
    if(druh === 2) { vlastniZprava(msg, name); return; } //vlastní zpráva
    if(druh === 3) { return; } //anketa
})

socket.on('splneno', (data, id) => {
    
    const index = zaci.findIndex(zaci => zaci.id === id);
    if(index === -1) return;

    var node = Array.from(seznamZaku.childNodes)[index];

    if(data) //zak je hotov
    {
        node.classList.remove('nesplnil');
        node.classList.add('splnil');
        hotovychZaku++;
    }
    else //zak si to rozmyslel
    {
        node.classList.remove('splnil');
        node.classList.add('nesplnil');
        hotovychZaku--;
    }
    
    procent = 100*hotovychZaku*1.0/pocetZaku;
})

function zacitAnketu()
{
    var nodes = Array.from(seznamZaku.childNodes);
    nodes.forEach(node => {
        node.classList.add('nesplnil'); //přidá třídu že není splněn
    });
}

function ukoncitAnketu()
{
    hotovychZaku = 0;
    procent = 0.0;

    var nodes = Array.from(seznamZaku.childNodes);
    nodes.forEach(node => {
        node.classList.remove('splnil');  //odebere obě třídy splnil, nesplnil
        node.classList.remove('nesplnil');
    });
}

function odhlaseni(id)
{
    const index = zaci.findIndex(zaci => zaci.id === id);
    if(index !== -1)
    {
        zaci.splice(index, 1);
        zaciUpdate();
    }

}

function prihlaseni(zak)
{
    zaci.push(zak);
    zaciUpdate();
}

function zaciUpdate()
{
    seznamZaku.innerHTML = '';
    zaci.forEach(element => {
        
        const div = document.createElement('div');
        div.classList.add('zaznam');
        div.innerHTML = `
        <span class="text-comeniowhiteblue pr-4">${element.userName}</span>
                    <svg class="w-8 text-comeniowhiteblue bg-comenioblue rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                     </path></svg>`
    
        seznamZaku.appendChild(div);
        

    });
}
function vlastniZprava(msg, jmeno)
{
    const div = document.createElement('div');
    div.classList.add('zaznamodpoved');
    div.classList.add('stin');
    div.innerHTML = `
    <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span class="ml-4">${jmeno}:</span>
                    <span class="ml-2 font-semibold">${msg}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`

    div.classList.add('vlastni');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
    pocetUpozorneni++;
}

function prednastavenaZprava(msg, jmeno)
{
    const div = document.createElement('div');
    div.classList.add('zaznamodpoved');
    div.classList.add('stin');
    div.innerHTML = `
    <svg class="w-12 text-blue-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="ml-4">${jmeno}:</span>
                    <span class="ml-2 font-semibold">${zpravy[msg]}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`

    div.classList.add('prednastavena');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
    pocetUpozorneni++;
}

function casFormat()
{
    var cas = new Date();
    var h = cas.getHours();
    var m = cas.getMinutes();
    return h + ':' + m;
}

function smazJeden(el)
{
    var element = el;
    element.parentElement.remove();
}