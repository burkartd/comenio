const { text } = require("express");

const socket = io();



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

function actTlacitka(akce) //aktualizuje div rtlacitka
{
    var fce = new Array[3];
    var text = new Array[3];

    if(akce == 'reset')
    {
        fce = [`actTlacitka('tempo')`, `actTlacitka('problem')`, `actTlacitka('reakce')`];
        text = [`Tempo hodiny`, `Problémy s učivem`, `Reakce na otázku`];
    }
    else if(akce = 'tempo')
    {
        fce = [`actTlacitka('reset')`, `actTlacitka('reset')`, `actTlacitka('reset')`];
        text = [`Tempo 1`, `Tempo 2`, `Tempo 3`];
    }
    
    tlacitka.innerHTML = '';

    tlacitka.innerHTML = `
            <div onclick="${fce[1]}" class="tlacitko">
                <h4 class="py-10 px-12">
                    <p>${text[1]}</p>
                </h4>
            </div>
            <div onclick="${fce[2]}" class='tlacitko'>
                <h4 class="py-10 px-12 hover:shadow">
                    <p>${text[2]}</p>
                </h4>
            </div>
            <div onclick="${fce[3]}" class="tlacitko">
                <h4 class="py-10 px-12">
                    <p>${text[3]}</p>
                </h4>
            </div>
    `;
}