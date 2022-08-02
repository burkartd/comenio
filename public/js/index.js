const socket = io();

const frm = document.getElementById("frm");
const btn = document.getElementById("btnSubmit");

const roomInput = document.getElementById('roominput');
const nameInput = document.getElementById('nameinput');

const upJmeno = document.getElementById('upozornenijmeno');
const upJmeno2 = document.getElementById('upozornenijmeno2');
const upMistnost = document.getElementById('upozornenimistnost');

const vlajka = document.getElementById('vlajka');
const vlajka1 = document.getElementById('vlajka1');
const vlajka2 = document.getElementById('vlajka2');
const vlajka3 = document.getElementById('vlajka3');
const vlajka4 = document.getElementById('vlajka4');
const vlajka5 = document.getElementById('vlajka5');

var jazyk = 'cz';

//Enter == zmáčknutí tlačítka
roomInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //drz hubu je mi to jedno
      event.preventDefault();
      btn.click();
    }
  });


vlajka1.addEventListener('click', () => { //uk
  vlajka2.classList.add('border-comeniowhiteblue');
  vlajka2.classList.remove('border-comeniodark');
  vlajka1.classList.add('border-comeniodark');
  vlajka1.classList.remove('border-comeniowhiteblue');
  jazyk = 'uk';
  IndexText('ua');
})

vlajka2.addEventListener('click', () => { //ostatni
  vlajka1.classList.add('border-comeniowhiteblue');
  vlajka1.classList.remove('border-comeniodark');
  vlajka2.classList.add('border-comeniodark');
  vlajka2.classList.remove('border-comeniowhiteblue');
  jazyk = vlajka2.dataset.jazyk;
  IndexText(jazyk);
})

vlajka3.addEventListener('click', () => { //ostatni
  vlajka1.classList.add('border-comeniowhiteblue');
  vlajka1.classList.remove('border-comeniodark');
  vlajka2.classList.add('border-comeniodark');
  vlajka2.classList.remove('border-comeniowhiteblue');
  
  let jazykOrig = vlajka2.dataset.jazyk;
  let jazykNovy = vlajka3.dataset.jazyk;
  let vlajkaOrig = vlajka2.src;
  let vlajkaNova = vlajka3.src;

  vlajka3.dataset.jazyk = jazykOrig
  vlajka3.src = vlajkaOrig

  vlajka2.dataset.jazyk = jazykNovy
  vlajka2.src = vlajkaNova

  jazyk = jazykNovy;

  IndexText(jazykNovy);
})

vlajka4.addEventListener('click', () => { //ostatni
  vlajka1.classList.add('border-comeniowhiteblue');
  vlajka1.classList.remove('border-comeniodark');
  vlajka2.classList.add('border-comeniodark');
  vlajka2.classList.remove('border-comeniowhiteblue');
  
  let jazykOrig = vlajka2.dataset.jazyk;
  let jazykNovy = vlajka4.dataset.jazyk;
  let vlajkaOrig = vlajka2.src;
  let vlajkaNova = vlajka4.src;

  vlajka4.dataset.jazyk = jazykOrig
  vlajka4.src = vlajkaOrig

  vlajka2.dataset.jazyk = jazykNovy
  vlajka2.src = vlajkaNova

  jazyk = jazykNovy;

  IndexText(jazykNovy);
})

vlajka5.addEventListener('click', () => { //ostatni
  vlajka1.classList.add('border-comeniowhiteblue');
  vlajka1.classList.remove('border-comeniodark');
  vlajka2.classList.add('border-comeniodark');
  vlajka2.classList.remove('border-comeniowhiteblue');
  
  let jazykOrig = vlajka2.dataset.jazyk;
  let jazykNovy = vlajka5.dataset.jazyk;
  let vlajkaOrig = vlajka2.src;
  let vlajkaNova = vlajka5.src;

  vlajka5.dataset.jazyk = jazykOrig
  vlajka5.src = vlajkaOrig

  vlajka2.dataset.jazyk = jazykNovy
  vlajka2.src = vlajkaNova

  jazyk = jazykNovy;

  IndexText(jazykNovy);
})
  //tlačítko potvrzení formu
btn.addEventListener('click', () => {
    
  str = nameInput.value.trim();
  var regExp = /[a-zA-Z]/g;

  if(str.length < 1 || !regExp.test(str))
  {
    //špatný input jména
    console.log('spatne jmeno')
    nameInput.value = '';
    nameInput.focus();
    upJmeno2.classList.remove('hidden');
          setTimeout(()=>{
            upJmeno2.classList.add('hidden');
          }, 2500);
    return;
  }
    
  var roomnum = roomInput.value;

  //kontrola jestli místnost existuje
  socket.emit('checkRoom', roomnum, str, (data) => {
      if(data.mistnostExistuje == false)
      {
          roomInput.value = '';
          roomInput.focus();
          upMistnost.classList.remove('hidden');
          setTimeout(()=>{
            upMistnost.classList.add('hidden');
          }, 2500);
          return;
      }
      if(data.jmenoOk == false)
      {
        nameInput.value = '';
        nameInput.focus();
        upJmeno.classList.remove('hidden');
        setTimeout(()=>{
          upJmeno.classList.add('hidden');
        }, 2500);
        return;
      }
    
      const params = new URLSearchParams({
        userName: nameInput.value,
        roomNumber: roomInput.value,
        lang: jazyk,
      });
      console.log('/zak.html?' + params.toString());
      window.location.href = '/zak.html?' + params.toString();
      //frm.submit();
     });
});
