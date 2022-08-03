
//česky, ukrajinsky, německy, polsky, anglicky

var indexData = {
    "upozornenijmeno": 
                    {"cz":"Takové jméno už je v místnosti", 
                    "ua": "Така назва вже є в кімнаті",
                    "de": "Dieser Name steht bereits im Raum",
                    "pl": "To nazwisko jest już w pokoju",
                    "en": "The name is already in the room!"},
     "upozornenijmeno2":
                    {"cz":"Zadej své jméno", 
                    "ua": "Введіть ім'я!",
                    "de": "Geben Sie Ihren Namen ein",
                    "pl": "Wpisz swoje imię i nazwisko",
                    "en": "Type your name!"},
     "upozornenimistnost": 
                    {"cz":"Tato místnost neexistuje!", 
                    "ua": "Цієї кімнати не існує!",
                    "de": "Diesen Raum gibt es nicht!",
                    "pl": "Ten pokój nie istnieje!",
                    "en": "This room does not exist!"},
     "btnSubmit": 
                    {"cz":"Připojit se", 
                    "ua": "Приєднуйтесь",
                    "de": "Beitreten",
                    "pl": "Dołącz do",
                    "en": "Join room"},
     "zalozitmistnost":
                    {"cz":"Založit místnost", 
                    "ua": "Розпочніть кімнату",
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
                    {"cz":"Jméno", 
                    "ua": "Ім'я",
                    "de": "Name",
                    "pl": "Nazwa",
                    "en": "Name"};
    let phmistnost =
                    {"cz":"Kód místnosti", 
                    "ua": "Код номеру",
                    "de": "Raum-Code",
                    "pl": "Kod pomieszczenia",
                    "en": "Room code"};
    document.getElementById('nameinput').placeholder = phjmeno[jazyk];
    document.getElementById('roominput').placeholder = phmistnost[jazyk];
}