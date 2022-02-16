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
