const btnZacitAnketu = document.getElementById('zacitanketu');
const ukoncit = document.getElementById('ukoncitanketu');

const btnZacitOdpovedi = document.getElementById('zacitodpovedi');

const ankety = document.getElementById('anketydiv'); //div kde je graf a ankety
// const jeAnketa = document.getElementById('anketaje');
// const neniAnketa = document.getElementById('anketaneni');
const nadpis = document.getElementById('grafnadpis');

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

    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
    //updateGraf(0, pocetZaku);
    nadpis.innerHTML = `Hotových žáků: 0/${pocetZaku}`;
    zacitAnketu();
}); 

btnZacitOdpovedi.addEventListener('click', () => { //začít odpovědi
 
    ZobrazitGraf();

    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
    //updateGraf(0, pocetZaku);
    nadpis.innerHTML = `Odpovědí: 0/${pocetZaku}`;
    zacitOdpovedi();
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
    if(typ === 1) nadpis.innerHTML = `Hotových žáků: ${splnenozaku}/${celkem}`;
    if(typ === 2) nadpis.innerHTML = `Odpovědí: ${splnenozaku}/${celkem}`;
}

function SkrytGraf()
{
    var arr = Array.from(ankety.children);
    // for(var i = 0; i < arr.length - 1; i++)
    // {
    //     arr[i].classList.remove('skryto');
    // }

    console.log(arr);
    arr.forEach(el => {
        el.classList.remove('skryto');
        //console.log(el.classList);
    });

    arr[arr.length - 1].classList.add('skryto');
}

function ZobrazitGraf()
{
    let arr = Array.from(ankety.children);
    // for(var i = 0; i < arr.length - 1; i++)
    // {
    //     arr[i].classList.add('skryto');
    // }

    arr.forEach(el => {
        el.classList.add('skryto');
    });

    arr[arr.length - 1].classList.remove('skryto');
}



