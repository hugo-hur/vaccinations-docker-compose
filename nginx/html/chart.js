
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

async function printAll(){
  await printExpired();
  await printArrivals();
}
window.onload = function () {
  expiryChart = new Chart(document.getElementById('expiryChart'), config);
  arrivedChart = new Chart(document.getElementById('arrivedChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
          label: 'Arrival dataset',
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
function addArrivalData(month, data) {
  label = month;
  arrivedChart.data.labels.push(label);
  arrivedChart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  arrivedChart.update();
}