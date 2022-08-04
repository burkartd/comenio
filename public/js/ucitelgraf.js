var data = {
    datasets: [{
        label: '# of Votes',
        data: [0, 1],
        backgroundColor: [
            '#3002EA',
            '#00AEC9'
        ],
        borderColor: [
            '#3002EA',
            '#00AEC9'
        ],
        borderWidth: 1
    }]
}

var options = {
    //animation: false,
    cutout: '80%',
    responsive: true,
    legend: {
      display: false
    }
  }


const config = {
    type: 'doughnut',
    data,
    options
  };

var ctx;
var myChart;

//jeAnketa.classList.add('skryto');
//neniAnketa.classList.add('viditelne');
SkrytGraf();//zobrazí tlačítka a ne graf

ukoncit.addEventListener('click', () => { //ukončit anketu

    SkrytGraf();

    myChart.destroy();
    ukoncitAnketu();

    myChart.data.datasets[0].data[0] = 0; //vyresetování dat grafu
    myChart.data.datasets[0].data[1] = 1;

});

btnZacitAnketu.addEventListener('click', () => { //začít anketu
 
    ZobrazitGraf();
    if(myChart) myChart.destroy();
    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
    //updateGraf(0, pocetZaku);
    // nadpis.innerHTML = `Hotových žáků: 0/${pocetZaku}`;
    nadpis.innerHTML = `${ucitelDataChart["typ1"][JazykUcitelGlob]}: 0/${pocetZaku}`
    zacitAnketu();
}); 

btnZacitOdpovedi.addEventListener('click', () => { //začít odpovědi
 
    if(myChart) myChart.destroy();

    let arr = Array.from(ankety.children);

    arr.forEach(el => {
        el.classList.add('skryto');
    });

    arr[arr.length - 2].classList.remove('skryto'); //název ankety

    document.getElementById('inazev').focus();

}); 

zrusitOtazku.addEventListener('click', () => {
    if(myChart) myChart.destroy();
    SkrytGraf();
})

//název ankety
inputNazevOtazky.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    let inazev = e.target.elements.inazev.value;
  
    inazev = inazev.trim();
  
    if (!inazev) {
      inazev = 'Napiš odpověď';
    }
  
    e.target.elements.inazev.value = '';
    
    nazevOtazky = inazev;
    ZobrazitGraf();

    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
    //updateGraf(0, pocetZaku);
    // nadpis.innerHTML = `Odpovědí: 0/${pocetZaku}`;
    nadpis.innerHTML = `${ucitelDataChart["typ2"][JazykUcitelGlob]}: 0/${pocetZaku}`
    
    zacitOdpovedi(nazevOtazky);
  });


function updateGraf(splnenozaku, celkem, typ)
{
    myChart.data.datasets[0].data[0] = splnenozaku;
    myChart.data.datasets[0].data[1] = celkem - splnenozaku;

    if(pocetZaku === 0)
    {
        myChart.data.datasets[0].data[0] = 0;
        myChart.data.datasets[0].data[1] = 1;  
    }

    myChart.update();
    // if(typ === 1) nadpis.innerHTML = `Hotových žáků: ${splnenozaku}/${celkem}`;
    
    if(typ === 1) nadpis.innerHTML = `${ucitelDataChart["typ1"][JazykUcitelGlob]}: ${splnenozaku}/${celkem}`;
    if(typ === 2) nadpis.innerHTML = `${ucitelDataChart["typ2"][JazykUcitelGlob]}: ${splnenozaku}/${celkem}`;
}

function SkrytGraf()
{
    var arr = Array.from(ankety.children);
    arr.forEach(el => {
        el.classList.remove('skryto');
    });

    arr[arr.length - 1].classList.add('skryto'); //graf
    arr[arr.length - 2].classList.add('skryto'); //název ankety
}

function ZobrazitGraf()
{
    let arr = Array.from(ankety.children);

    arr.forEach(el => {
        el.classList.add('skryto');
    });

    arr[arr.length - 1].classList.remove('skryto');
}



