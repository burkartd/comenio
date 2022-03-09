const socket = io();

const frm = document.getElementById("frm");
const btn = document.getElementById("btnSubmit");

const roomInput = document.getElementById('roominput');

var roomNumber = 69;

roomInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //drz hubu je mi to jedno
      event.preventDefault();
      btn.click();
    }
  });




btn.addEventListener('click', () => {
    
    var roomnum = roomInput.value;
    
    
    console.log(roomnum);

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