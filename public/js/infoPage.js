const socket = io();
const tlacitkoVpred = document.getElementById('prave');
const tlacitkoZpet = document.getElementById('leve');
const textovePole = document.getElementById('textinfo');
const startkviz = document.getElementById('startkviz');
const otazka = document.getElementById('otazka');
const prvni = document.getElementById('prvni');
const druha = document.getElementById('druha');
const treti = document.getElementById('treti');
const znovu = document.getElementById('znovukviz');
var PocetInfoSlidu = 0;
var CisloSlidu = 0;
var CisloOtazky = 0;
var SpravnychOdpovedi = 0;
var beziInfo = false;
var beziKviz = false;

socket.on('connect', () => { //připojení - ohlášení uživatele
   
    socket.emit('infoPageConnect', (data)=> {
      if(data.pripojit == false)
      {
          window.location.href = 'index.html';
      } 
       
    });
    ZacitInfo();
});

tlacitkoVpred.addEventListener('click', ()=> {
    DalsiSlide(); 
})
tlacitkoZpet.addEventListener('click', ()=> {
    PredchoziSlide();
    startkviz.classList.add('hidden');
})

function DalsiSlide()
{
    CisloSlidu = Math.max(0, CisloSlidu);
    socket.emit('ziskejInfoSlide', CisloSlidu, (data) => {
        if(data.posledni === true)
        {
            startkviz.classList.remove('hidden');
            textovePole.innerHTML = "";
        }
        else
        {
            textovePole.innerHTML = data.text;
            CisloSlidu++; 
        }
    })
}
function PredchoziSlide()
{
    CisloSlidu--;
    if(CisloSlidu < 0) return;
    CisloSlidu--; 
    DalsiSlide();

}

startkviz.addEventListener('click', ()=>{
    document.getElementById('info').classList.add('hidden');
    document.getElementById('kviz').classList.remove('hidden');
    startkviz.classList.add('hidden');
    DalsiOtazka();
})

function ZacitInfo()
{
    document.getElementById('kviz').classList.add('hidden');
    document.getElementById('rozcesti').classList.add('hidden');
    document.getElementById('info').classList.remove('hidden');
    var PocetInfoSlidu = 0;
    CisloSlidu = 0;
    CisloOtazky = 0;
    SpravnychOdpovedi = 0;
    CisloSlidu = 0;
    DalsiSlide();
}

function Rozcesti()
{

}


function DalsiOtazka()
{
    socket.emit('ziskejInfoOtazka', CisloOtazky, (data)=>{
        
        if(data.posledni === true)
        {
            document.getElementById('kviz').classList.add('hidden');
            document.getElementById('rozcesti').classList.remove('hidden');
            Rozcesti();
        }
        else
        {
            
            otazka.innerHTML = data.otazka;
            prvni.innerHTML = data.odpovedi[0].text;
            druha.innerHTML = data.odpovedi[1].text;
            treti.innerHTML = data.odpovedi[2].text;
        }
    })
}

function Odpoved(cislo, tlacitko)
{
    socket.emit('kontrolaOdpovedi', CisloOtazky, (data)=>{
        var spravna = data.spravna;
        console.log(spravna, cislo);
        if(spravna === cislo)
        {
            // spravne
            console.log('spravne');
            SpravnychOdpovedi++;
            //tlacitko.classList.add('');
        }
        else
        {
            
            console.log('spatne');
            var arr = ['prvni','druha','treti'];
            const odpovedspravna = document.getElementById(arr[spravna-1]);
        }
    })

    CisloOtazky++;
    setTimeout(()=>{
        DalsiOtazka();
      }, 1000);
    
}

prvni.addEventListener('click', ()=>{
    Odpoved(1, prvni);
})
druha.addEventListener('click', ()=>{
    Odpoved(2, druha);
})
treti.addEventListener('click', ()=>{
    Odpoved(3, treti);
})

znovu.addEventListener('click', ()=>{
    ZacitInfo();
})