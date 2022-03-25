var indexData = {
    "upozornenijmeno": ["Takové jméno už je v místnosti", "Така назва вже є в кімнаті"],
    "upozornenijmeno2": ["Zadej své jméno!", "Введіть ім'я!"],
    "upozornenimistnost": ["Tato místnost neexistuje!", "Цієї кімнати не існує!"],
    "btnSubmit": ["Připojit se", "Приєднуйтесь"],
    "zalozitmistnost": ["Založit místnost", "Розпочніть кімнату"]    
}

function IndexText(jazyk)
{
    Object.keys(indexData).forEach((key)=>{
        document.getElementById(key).innerText = indexData[key][jazyk]; 
    });
    let phjmeno = ["Jméno", "Ім'я"];
    let phmistnost = ["Kód místnosti", "Код номеру"]
    document.getElementById('nameinput').placeholder = phjmeno[jazyk];
    document.getElementById('roominput').placeholder = phmistnost[jazyk];
}