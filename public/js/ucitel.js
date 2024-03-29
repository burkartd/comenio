
console.log(ucitelDataZpravy);
//const { emit } = require("nodemon");
vymazatvse.addEventListener('click', () => {
    seznamUpozorneni.innerHTML = '';
    pocetUpozorneni = 0;
}); //odhlášení z místnosti

function pocetZakuUpdate()
{
    zaku.innerHTML = pocetZaku;
}

socket.on('getinfo', (cb) =>{
    cb({
        pripojit: true,
        anketa: jeAnketaAktivni,
        odpovedi: jeOdpovedAktivni,
        odpovediNazev: nazevOtazky,
        lang: JazykUcitelGlob
    });
})


//při připojení
socket.on('connect', () =>
{
    socket.emit('hostConnect', data => {
        roomName = data;
        roomNum = data.substring(4);
        divRoomNumber.innerHTML = ('#' + roomNum);
        document.title = 'Comenio #' + roomNum;
    });
    
    id = socket.id; 

    seznamUpozorneni.innerHTML = '';
    pocetUpozorneni = 0;

    while(AnketaSplneno.length > 0) {AnketaSplneno.pop();}
    while(zaci.length > 0) {zaci.pop();}

    jeAnketaAktivni = false;
    jeOdpovedAktivni = false;
    nazevOtazky = '';

    seznamZaku.innerHTML = '';

    pocetZaku = 0;
    zaku.innerHTML = pocetZaku;

    NastavJazyk();
});

socket.on('newUser', (zak) => {
    pocetZaku++;
    
    zaci.push(zak);
    zaciUpdate(); //upraví seznam žáků
    if(jeAnketaAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `${ucitelDataChart["typ1"][JazykUcitelGlob]}: ${hotovychZaku}/${pocetZaku}`;;
        updateGraf(hotovychZaku, pocetZaku, 1);
    }
    if(jeOdpovedAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `${ucitelDataChart["typ2"][JazykUcitelGlob]}: ${hotovychZaku}/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 2);
    }

    pocetZakuUpdate();
    zaku.innerHTML = pocetZaku;
    
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
    //nazevOtazky = 'název pičo'
    socket.emit('spustitAnketu');
}

function zacitOdpovedi(lokNazev)
{
    zaci.forEach(zak => {
        AnketaSplneno.push({id: zak.id, splneno: false});
    });
    jeOdpovedAktivni = true;
    socket.emit('spustitOdpovedi', {nazev: lokNazev, lang: JazykUcitelGlob});
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
            //nadpis.innerHTML = `Hotových žáků: ${hotovychZaku}/${pocetZaku}`;
            nadpis.innerHTML = `${ucitelDataChart["typ1"][JazykUcitelGlob]}: ${hotovychZaku}/${pocetZaku}`
            updateGraf(hotovychZaku, pocetZaku, 1);
        }
        if(jeOdpovedAktivni)
        {
            if(AnketaSplneno[index].splneno == true){hotovychZaku--;}
            AnketaSplneno.splice(index, 1);
            nadpis.innerHTML = `${ucitelDataChart["typ2"][JazykUcitelGlob]}:  ${hotovychZaku}/${pocetZaku}`;
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
        nadpis.innerHTML = `${ucitelDataChart["typ1"][JazykUcitelGlob]}: 0/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 1);
    }
    if(jeOdpovedAktivni)
    {
        AnketaSplneno.push({id: zak.id, splneno: false});
        nadpis.innerHTML = `${ucitelDataChart["typ2"][JazykUcitelGlob]}: 0/${pocetZaku}`;
        updateGraf(hotovychZaku, pocetZaku, 2);
    }
    
}

function zaciUpdate() //přepíše seznam žáků
{
    seznamZaku.innerHTML = '';
    zaci.forEach(element => {
        
        const div = document.createElement('div');
        div.classList.add('zaznam');
        //console.log(element.id);
        div.dataset.zakid = element.id;
        //console.log(div.dataset);
        div.setAttribute('onclick','zpravaZakovi(this)');
        div.innerHTML = `
        <span class="text-comeniowhiteblue mr-4">${element.userName}</span>
                    <svg class="w-8 text-comeniowhiteblue bg-comenioblue rounded-full cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg" title="Plusko u žáka - Jednotlivému žákovi budeme moci poslat upozornění - Momentálně připravujeme."><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                     </path></svg>`
    
        seznamZaku.appendChild(div);
        

    });
}
var zakovoid;
function zpravaZakovi(element)
{
    zakovoid = element.dataset.zakid;

    const index = zaci.findIndex(zaci => zaci.id === zakovoid);
    jmeno = zaci[index].userName;

    document.getElementById('zpravaZakoviJmeno').innerHTML = jmeno;
    divZpravaZakovi.classList.add('active');
    
}

zpravaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get message text
    let zprava = e.target.elements.msg3.value;

    zprava = zprava.trim();

    e.target.elements.msg3.value = '';

    socket.emit('zpravaZakovi', {msg: zprava, zakid: zakovoid, lang: JazykUcitelGlob, typ: 'vlastni'})

    console.log(zprava);

    setTimeout(()=>{
        divZpravaZakovi.classList.remove('active');
    }, 200)

    
})

document.getElementById('prednastavena1').addEventListener('click', () => {
    
    let data = {typ: 'prednastavena', msg: 1, zakid: zakovoid, lang: JazykUcitelGlob};
    
    // socket.emit('zpravaZakovi', {msg: 'Buď aktivnější', zakid: zakovoid});
    socket.emit('zpravaZakovi', data)
    setTimeout(()=>{
        divZpravaZakovi.classList.remove('active');
    }, 200)
})

document.getElementById('prednastavena2').addEventListener('click', () => {
    
    let data = {typ: 'prednastavena', msg: 2, zakid: zakovoid, lang: JazykUcitelGlob};
    
    // socket.emit('zpravaZakovi', {msg: 'Buď aktivnější', zakid: zakovoid});
    socket.emit('zpravaZakovi', data)
    setTimeout(()=>{
        divZpravaZakovi.classList.remove('active');
    }, 200)
})



document.getElementById('svgZavritZpravu').addEventListener('click', () => {
    divZpravaZakovi.classList.remove('active');
})


async function vlastniZprava(data)
{
    const msg = data.zprava;
    const jmeno = data.jmeno;
    const div = document.createElement('div');
    div.classList.add('zaznamodpoved');
    div.classList.add('stin');
    if(data.jazyk === JazykUcitelGlob)
    {
        div.innerHTML = `
        <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        <span class="ml-2">${jmeno}: </span>
        <span class="ml-2 font-semibold" style="word-wrap: break-word">${msg}</span>
        <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        <span class="justify-end ml-4 mr-4">${casFormat()}</span>`

    }
    else
    {   
        const bar = await translate(msg, {from: data.jazyk, to: JazykUcitelGlob });
        div.innerHTML = `
                    <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span class="w-8 ml-2">
                    <img src="./img/${data.jazyk}.png" id="ua" class="">
                    </span>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold" style="word-wrap: break-word">${bar} ${document.getElementById('cbukrajina').checked ?` | ${msg}` : ``}</span>
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
    
    console.log(ucitelDataZpravy);

    if(data.jazyk === JazykUcitelGlob)
    {
        div.innerHTML = `
                    <svg class="w-12 text-blue-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold" style="word-wrap: break-word">${ucitelDataZpravy[msg][JazykUcitelGlob]}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span class="justify-end ml-4 mr-4">${casFormat()}</span>`
        
        
        
    }
    else
    {
        div.innerHTML = `
                    <svg class="w-12 text-blue-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    <span class="w-8 ml-2">
                    <img src="./img/${data.jazyk}.png" id="ua" class="">
                    </span>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold" style="word-wrap: break-word">${ucitelDataZpravy[msg][JazykUcitelGlob]} ${document.getElementById('cbukrajina').checked ?` | ${ucitelDataZpravy[msg][data.jazyk]}` : ``} </span>
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
    
    if(data.jazyk === JazykUcitelGlob)
    {
        div.innerHTML = `
        <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="ml-2">${jmeno}: </span>
                        <span class="ml-2 font-semibold" style="word-wrap: break-word">${msg}</span>
                        <svg onclick="smazJeden(this)" class="w-8 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        <span class="justify-end ml-4 mr-4">${casFormat()}</span>`
        
    }
    else
    {
        
        const bar = await translate(msg, {from: data.jazyk, to: JazykUcitelGlob });
        
        div.innerHTML = `
        <svg class="w-12 text-red-700 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span class="w-8 ml-2">
                    <img src="./img/${data.jazyk}.png" id="ua" class="">
                    </span>
                    <span class="ml-2">${jmeno}: </span>
                    <span class="ml-2 font-semibold" style="word-wrap: break-word">${bar} ${document.getElementById('cbukrajina').checked ?` | ${msg}` : ``}</span>
                    <svg onclick="smazJeden(this)" class="w-8 ml-auto cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

