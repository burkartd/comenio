//česky, ukrajinsky, německy, polsky, anglicky

//textový pole
var ucitelDataText = {
    "prihlas":{"cz":"Přihlaš se na počítači"},
    "pocetText":{"cz":"Žáků v místnosti:"},
    "konecText":{"cz":"Ukončit místnost"},
    "prehled":{"cz":"Přehled žáků"},
    "upozorneni":{"cz":"Upozornění"},
    "odstranitvseText":{"cz":"Odstranit vše"},
    "zacitanketu":{"cz":"Potvrzení splnění"},
    "zacitodpovedi":{"cz":"Otázka žákům"},
    "btnNazevOtazky":{"cz":"Odeslat"},
    "zrusitOtazku":{"cz":"Zrušit"},
    "ukoncitanketu":{"cz":"Ukončit"},
    "feedback":{"cz":"Zašlete nám zpětnou vazbu, ať můžeme aplikaci vylepšit"},
    "zakoviPoslat":{"cz":"Odeslat"},
    "prednastavena1":{"cz":"Buď aktivnější"},
    "prednastavena2":{"cz":"Dej prostor ostatním"},





}

//titly - najetí kursorem
var ucitelDataTitle = {
    "roomNumberTitle":{"cz":"Číslo místnosti - Díky tomuto číslu se žák připojí do místnosti."},
  /*výběr jazyka*/  "vyberJazyka":{"cz":"Výběr jazyka"}, //výběr jazyka
    "pocetTitle":{"cz":"Počet připojených žáků"},
    "konecTitle":{"cz":"Ukončit místnost - Tímto tlačítkem ukončíte místnost i pro všechny připojené žáky."},
    "prehled":{"cz":"Ukončit místnost - Tímto tlačítkem ukončíte místnost i pro všechny připojené žáky."},
    "upozorneni":{"cz":"Upozornění od žáků rozlišené ikonami na přednastavená, vlastní zprávy a odpovědi na otázky"},
    "zpravyuk":{"cz":"Zobrazovat zprávy taky v ukrajinštině"},
    "odstranitvse":{"cz":"Vymaže všechna upozornění od žáků"},
    "divbtnanketa":{"cz":"Nechte si od žáků potvrdit splnění zadaného úkolu"},
    "divbtnodpovedi":{"cz":"Pošlete žákům otázku, na kterou od nich dostanete odpověď"},
    "inazev":{"cz":"Napište svoji otázku, nebo pole nevyplňujte vůbec"}

}

//placeholdery
var ucitelDataPlaceholder = {
    "inazev":{"cz":"Napište otázku"},
    "msg3":{"cz":"Zpráva pro žáka"}
}

//věci v grafu
var ucitelDataChart = {
    "typ1":{"cz":"Hotových žáků"},
    "typ2":{"cz":"Odpovědí"}
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