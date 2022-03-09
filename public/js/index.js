const socket = io();

const frm = document.getElementById("frm");
const btn = document.getElementById("btnSubmit");

const roomInput = document.getElementById('roominput');

//Enter == zmáčknutí tlačítka
roomInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //drz hubu je mi to jedno
      event.preventDefault();
      btn.click();
    }
  });

  //tlačítko potvrzení formu
btn.addEventListener('click', () => {
    
    var roomnum = roomInput.value;

    //kontrola jestli místnost existuje
    socket.emit('checkRoom', roomnum, (data) => {
        if(data == false)
        {
            roomInput.value = '';
            roomInput.focus();
        } 
        else{
         frm.submit();
         document.getElementById("theForm").submit();
        }
     });
});