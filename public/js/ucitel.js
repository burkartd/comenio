//const { emit } = require("nodemon");
vymazatvse.addEventListener('click', () => {
    seznamUpozorneni.innerHTML = '';
    pocetUpozorneni = 0;
}); //odhlášení z místnosti

var zpravy = ['Nestíhám zápis', 'Nerozumím učivu', 'Zvládám bez problému']; //předvolené zprávy

function pocetZakuUpdate()
{
    zaku.innerHTML = pocetZaku;
}

socket.on('getinfo', (cb) =>{
    cb({
        pripojit: true,
        anketa: jeAnketaAktivni,
        odpovedi: jeOdpovedAktivni
    });
})


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

    pocetZakuUpdate(); //žádní tam nejsou žejo
    zaku.innerHTML = pocetZaku;
});

socket.on('newUser', (zak) => {
    pocetZaku++;
    
    zaci.push(zak);
    zaciUpdate(); //upraví seznam žáků
    if(jeAnketaAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `Hotových žáků: ${hotovychZaku}/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 1);
    }
    if(jeOdpovedAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `Odpovědí: ${hotovychZaku}/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 2);
    }

    pocetZakuUpdate();
    zaku.innerHTML = pocetZaku;
    //cb({zprava: 'ahojky'});
});

socket.on('userLeft', (id) => {
    pocetZaku--;
    odhlaseni(id);
    pocetZakuUpdate();
    zaku.innerHTML = pocetZaku;

})

socket.on('upozorneni', (data, id) => {   
    
    if(data.druh === 1) { prednastavenaZprava(data); return; } //předvolená zpráva
    if(data.druh === 2) { vlastniZprava(data); return; } //vlastní zpráva
    if(data.druh === 3) //anketa
    {
        const index = zaci.findIndex(zaci => zaci.id === id);
        if(index === -1) return;
        odpovedZprava(data);
        var node = Array.from(seznamZaku.childNodes)[index];
        node.classList.remove('nesplnil');
        node.classList.add('splnil');
        hotovychZaku++;
        AnketaSplneno[index].splneno = true;
        updateGraf(hotovychZaku, pocetZaku, 2);
    }
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
        AnketaSplneno[index].splneno = true;
    }
    else //zak si to rozmyslel
    {
        node.classList.remove('splnil');
        node.classList.add('nesplnil');
        hotovychZaku--;
        AnketaSplneno[index].splneno = false;
    }
    
    updateGraf(hotovychZaku, pocetZaku, 1);
    procent = 100*hotovychZaku*1.0/pocetZaku;
})

function zacitAnketu()
{
    // var nodes = Array.from(seznamZaku.childNodes);
    // nodes.forEach(node => {
    //     node.classList.add('nesplnil'); //přidá třídu že není splněn
    // });
    zaci.forEach(zak => {
        AnketaSplneno.push({id: zak.id, splneno: false});
    });
    jeAnketaAktivni = true;
    socket.emit('spustitAnketu', 'splnils?');
}

function zacitOdpovedi()
{
    zaci.forEach(zak => {
        AnketaSplneno.push({id: zak.id, splneno: false});
    });
    jeOdpovedAktivni = true;
    socket.emit('spustitOdpovedi');
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
    
    if(jeAnketaAktivni === true)
    {
        jeAnketaAktivni = false;
        socket.emit('ukoncitAnketu');
    }
    if(jeOdpovedAktivni === true)
    {
        jeOdpovedAktivni = false;
        socket.emit('ukoncitOdpovedi');
    }

    
    

    while(AnketaSplneno.length > 0) {AnketaSplneno.pop();}
    
}

function odhlaseni(id)
{
    const index = zaci.findIndex(zaci => zaci.id === id);
    if(index !== -1)
    {
        if(jeAnketaAktivni)
        {
            if(AnketaSplneno[index].splneno == true){hotovychZaku--;}
            AnketaSplneno.splice(index, 1);
            nadpis.innerHTML = `Hotových žáků: ${hotovychZaku}/${pocetZaku}`;
            updateGraf(hotovychZaku, pocetZaku, 1);
        }
        if(jeOdpovedAktivni)
        {
            if(AnketaSplneno[index].splneno == true){hotovychZaku--;}
            console.log(AnketaSplneno, hotovychZaku);
            AnketaSplneno.splice(index, 1);
            nadpis.innerHTML = `Odpovědí: ${hotovychZaku}/${pocetZaku}`;
            updateGraf(hotovychZaku, pocetZaku, 2);
        }
        zaci.splice(index, 1);
        zaciUpdate();
    }

}

