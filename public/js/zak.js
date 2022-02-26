const socket = io();

var zaci = []; //kolekce připojených žáků

var id; // id sockety

var userName = 'kunda';
var roomNumber = 56;

socket.on('connect', () => {
    socket.emit('userConnect', userName, roomNumber, (data) => {
        alert(data);
    })
});



const tlacitka = document.getElementById('rtlacitka');
const btnTempo = document.getElementById('btnTempo');
function reakce(n)
{
    alert('reakce' + n);
}

function test()
{
    document.getElementById('rtlacitka').innerHTML = `fff`;
}

function zpravaUciteli(msg)
{
    socket.emit('reakceZaka', {jmeno: 'Žák xd', zprava: msg}); //pošle zprávu serveru
    actTlacitka('reset'); //aktualizuje tlacitka na vychozi
    console.log('zpráva se odeslala' + msg);
}


function actTlacitka(akce) //aktualizuje div rtlacitka
{
    var fce = new Array(3);
    var text = new Array(3);

    if(akce == 'reset')
    {
        fce = [`actTlacitka('tempo')`, `actTlacitka('problem')`, `actTlacitka('reakce')`];
        text = [`Tempo hodiny`, `Problémy s učivem`, `Reakce na otázku`];
    }
    else if(akce = 'tempo')
    {
        fce = [`zpravaUciteli('tempo 1')`, `zpravaUciteli('tempo 2')`, `zpravaUciteli('tempo 3')`];
        text = [`Tempo 1`, `Tempo 2`, `Tempo 3`];
    }
    else if(akce = 'problem')
    {
        fce = [`zpravaUciteli('problem 1')`, `zpravaUciteli('problem 2')`, `zpravaUciteli('problem 3')`];
        text = [`Problem 1`, `Problem 2`, `Problem 3`];
    }
    else if(akce = 'Reakce')
    {
        fce = [`zpravaUciteli('reakce 1')`, `zpravaUciteli('reakce 2')`, `zpravaUciteli('reakce 3')`];
        text = [`Reakce 1`, `Reakce 2`, `Reakce 3`];
    }
    else
    {
        throw new Error('chyba ve vyberu tlacitek');
    }

    //tlacitka.innerHTML = '';

    tlacitka.innerHTML = `
            <div onclick="${fce[0]}" class="tlacitko">
                <h4 class="py-10 px-12">
                    <p>${text[0]}</p>
                </h4>
            </div>
            <div onclick="${fce[1]}" class='tlacitko'>
                <h4 class="py-10 px-12 hover:shadow">
                    <p>${text[1]}</p>
                </h4>
            </div>
            <div onclick="${fce[2]}" class="tlacitko">
                <h4 class="py-10 px-12">
                    <p>${text[2]}</p>
                </h4>
            </div>
    `;
}