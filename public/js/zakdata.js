var zakData = {
    "nadpis": ["Upozornit učitele", "Попередьте вчителя"],
    "sendbtn": ["Odeslat", "Надіслати"],
    "Tlacitko1": ["Nestíhám zápis", "Я не можу зловити рекорд"],
    "Tlacitko2": ["Nerozumím učivu", "Я не розумію навчальної програми"],
    "Tlacitko3": ["Zvládám bez problému", "Справляюся без проблем"],
    "hsplneni": ["Potvrď splnění úkolu", "Підтвердіть завдання"],
    "btnsplneno": ["Splněno", "Готово"],
    "btnnesplneno": ["Nesplněno", "не зустрічався"],
    "hodpoved": ["Napiš odpověď", "Запишіть відповідь"],
    "sendbtn2": ["Odeslat", "Надіслати"]
}

ZakText(0);

function ZakText(jazyk)
{
    Object.keys(zakData).forEach((key)=>{
        console.log(document.getElementById(key).innerText)
        document.getElementById(key).innerText = zakData[key][jazyk]; 
    });
    let ph = ["Vlastní zpráva", "Спеціальне повідомлення"];
    document.getElementById('msg').placeholder = ph[jazyk];
}
