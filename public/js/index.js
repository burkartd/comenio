

const check = document.querySelector('#check');
const menu = document.querySelector('#menu');

check.addEventListener('click', () => {
    if(menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    }else{
        menu.classList.add('hidden');
    }
}
)