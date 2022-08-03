//česky, ukrajinsky, německy, polsky, anglicky

//textový pole
var ucitelDataText = {
    "prihlas": 
        {"cz": "Přihlaš se na počítači", 
        "uk": "Увійдіть на комп'ютері",
        "de": "Melden Sie sich an Ihrem Computer an",
        "pl": "Zaloguj się na swoim komputerze",
        "en": "Log in on your computer"},

    "pocetText": 
        {"cz": "Žáků v místnosti:", 
        "uk": "Учні в кімнаті:",
        "de": "Schüler im Raum:",
        "pl": "Uczniowie w pokoju:",
        "en": "Pupils in the room:"},

    "konecText": 
        {"cz": "Ukončit místnost", 
        "uk": "Вийти з кімнати",
        "de": "Verlasse den Raum",
        "pl": "Wyjdź z pokoju",
        "en": "Exit the room"},

    "prehled": 
        {"cz": "Přehled žáků", 
        "uk": "Огляд учнів",
        "de": "Schülerübersicht",
        "pl": "Przegląd uczniów",
        "en": "Overview of pupils"},

    "odstranitvseText": 
        {"cz": "Odstranit vše", 
        "uk": "Видалити все",
        "de": "Alles löschen",
        "pl": "Usuń wszystko",
        "en": "Delete all"},

    "zacitanketu": 
        {"cz": "Potvrzení splnění", 
        "uk": "Підтвердження виконання",
        "de": "Bestätigung der Erfüllung",
        "pl": "Potwierdzenie spełnienia",
        "en": "Confirmation of fulfillment"},

    "zacitodpovedi": 
        {"cz": "Otázka žákům", 
        "uk": "Питання до студентів",
        "de": "Frage an die Schüler",
        "pl": "Pytanie do uczniów",
        "en": "Question to the students"},

    "btnNazevOtazky": 
        {"cz": "Odeslat", 
        "uk": "Надіслати",
        "de": "Senden",
        "pl": "Wysłać",
        "en": "Send"},

    "zrusitOtazku": 
        {"cz": "Zrušit", 
        "uk": "Скасувати",
        "de": "Absagen",
        "pl": "Anulować",
        "en": "Cancel"},

    "ukoncitanketu": 
        {"cz": "Ukončit", 
        "uk": "Кінець",
        "de": "Ende",
        "pl": "Koniec",
        "en": "End"},

    "feedback": 
        {"cz": "Zašlete nám zpětnou vazbu, ať můžeme aplikaci vylepšit", 
        "uk": "Надішліть нам відгук, щоб ми могли покращити додаток",
        "de": "Senden Sie uns Feedback, damit wir die App verbessern können",
        "pl": "Prześlij nam swoją opinię, abyśmy mogli ulepszyć aplikację",
        "en": "Send us feedback so we can improve the app"},

    "zakoviPoslat": 
        {"cz": "Odeslat", 
        "uk": "Надіслати",
        "de": "Senden",
        "pl": "Wysłać",
        "en": "Send"},

    "prednastavena1": 
        {"cz": "Buď aktivnější", 
        "uk": "Будьте активнішими",
        "de": "Seien Sie aktiver",
        "pl": "Bądź bardziej aktywny",
        "en": "Be more active"},

    "prednastavena2": 
        {"cz": "Dej prostor ostatním", 
        "uk": "Дайте простір іншим",
        "de": "Geben Sie anderen Raum",
        "pl": "Daj przestrzeń innym",
        "en": "Give space to others"},


    //"prihlas":{"cz":"Přihlaš se na počítači"},
    //"pocetText":{"cz":"Žáků v místnosti:"},
    //"konecText":{"cz":"Ukončit místnost"},
    //"prehled":{"cz":"Přehled žáků"},
    //"upozorneni":{"cz":"Upozornění"},
    //"odstranitvseText":{"cz":"Odstranit vše"},
    //"zacitanketu":{"cz":"Potvrzení splnění"},
    //"zacitodpovedi":{"cz":"Otázka žákům"},
    //"btnNazevOtazky":{"cz":"Odeslat"},
    //"zrusitOtazku":{"cz":"Zrušit"},
    //"ukoncitanketu":{"cz":"Ukončit"},
    //"feedback":{"cz":"Zašlete nám zpětnou vazbu, ať můžeme aplikaci vylepšit"},
    //"zakoviPoslat":{"cz":"Odeslat"},
    //"prednastavena1":{"cz":"Buď aktivnější"},
    //"prednastavena2":{"cz":"Dej prostor ostatním"},





}

