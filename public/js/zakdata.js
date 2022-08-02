
//česky, ukrajinsky, německy, polsky, anglicky

var zakData = {
    "nadpis": 
        {"cz" :"Upozornit učitele", 
        "ua":"Попередьте вчителя",
        "de": "nemecky",
        "pl": "polsky",
        "en": "ingliš"}
    // "sendbtn": ["Odeslat", "Надіслати"],
    // "Tlacitko1": ["Nestíhám zápis", "Я не можу зловити рекорд"],
    // "Tlacitko2": ["Nerozumím učivu", "Я не розумію навчальної програми"],
    // "Tlacitko3": ["Potřebuji pomoc", "мені потрібна допомога"],
    // "hsplneni": ["Potvrď splnění úkolu", "Підтвердіть завдання"],
    // "btnsplneno": ["Splněno", "Готово"],
    // "btnnesplneno": ["Nesplněno", "не зустрічався"],
    // //"hodpoved": ["Napiš odpověď", "Запишіть відповідь"],
    // "sendbtn2": ["Odeslat", "Надіслати"],
    // "hUpozorneni": ["Upozornění od učitele", "Повідомлення вчителя"]
}

function ZakText(jazyk)
{
    Object.keys(zakData).forEach((key)=>{
        document.getElementById(key).innerText = zakData[key][jazyk]; 
    });
    let ph = ["Vlastní zpráva", "Спеціальне повідомлення"];
    document.getElementById('msg').placeholder = ph[jazyk];
}

