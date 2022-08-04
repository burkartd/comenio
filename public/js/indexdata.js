
//česky, ukrajinsky, německy, polsky, anglicky

var indexData = {
    "upozornenijmeno": 
                    {"cs":"Takové jméno už je v místnosti", 
                    "uk": "Така назва вже є в кімнаті",
                    "de": "Dieser Name steht bereits im Raum",
                    "pl": "To nazwisko jest już w pokoju",
                    "en": "The name is already in the room!"},
     "upozornenijmeno2":
                    {"cs":"Zadej své jméno", 
                    "uk": "Введіть ім'я!",
                    "de": "Geben Sie Ihren Namen ein",
                    "pl": "Wpisz swoje imię i nazwisko",
                    "en": "Type your name!"},
     "upozornenimistnost": 
                    {"cs":"Tato místnost neexistuje!", 
                    "uk": "Цієї кімнати не існує!",
                    "de": "Diesen Raum gibt es nicht!",
                    "pl": "Ten pokój nie istnieje!",
                    "en": "This room does not exist!"},
     "btnSubmit": 
                    {"cs":"Připojit se", 
                    "uk": "Приєднуйтесь",
                    "de": "Beitreten",
                    "pl": "Dołącz do",
                    "en": "Join room"},
     "zalozitmistnost":
                    {"cs":"Založit místnost", 
                    "uk": "Розпочніть кімнату",
                    "de": "Einen Raum einrichten",
                    "pl": "Ustawić pokój",
                    "en": "Create room"}
}

function IndexText(jazyk)
{
    Object.keys(indexData).forEach((key)=>{
        document.getElementById(key).innerText = indexData[key][jazyk]; 
    });
    let phjmeno = 
                    {"cs":"Jméno", 
                    "uk": "Ім'я",
                    "de": "Name",
                    "pl": "Nazwa",
                    "en": "Name"};
    let phmistnost =
                    {"cs":"Kód místnosti", 
                    "uk": "Код номеру",
                    "de": "Raum-Code",
                    "pl": "Kod pomieszczenia",
                    "en": "Room code"};
    document.getElementById('nameinput').placeholder = phjmeno[jazyk];
    document.getElementById('roominput').placeholder = phmistnost[jazyk];
}