//titly - najetí kursorem
var ucitelDataTitle = {

    "roomNumberTitle": 
        {"cz": "Číslo místnosti - Díky tomuto číslu se žák připojí do místnosti.", 
        "uk": "Номер кімнати - Завдяки цьому номеру студент приєднується до кімнати.",
        "de": "Raumnummer - Dank dieser Nummer tritt der Schüler dem Raum bei.",
        "pl": "Numer pokoju - Dzięki temu numerowi student dołącza do pokoju.",
        "en": "Room number - Thanks to this number, the student joins the room."},

    "vyberJazyka": 
        {"cz": "Výběr jazyka", 
        "uk": "Вибір мови",
        "de": "Sprachauswahl",
        "pl": "Wybór języka",
        "en": "Language selection"},

    "pocetTitle": 
        {"cz": "Počet připojených žáků", 
        "uk": "Кількість підключених учнів",
        "de": "Anzahl der verbundenen Schüler",
        "pl": "Liczba podłączonych uczniów",
        "en": "Number of connected pupils"},

    "konecTitle": 
        {"cz": "Ukončit místnost - Tímto tlačítkem ukončíte místnost i pro všechny připojené žáky.", 
        "uk": "Завершити кімнату - використовуйте цю кнопку, щоб завершити кімнату для всіх підключених студентів.",
        "de": "Raum beenden – Verwenden Sie diese Schaltfläche, um den Raum für alle verbundenen Schüler zu beenden.",
        "pl": "Zakończ pokój — użyj tego przycisku, aby zakończyć pokój dla wszystkich podłączonych uczniów.",
        "en": "End room - Use this button to end the room for all connected students."},

    "prehled": 
        {"cz": "Ukončit místnost - Tímto tlačítkem ukončíte místnost i pro všechny připojené žáky.", 
        "uk": "Завершити кімнату - використовуйте цю кнопку, щоб завершити кімнату для всіх підключених студентів.",
        "de": "Raum beenden – Verwenden Sie diese Schaltfläche, um den Raum für alle verbundenen Schüler zu beenden.",
        "pl": "Zakończ pokój — użyj tego przycisku, aby zakończyć pokój dla wszystkich podłączonych uczniów.",
        "en": "End room - Use this button to end the room for all connected students."},

    "upozorneni": 
        {"cz": "Upozornění od žáků rozlišené ikonami na přednastavená, vlastní zprávy a odpovědi na otázky", 
        "uk": "Сповіщення від учнів, виділені піктограмами для попередньо встановлених, спеціальних повідомлень і відповідей на запитання",
        "de": "Benachrichtigungen von Schülern, gekennzeichnet durch Symbole für voreingestellte, benutzerdefinierte Nachrichten und Antworten auf Fragen",
        "pl": "Powiadomienia od uczniów wyróżnione ikonami wstępnie ustawionych, niestandardowych wiadomości i odpowiedzi na pytania",
        "en": "Notifications from students distinguished by icons for preset, custom messages and answers to questions"},

    "zpravyuk": 
        {"cz": "Zobrazovat zprávy v původním jazyce", 
        "uk": "Відображати повідомлення мовою оригіналу",
        "de": "Meldungen in Originalsprache anzeigen",
        "pl": "Wyświetlaj wiadomości w oryginalnym języku",
        "en": "Display messages in the original language"},

    "odstranitvse": 
        {"cz": "Vymaže všechna upozornění od žáků", 
        "uk": "Очищає всі сповіщення від студентів",
        "de": "Löscht alle Benachrichtigungen von Schülern",
        "pl": "Usuwa wszystkie powiadomienia od uczniów",
        "en": "Clears all notifications from students"},

    "divbtnanketa": 
        {"cz": "Nechte si od žáků potvrdit splnění zadaného úkolu", 
        "uk": "Нехай учні підтвердять, що вони виконали поставлене завдання",
        "de": "Lassen Sie die Schülerinnen und Schüler bestätigen, dass sie die gestellte Aufgabe erledigt haben",
        "pl": "Poproś uczniów, aby potwierdzili, że wykonali przydzielone zadanie",
        "en": "Have the pupils confirm that they have completed the assigned task"},

    "divbtnodpovedi": 
        {"cz": "Pošlete žákům otázku, na kterou od nich dostanete odpověď", 
        "uk": "Надішліть учням запитання, на яке ви отримаєте відповідь",
        "de": "Senden Sie den Studierenden eine Frage, auf die Sie eine Antwort erhalten",
        "pl": "Wyślij uczniom pytanie, na które otrzymasz odpowiedź",
        "en": "Send students a question to which you will receive an answer"},

    "inazev": 
        {"cz": "Napište svoji otázku, nebo pole nevyplňujte vůbec", 
        "uk": "Напишіть своє запитання або не заповнюйте поле взагалі",
        "de": "Schreiben Sie Ihre Frage oder füllen Sie das Feld gar nicht aus",
        "pl": "Napisz swoje pytanie lub w ogóle nie wypełniaj pola",
        "en": "Write your question or do not fill in the field at all"},

    //"roomNumberTitle":{"cz":"Číslo místnosti - Díky tomuto číslu se žák připojí do místnosti."},
  /*výběr jazyka*/  //"vyberJazyka":{"cz":"Výběr jazyka"}, //výběr jazyka
    //"pocetTitle":{"cz":"Počet připojených žáků"},
    //"konecTitle":{"cz":"Ukončit místnost - Tímto tlačítkem ukončíte místnost i pro všechny připojené žáky."},
    //"prehled":{"cz":"Ukončit místnost - Tímto tlačítkem ukončíte místnost i pro všechny připojené žáky."},
    //"upozorneni":{"cz":"Upozornění od žáků rozlišené ikonami na přednastavená, vlastní zprávy a odpovědi na otázky"},
    //"zpravyuk":{"cz":"Zobrazovat zprávy taky v ukrajinštině"},
    //"odstranitvse":{"cz":"Vymaže všechna upozornění od žáků"},
    //"divbtnanketa":{"cz":"Nechte si od žáků potvrdit splnění zadaného úkolu"},
    //"divbtnodpovedi":{"cz":"Pošlete žákům otázku, na kterou od nich dostanete odpověď"},
    //"inazev":{"cz":"Napište svoji otázku, nebo pole nevyplňujte vůbec"}

}

