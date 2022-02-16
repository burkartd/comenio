const check = document.querySelector('#check');
const menu = document.querySelector('#menu');

const socket = io();

// const btn_join = document.getElementById('button');

// btn_join.onclick = function()
// {

// }

check.addEventListener('click', () => {
    if(menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    }else{
        menu.classList.add('hidden');
    }
}
)