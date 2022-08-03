
//česky, ukrajinsky, německy, polsky, anglicky

var zakData = {
    "nadpis": 
        {"cz" :"Upozornit učitele", 
        "ua":"Попередьте вчителя",
        "de": "Benachrichtigen Sie den Lehrer",
        "pl": "Powiadom nauczyciela",
        "en": "Notify the teacher"},

    "sendbtn": 
        {"cz": "Odeslat", 
        "ua": "Надіслати",
        "de": "Senden",
        "pl": "Wysłać",
        "en": "Send"},

    "Tlacitko1": 
        {"cz": "Nestíhám zápis", 
        "ua": "Я не можу зловити рекорд",
        "de": "Ich kann mich nicht registrieren",
        "pl": "nie mogę się zarejestrować",
        "en": "I can't take notes"},

    "Tlacitko2": 
        {"cz": "Nerozumím učivu", 
        "ua": "Я не розумію навчальної програми",
        "de": "Ich verstehe die Lektion nicht",
        "pl": "nie rozumiem lekcji",
        "en": "I don't understand the lesson"},

    "Tlacitko3": 
        {"cz": "Potřebuji pomoc", 
        "ua": "мені потрібна допомога",
        "de": "Ich brauche Hilfe",
        "pl": "potrzebuję pomocy",
        "en": "I need help"},

    "hsplneni": 
        {"cz": "Potvrď splnění úkolu", 
        "ua": "Підтвердіть завдання",
        "de": "Bestätigen Sie den Abschluss der Aufgabe",
        "pl": "Potwierdź wykonanie zadania",
        "en": "Confirm the completion of the task"},

    "btnsplneno": 
        {"cz": "Splněno", 
        "ua": "Готово",
        "de": "Fertig",
        "pl": "Gotowe",
        "en": "Finished"},

    "btnnesplneno": 
        {"cz": "Nesplněno", 
        "ua": "не зустрічався",
        "de": "Nnerfüllt",
        "pl": "Niespełniony",
        "en": "Not finished"},

    "hodpoved": 
        {"cz": "Napiš odpověď", 
        "ua": "Запишіть відповідь",
        "de": "Schreibe die Antwort",
        "pl": "Napisz odpowiedź",
        "en": "Write the answer"},

    "sendbtn2": 
        {"cz": "Odeslat", 
        "ua": "Надіслати",
        "de": "Senden",
        "pl": "Wysłać",
        "en": "Send"},

    "hUpozorneni": 
        {"cz": "Upozornění od učitele", 
        "ua": "Повідомлення вчителя",
        "de": "Hinweis vom Lehrer",
        "pl": "Zawiadomienie od nauczyciela",
        "en": "Notice from the teacher"},

    // "sendbtn": ["Odeslat", "Надіслати"],
    // "Tlacitko1": ["Nestíhám zápis", "Я не можу зловити рекорд"],
    // "Tlacitko2": ["Nerozumím učivu", "Я не розумію навчальної програми"],
    // "Tlacitko3": ["Potřebuji pomoc", "мені потрібна допомога"],
    // "hsplneni": ["Potvrď splnění úkolu", "Підтвердіть завдання"],
    // "btnsplneno": ["Splněno", "Готово"],
    // "btnnesplneno": ["Nesplněno", "не зустрічався"],
    // "hodpoved": ["Napiš odpověď", "Запишіть відповідь"],
    // "sendbtn2": ["Odeslat", "Надіслати"],
    // "hUpozorneni": ["Upozornění od učitele", "Повідомлення вчителя"]
}

function ZakText(jazyk)
{
    Object.keys(zakData).forEach((key)=>{
        document.getElementById(key).innerText = zakData[key][jazyk]; 
    });
    let ph = 
                    {"cz":"Vlastní zpráva", 
                    "ua": "Спеціальне повідомлення",
                    "de": "Benutzerdefinierte Nachricht",
                    "pl": "Niestandardowy komunikat",
                    "en": "Custom message"};
    document.getElementById('msg').placeholder = ph[jazyk];
}

