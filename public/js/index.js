const socket = io();

const frm = document.getElementById("frm");
const btn = document.getElementById("btnSubmit");

const roomInput = document.getElementById('roominput');
const nameInput = document.getElementById('nameinput');

const upJmeno = document.getElementById('upozornenijmeno');
const upMistnost = document.getElementById('upozornenimistnost');

const vlajka = document.getElementById('vlajka');

var jazyk = 'cz';

//Enter == zmáčknutí tlačítka
roomInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //drz hubu je mi to jedno
      event.preventDefault();
      btn.click();
    }
  });


  vlajka.addEventListener('click', () => {
    if(jazyk === 'cz')
    {
      vlajka.innerHTML = `<img src="./img/ua.png" id="ua" class="mx-auto px-auto ">`;
      jazyk = 'uk';
      IndexText(1); //do ua
    }
    else if(jazyk === 'uk')
    {
      vlajka.innerHTML = `<img src="./img/cz.png" id="ua" class="mx-auto px-auto ">`;
      jazyk = 'cz';
      IndexText(0); //do ua
    }
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
          setTimeout(RoomErr, 2500);
          return;
      }
      if(data.jmenoOk == false)
      {
        nameInput.value = '';
        nameInput.focus();
        upJmeno.classList.remove('hidden');
        setTimeout(NameErr, 2500);
        return;
      }
    
      frm.submit();
      document.getElementById("theForm").submit(); //pokud všechno ok - potvrzení formu
     });
});


function NameErr()
{
  upJmeno.classList.add('hidden');
}
function RoomErr()
{
  upMistnost.classList.add('hidden');
}