function prihlaseni(zak)
{
    zaci.push(zak);
    zaciUpdate(); //upraví seznam žáků
    if(jeAnketaAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `Hotových žáků: 0/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 1);
    }
    if(jeOdpovedAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `Odpovědí: 0/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 2);
    }
    
}

function zaciUpdate() //přepíše seznam žáků
{
    seznamZaku.innerHTML = '';
    zaci.forEach(element => {
        
        const div = document.createElement('div');
        div.classList.add('zaznam');
        div.innerHTML = `
        <span class="text-comeniowhiteblue mr-4">${element.userName}</span>
                    <svg class="w-8 text-comeniowhiteblue bg-comenioblue rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                     </path></svg>`
    
        seznamZaku.appendChild(div);
        

    });
}
async function vlastniZprava(data)
{
    const msg = data.zprava;
    const jmeno = data.jmeno;
    const div = document.createElement('div');
    div.classList.add('zaznamodpoved');
    div.classList.add('stin');
    if(data.jazyk === 'uk')
    {
        const bar = await translate(msg, {from: "uk", to: "cs" });
        console.log(bar);
        div.innerHTML = `
                    <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span class="w-8 ml-2">
                    <img src="./img/ua.png" id="ua" class="">
                    </span>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold">${bar}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`
    }
    else
    {
        div.innerHTML = `
        <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        <span class="ml-2">${jmeno}: </span>
        <span class="ml-2 font-semibold">${msg}</span>
        <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        <span class="justify-end ml-4 mr-4">${casFormat()}</span>`
    }
    

    //div.classList.add('vlastni');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
    pocetUpozorneni++;
}

function prednastavenaZprava(data)
{
    const msg = data.zprava;
    const jmeno = data.jmeno;
    const div = document.createElement('div');
    div.classList.add('zaznamodpoved');
    div.classList.add('stin');
    
    if(data.jazyk === 'uk')
    {
        div.innerHTML = `
                    <svg class="w-12 text-blue-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="w-8 ml-2">
                    <img src="./img/ua.png" id="ua" class="">
                    </span>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold">${zpravy[msg]}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`

    }
    else
    {
        div.innerHTML = `
                    <svg class="w-12 text-blue-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold">${zpravy[msg]}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`

    }
   
    //div.classList.add('prednastavena');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
    pocetUpozorneni++;
}

async function odpovedZprava(data)
{
    const msg = data.zprava;
    const jmeno = data.jmeno;
    const div = document.createElement('div');
    div.classList.add('zaznamodpoved');
    div.classList.add('stin');
    
    if(data.jazyk === 'uk')
    {
        const bar = await translate(msg, {from: "uk", to: "cs" });
        console.log(bar);
        div.innerHTML = `
        <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span class="w-8 ml-2">
                    <img src="./img/ua.png" id="ua" class="">
                    </span>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold">${bar}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`
    }
    else
    {
        div.innerHTML = `
        <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        <span class="ml-2">${jmeno}: </span>
                        <span class="ml-2 font-semibold">${msg}</span>
                        <svg onclick="smazJeden(this)" class="w-8 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        <span class="justify-end ml-4 mr-4">${casFormat()}</span>`
    
    }
    
    //div.classList.add('prednastavena');
    seznamUpozorneni.appendChild(div);
    seznamUpozorneni.scrollTop = seznamUpozorneni.scrollHeight;
    pocetUpozorneni++;
}



function casFormat() //vrátí čas hh:mm
{
    var cas = new Date();
    var h = cas.getHours();
    var m = cas.getMinutes();
    if(m<10) m = '0' + m;
    return h + ':' + m;
}

function smazJeden(el) //smaže vybranou zprávu
{
    var element = el;
    element.parentElement.remove();
}


