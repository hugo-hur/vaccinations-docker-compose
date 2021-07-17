
// === include 'setup' then 'config' ===
const labels = [
    /*'January',
    'February',
    'March',
    'April',
    'May',
    'June',*/
  ];
const data = {
    labels: [],
    datasets: [{
        label: 'Expiry dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],//[0, 10, 5, 2, 20, 30, 45],

    }]
};

const config = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
          label: 'Expiry dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [],//[0, 10, 5, 2, 20, 30, 45],
  
      }]
    },
    options: {}
  };

var expiryChart = null;
var arrivedChart = null;
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
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
window.onload = function () {
  //expiryChart = new Chart(document.getElementById('expiryChart'), config);
  expiryChart = new Chart(document.getElementById('expiryChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
          label: 'Expired vaccines',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [],//[0, 10, 5, 2, 20, 30, 45],
  
      }]
    },
    options: {}
  });
  arrivedChart = new Chart(document.getElementById('arrivedChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
          label: 'Vaccinations arrived',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [],//[0, 10, 5, 2, 20, 30, 45],
  
      }]
    },
    options: {}
  });
  printAll();
  
}


function addExpiryData(month, data) {
  label = month;
  expiryChart.data.labels.push(label);
  expiryChart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  expiryChart.update();
}
function clearExpiryData(){
  expiryChart.data.datasets[0].data = [];
  expiryChart.data.labels = [];
}

function addArrivalData(month, data) {
  label = month;
  arrivedChart.data.labels.push(label);
  arrivedChart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  arrivedChart.update();
}
function clearArrivalData(){
  arrivedChart.data.datasets[0].data = [];
  arrivedChart.data.labels = [];
}


