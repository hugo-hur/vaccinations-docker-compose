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
      //console.log("Order "  + order.id + " is expired");
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

function addMonth(date){
  time2 = new Date(date.getTime());
  time2 = new Date(time2.setMonth(time2.getMonth()+1));
  return time2;
}

async function printExpired(data){
  var time1 = new Date('2021-01-01T00:00:00+02:00');//Jan
  var expiries = [];
  for(i = 0; i< 12; i++){
    time2 = addMonth(time1);
    console.log(time1.toISOString() + "  -  " + time2.toISOString())
    var json = await queryExpired(time1.toISOString(), time2.toISOString());
    console.log(json.data.orders.totalCount);
    expiries.push(json.data.orders.totalCount)
    time1 = time2;
    addExpiryData((i+1).toString(), json.data.orders.totalCount);
  }
  console.log(expiries);
  

}

function queryExpired(start, end){
  var queryex = `query MyQuery {
    orders(
      condition: {
        expiresEarlierThan: "%ts%" 
        expiresLaterThan: "%later%"
      }
    )
    {
      totalCount
      nodes{
        vaccine
        injections
        vaccinationsByOrdersId {
          totalCount
        }
      }
    }
  }`
  queryex = queryex.replace("%ts%", start);
  queryex = queryex.replace("%later%", end);
  //console.log(queryex);

  return fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: queryex})
    })
    .then(r => r.json())
    //.then(data => printExpired(data));
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
/*#arrivedEarlierThan: "2021-01-04 00:00:00+02:00"
      #arrivedLaterThan: "2021-01-03 00:00:00+02:00"
      #healthCareDistrict: "TAYS"*/

var q = `query MyQuery {
  orders(
    condition: {
      expiresEarlierThan: "2021-02-03 00:00:00+02:00" 
      
    }
  )
	{
    totalCount
    nodes{
      vaccine
      injections
      vaccinationsByOrdersId {
        totalCount
      }
    }
  }
}`
//query(q2);
//query(sumquery);

//querySum();
//vaccinationsLeftQuery();
printExpired();