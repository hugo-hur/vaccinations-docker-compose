

var expiryChart = null;
var arrivedChart = null;
var perProducer = null;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
Date.prototype.addHours = function(hours) {
  var date = new Date(this.valueOf());
  date.setHours(date.getHours() + hours);
  return date;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function printAll(){
  var date1 = new Date('2020-10-01T00:00:00+02:00');

  while(true){
    printExpired(date1, 50);
    printArrivals(date1, 50);
    date1 = date1.addDays(50);
    await sleep(5000);
  }

}
async function updateStartdate(){
  var year = parseInt(document.getElementById("startyear").value);
  var month = parseInt(document.getElementById("startmonth").value);
  var day = parseInt(document.getElementById("startday").value);

  console.log(day);
  console.log(month);
  console.log(year);
  
  
  var d = new Date(year, month-1, day, 0, 0, 0, 0);
  
  console.log(d);
  //d = new Date(e.target.value);
  //d.setHours(d.getHours() - 2);
  await printExpired(d, 50);
  await printArrivals(d, 50);
  //console.log(new Date(e.target.value).toLocaleString('default', { timeZone: 'Europe/Helsinki' }))
}

function createLineChart(elementId, datasets, options = {}){
  
  return new Chart(document.getElementById(elementId), {
    type: 'line',
    data: {
      labels: [],
      datasets: datasets
    },
    options: options
  });
}

window.onload = function () {
  //document.getElementById("startdate").addEventListener('input', updateValue);
  //expiryChart = new Chart(document.getElementById('expiryChart'), config);
  expiryChart = createLineChart("expiryChart",[{
      label: 'Vaccinations expired',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],//[0, 10, 5, 2, 20, 30, 45],
      fill: false

    },
    {
      label: 'Vaccinations Antiqua expired',
      backgroundColor: 'black',
      borderColor: 'black',
      data: [],
      fill: false

    },
    {
      label: 'Vaccinations Solar Buddhica expired',
      backgroundColor: 'green',
      borderColor: 'green',
      data: [],
      fill: false

    },
    {
      label: 'Vaccinations Zerpfy expired',
      backgroundColor: 'brown',
      borderColor: 'brown',
      data: [],
      fill: false

    }],
    options = {
      scales: {
        xAxes: [{
          type: 'time',
        }]
      }
    }
  );
  arrivedChart = createLineChart("arrivedChart", [{
      label: 'Vaccinations arrived',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],//[0, 10, 5, 2, 20, 30, 45],
      fill: false

    },
    {
      label: 'Vaccinations Antiqua arrived',
      backgroundColor: 'black',
      borderColor: 'black',
      data: [],
      fill: false

    },
    {
      label: 'Vaccinations Solar Buddhica arrived',
      backgroundColor: 'green',
      borderColor: 'green',
      data: [],
      fill: false

    },
    {
      label: 'Vaccinations Zerpfy arrived',
      backgroundColor: 'brown',
      borderColor: 'brown',
      data: [],
      fill: false

    }],
    options = {
      scales: {
        xAxes: [{
          type: 'time',
        }]
      }
    }
  );
  perProducer = createLineChart("vaccinationsPerProducer",[{
    label: 'Vaccinations used',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],//[0, 10, 5, 2, 20, 30, 45],
    fill: false

    },
    {
      label: 'Vaccinations Antiqua',
      backgroundColor: 'black',
      borderColor: 'black',
      data: [],
      fill: false

    },
    {
      label: 'Vaccinations Solar Buddhica',
      backgroundColor: 'green',
      borderColor: 'green',
      data: [],
      fill: false

    },
    {
      label: 'Vaccinations Zerpfy',
      backgroundColor: 'brown',
      borderColor: 'brown',
      data: [],
      fill: false

    }
  ],
  options = {
      scales: {
        xAxes: [{
          type: 'time',
        }]
      }
  }
  );
  
}

function addExpiryData(date, index, amount) {
  expiryChart.data.datasets[index].data.push({t:date,y:amount});
}
function updateExpiryChart(){
  expiryChart.update();
}
function clearExpiryData(){
  //expiryChart.data.datasets[0].data = [];
  expiryChart.data.datasets[0].data = [];
  expiryChart.data.datasets[1].data = [];
  expiryChart.data.datasets[2].data = [];
  expiryChart.data.datasets[3].data = [];
  
}

function addArrivalData(/*label,*/ date, index, amount) {
  
  arrivedChart.data.datasets[index].data.push({t:date,y:amount});
  
}
function updateArrivalChart(){
  arrivedChart.update();
}

function clearArrivalData(){
  arrivedChart.data.datasets[0].data = [];
  arrivedChart.data.datasets[1].data = [];
  arrivedChart.data.datasets[2].data = [];
  arrivedChart.data.datasets[3].data = [];
  
}


function addVaccinationsUsedData(date, index, amount){
  perProducer.data.datasets[index].data.push({t:date,y:amount});
}