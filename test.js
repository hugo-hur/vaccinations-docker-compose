/*vaccinations {
    nodes {
      gender
      id
      vaccinationDate
      orders {
        injections
        arrived
        expires
      }
    }
  }
*/
function isFutureDate(value) {
  d_now = new Date();
  d_inp = new Date(value)
  return d_now.getTime() <= d_inp.getTime();
}

function left(data){
  data = data.data;
  header = document.getElementById("total-left");
  console.log(data.orders.nodes);
  var used = 0;
  var arrived = 0;
  var exp = 0;
  var unused_not_exp = 0;
  var unused_exp = 0;
  /*for(order in data.orders.nodes){
    used  += order.injections;
    arrived += order.vaccinationsByOrdersId.totalCount;
  }*/
  data.orders.nodes.forEach(function(order){
    var injections = order.injections;
    var used_from = order.vaccinationsByOrdersId.totalCount
    if(injections === used_from){

      console.log("Order "  + order.id + " is completely used");
    }
    else if(!isFutureDate(order.expires)){
      console.log("Order "  + order.id + " is expired");
      unused_exp += (injections - used_from);
    }
    else{
      unused_not_exp += (injections - used_from);
    }
    arrived  += injections;
    used += used_from;
  })

  header.innerHTML = "Käytetyt: " + used + " Saapuneet: " + arrived + " Voimassaolevat käyttämättömät: " + unused_not_exp + " Käyttämättömät vanhentuneet: " + unused_exp;
}
function vaccinationsLeftQuery(){
  var q  = `query usageQuery {
    orders {
      nodes {
        id
        expires
        healthCareDistrict
        injections
        vaccinationsByOrdersId {
          totalCount
        }
        vaccine
      }
    }
  }` 
  fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: q})
    })
    .then(r => r.json())
    .then(data => left(data));

}




function printData(data){
  data = data.data;
  //console.log(data)
  //console.log("Vaccinations count: " + data.vaccinations.totalCount)
  //console.log("Orders count: " + data.orders.totalCount)
  document.getElementById("total-orders").innerHTML = "Orders count: " + data.orders.totalCount;
  document.getElementById("total-vaccinations").innerHTML = "Vaccinations count: " + data.vaccinations.totalCount;

}
function querySum(){
  fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: sumquery})
    })
    .then(r => r.json())
    .then(data => printData(data));
   // .then(data => console.log(data.vaccinations));


}


 var q2  = `query MyQuery {
    vaccinations {
      nodes {
        gender
        id
        vaccinationDate
        orders {
          injections
          arrived
          expires
          vaccine
        }
      }
    }
  }` 

var sumquery = `query SumQuery {

  vaccinations {
    totalCount
    #nodes {
      
    #  gender
    #  id
    #  vaccinationDate
    #}
  }
  orders{
    totalCount
  }
}`

//query(q2);
//query(sumquery);
querySum();
vaccinationsLeftQuery();