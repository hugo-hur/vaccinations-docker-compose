/*
For given day like 2021-04-12T11:10:06

How many orders and vaccines have arrived total?
How many of the vaccinations have been used?
How many bottles have expired on the given day (remember a bottle expires 30 days after arrival)

How many vaccines are left to use?
How many vaccines are going to expire in the next 10 days?
Perhaps there is some other data which could tell us some interesting things?
*/
/*
How many orders/vaccines per producer?

{
  orders(
    condition: {
      #Optional time limiters
      #arrivedEarlierThan: "2021-02-20 00:00:00+02:00" 
      #arrivedLaterThan: "2021-02-15 00:00:00+02:00"
      vaccine: "Antiqua"
    }
  )
	{
    totalCount
    nodes{
      
      injections
      healthCareDistrict
      arrived
    }
  }
}
*/

/*
#TODO: add filter to return only Zerpfy vaccines etc
{
  vaccinations(condition: {vaccinationsLaterThan: "2021-02-15 00:00:00+02:00"}) {
    totalCount
    nodes {
      orders {
        healthCareDistrict
        vaccine
      }
    }
  }
}

*/
async function vaccinesPerProducer(producer){
  var json = await vaccinesPerProducerQuery(producer, start=null, end=null);
  console.log(json.data.orders.totalCount);
  console.log(json.data.orders.nodes);
  var vaccines = 0;
  json.data.orders.nodes.forEach((node) => {
    vaccines += node.injections;
  });
  console.log(vaccines);
}
function vaccinesPerProducerQuery(producer, start=null, end=null){
  var queryex = `query MyQuery {
    orders(
      condition: {
        %end%
        %start%
        vaccine: "%producer%"
      }
    )
    {
      totalCount
      nodes{
        injections
      }
    }
  }`
  if(start != null){
    queryex = queryex.replace("%start%", "arrivedLaterThan: " + start);
  }
  else{
    queryex = queryex.replace("%start%", "");
  }
  if(end != null){
    queryex = queryex.replace("%end%", "arrivedEarlierThan: " + end);
  }
  else{
    queryex = queryex.replace("%end%", "");
  }

  queryex = queryex.replace("%producer%", producer);

  return queryServer(queryex);
}

function queryServer(queryex){//Send query to the graphql server, return promise
  return fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: queryex})
    })
    .then(r => r.json());
}

//How many vaccines expired before the usage -> remember to decrease used injections from the expired bottle
async function printExpired(startdate, numdays){
  var time1 = startdate;
  clearExpiryData();//Empty the expiry chart

  for(i = 0; i < numdays; i++){
    time2 = time1.addDays(1);
    
    var json = await queryExpired(time2.toISOString(), time1.toISOString());
    var data = json.data.orders.nodes;

    var solarbuddhica = 0;
    var zerpfy = 0;
    var antiqua = 0;
    data.forEach((order) => {
      var expired = order.injections - order.vaccinationsByOrdersId.totalCount;//If we have not used all injections, we have expired ones
      var arrdate = new Date(order.arrived);
      if(order.vaccine == "Antiqua"){
        antiqua += order.injections;
      }
      else if(order.vaccine == "SolarBuddhica"){
        solarbuddhica += order.injections;
      }
      else if(order.vaccine == "Zerpfy"){
        zerpfy += order.injections;
      }
      
    });
    //Add data to the expiry chart
    addExpiryData(time1, 1, antiqua);
    addExpiryData(time1, 2, solarbuddhica);
    addExpiryData(time1, 3, zerpfy);
    addExpiryData(time1, 0, antiqua + solarbuddhica + zerpfy);
    
    time1 = time2;
  }
  updateExpiryChart();

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
      #totalCount
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

  return queryServer(queryex);
}

async function printArrivals(startdate, numdays){
  var time1 = startdate;
  clearArrivalData();//Clear the arrival chart

  for(i = 0; i < numdays; i++){
    time2 = time1.addDays(1);
    
    var json = await queryArrivals(time1.toISOString(), time2.toISOString());
    var data = json.data.orders.nodes;
    var injections = 0;
    var solarbuddhica = 0;
    var zerpfy = 0;
    var antiqua = 0;
    data.forEach((order) => {
      var arrdate = new Date(order.arrived);
      if(order.vaccine == "Antiqua"){
        antiqua += order.injections;
      }
      else if(order.vaccine == "SolarBuddhica"){
        solarbuddhica += order.injections;
      }
      else if(order.vaccine == "Zerpfy"){
        zerpfy += order.injections;
      }
      
    });
    //Add arrival datas to arrival graph
    addArrivalData(time1, 1, antiqua);
    addArrivalData(time1, 2, solarbuddhica);
    addArrivalData(time1, 3, zerpfy);
    addArrivalData(time1, 0, antiqua + solarbuddhica + zerpfy);
    
    time1 = time2;
  }
  updateArrivalChart();
}
function queryArrivals(start, end){
  var queryex = `query MyQuery {
    orders(
      condition: {
        arrivedEarlierThan: "%end%" 
        arrivedLaterThan: "%start%"
      }
    )
    {
      totalCount
      nodes{
        vaccine
        injections
        healthCareDistrict
        arrived
      }
    }
  }`
  queryex = queryex.replace("%start%", start);
  queryex = queryex.replace("%end%", end);

  return queryServer(queryex);//Return promise
}

//Example query, returns number of vaccination events
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
