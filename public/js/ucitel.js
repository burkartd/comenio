const socket = io();

var roomNum = -1; //číslo roomky, získá se v callback funkci
var roomName = '';

var pocetZaku = 0;
var hotovychZaku = 0;
var procent = 0.0;

var zaci = []; //kolekce připojených žáků

var id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');

const konecmistnosti = document.getElementById('konecmistnosti');
konecmistnosti.addEventListener('click', () => window.history.go(-1)); //odhlášení z místnosti

const seznamZaku = document.getElementById('seznamZaku'); //div se sezamem žáků
seznamZaku.innerHTML = '';

const seznamUpozorneni = document.getElementById('seznamUpozorneni');
seznamUpozorneni.innerHTML = '';

var zpravy = ['Nestíhám zápis', 'Nerozumím učivu', 'Zvládám bez problému']; //předvolené zprávy

//při připojení
socket.on('connect', () =>
{
    socket.emit('hostConnect', data => {
        roomName = data;
        roomNum = data.substring(4);
        divRoomNumber.innerHTML = ('#' + roomNum);
    });
    
    id = socket.id; 
});

socket.on('newUser', (user) => {
    prihlaseni(user);
    pocetZaku++;
});

socket.on('userLeft', (id) => {
    odhlaseni(id);
    pocetZaku--;
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
        <span class="text-black px-2">${element.userName}</span>
                        <svg class="w-6 text-comeniodark rounded-md" fill="none" 
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7">
                        </path></svg>`
    
        seznamZaku.appendChild(div);
        

    });
}
function vlastniZprava(msg, jmeno)
{
    const div = document.createElement('div');
    div.classList.add('zaznam');
    div.innerHTML = `
    <svg class="w-8 text-sky-800 pl-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="text-gray-900 px-2 xl:font-medium">${jmeno}:</span>
                    <span class="text-gray-900 ">${msg}</span>`

    div.classList.add('vlastni');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
}

function prednastavenaZprava(msg, jmeno)
{
    const div = document.createElement('div');
    div.classList.add('zaznam');
    div.innerHTML = `
    <svg class="w-8 text-sky-800 pl-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="text-gray-900 px-2 xl:font-medium">${jmeno}:</span>
                    <span class="text-gray-900 ">${zpravy[msg]}</span>`

    div.classList.add('prednastavena');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
}