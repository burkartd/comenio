const socket = io();

const frm = document.getElementById("frm");
const btn = document.getElementById("btnSubmit");

const roomInput = document.getElementById('roominput');
const nameInput = document.getElementById('nameinput');

const upJmeno = document.getElementById('upozornenijmeno');
const upJmeno2 = document.getElementById('upozornenijmeno2');
const upMistnost = document.getElementById('upozornenimistnost');

const vlajka = document.getElementById('vlajka');
const vlajkauk = document.getElementById('ua');
const vlajkacz = document.getElementById('cz');

var jazyk = 'cz';

//Enter == zmáčknutí tlačítka
roomInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //drz hubu je mi to jedno
      event.preventDefault();
      btn.click();
    }
  });


vlajkauk.addEventListener('click', () => {
  vlajkacz.classList.add('border-comeniowhiteblue');
  vlajkacz.classList.remove('border-comeniodark');
  vlajkauk.classList.add('border-comeniodark');
  vlajkauk.classList.remove('border-comeniowhiteblue');
  jazyk = 'uk';
  IndexText(1);
})

vlajkacz.addEventListener('click', () => {
  vlajkauk.classList.add('border-comeniowhiteblue');
  vlajkauk.classList.remove('border-comeniodark');
  vlajkacz.classList.add('border-comeniodark');
  vlajkacz.classList.remove('border-comeniowhiteblue');
  jazyk = 'cz';
  IndexText(0);
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
