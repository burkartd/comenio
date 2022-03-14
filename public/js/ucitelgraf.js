const zacit = document.getElementById('zacitanketu');
const ukoncit = document.getElementById('ukoncitanketu');
const ankety = document.getElementById('anketydiv'); //div kde je graf a ankety
const jeAnketa = document.getElementById('anketaje');
const neniAnketa = document.getElementById('anketaneni');
const nadpis = document.getElementById('grafnadpis');

var data = {
    //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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

jeAnketa.style.visibility = 'hidden';
neniAnketa.style.visibility = 'visible';

ukoncit.addEventListener('click', () => { //ukončit anketu
 
    
    jeAnketa.style.visibility = 'hidden';
    neniAnketa.style.visibility = 'visible';
    myChart.destroy();
    ukoncitAnketu();

});

zacit.addEventListener('click', () => { //začít anketu
 
    neniAnketa.style.visibility = 'hidden';
    jeAnketa.style.visibility = 'visible';
    ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
    //updateGraf(0, pocetZaku);
    nadpis.innerHTML = `Hotových žáků: 0/${pocetZaku}`;
    zacitAnketu();
}); 

function updateGraf(splneno, celkem)
{
    myChart.data.datasets[0].data[0] = splneno;
    myChart.data.datasets[0].data[1] = celkem - splneno;
    myChart.update();
    nadpis.innerHTML = `Hotových žáků: ${splneno}/${celkem}`;
}