//placeholdery
var ucitelDataPlaceholder = {
    "inazev":
        {"cz": "Napište otázku", 
        "uk": "Напишіть запитання",
        "de": "Schreiben Sie eine Frage",
        "pl": "Napisz pytanie",
        "en": "Write a question"},

    "msg3":
    {"cz": "Zpráva pro žáka", 
        "uk": "Повідомлення для учня",
        "de": "Eine Botschaft für den Schüler",
        "pl": "Wiadomość dla ucznia",
        "en": "A message for the pupil"},
}

//věci v grafu
var ucitelDataChart = {
    "typ1":
        {"cz": "Hotových žáků", 
        "uk": "Закінчені студенти",
        "de": "Fertige Schüler",
        "pl": "Ukończeni studenci",
        "en": "Finished students"},
    "typ2":
        {"cz": "Odpovědí", 
        "uk": "Відповіді",
        "de": "Antworten",
        "pl": "Odpowiedzi",
        "en": "Answers"},
}

function UcitelPreklad(jazyk)
{
    Object.keys(ucitelDataText).forEach((key)=>{
        document.getElementById(key).innerText = ucitelDataText[key][jazyk]; 
    });
    
    Object.keys(ucitelDataTitle).forEach((key)=>{
        document.getElementById(key).title = ucitelDataTitle[key][jazyk]; 
    });

    Object.keys(ucitelDataPlaceholder).forEach((key)=>{
        document.getElementById(key).placeholder = ucitelDataPlaceholder[key][jazyk]; 
    });
}