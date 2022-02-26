const socket = io();

var roomNum = -1; //číslo roomky, získá se v callback funkci
var roomName = '';

var zaci = []; //kolekce připojených žáků

var id; // id sockety

const divRoomNumber = document.getElementById('roomNumber');

const seznamZaku = document.getElementById('seznamZaku'); //div se sezamem žáků
seznamZaku.innerHTML = '';
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
    var jmeno = user.userName;
    zaci.push(user);
    novyZak(jmeno);

    console.log(zaci);
});

socket.on('userLeft', (id) => {
    odhlaseni(id);
})

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
    
        document.querySelector('.devSeznam').appendChild(div);


    });
}


function novyZak(jmeno)
{
    const div = document.createElement('div');
    div.classList.add('zaznam');
    div.innerHTML = `
    <span class="text-black px-2">${jmeno}</span>
                    <svg class="w-6 text-comeniodark rounded-md" fill="none" 
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7">
                    </path></svg>`

    document.querySelector('.devSeznam').appendChild(div);

}


