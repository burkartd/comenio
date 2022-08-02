
//česky, ukrajinsky, německy, polsky, anglicky

var indexData = {
    "upozornenijmeno": 
                    {"cz":"Takové jméno už je v místnosti", 
                    "ua": "Така назва вже є в кімнаті",
                    "de": "německy",
                    "pl": "polsky",
                    "en": "The name is already in the room!"},
     "upozornenijmeno2":
                    {"cz":"Zadej své jméno", 
                    "ua": "Введіть ім'я!",
                    "de": "německy",
                    "pl": "polsky",
                    "en": "Type your name!"},
     "upozornenimistnost": 
                    {"cz":"Tato místnost neexistuje!", 
                    "ua": "Цієї кімнати не існує!",
                    "de": "německy",
                    "pl": "polsky",
                    "en": "This room does not exist!"},
     "btnSubmit": 
                    {"cz":"Připojit se", 
                    "ua": "Приєднуйтесь",
                    "de": "německy",
                    "pl": "polsky",
                    "en": "Join room"},
     "zalozitmistnost":
                    {"cz":"Založit místnost", 
                    "ua": "Розпочніть кімнату",
                    "de": "německy",
                    "pl": "polsky",
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
                    "de": "německy",
                    "pl": "polsky",
                    "en": "Name"};
    let phmistnost =
                    {"cz":"Kód místnosti", 
                    "ua": "Код номеру",
                    "de": "německy",
                    "pl": "polsky",
                    "en": "Room code"};
    document.getElementById('nameinput').placeholder = phjmeno[jazyk];
    document.getElementById('roominput').placeholder = phmistnost[jazyk];
}