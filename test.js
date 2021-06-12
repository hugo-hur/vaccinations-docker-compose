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

function ordersQuery(){
  var q  = `query usageQuery {
    orders {
      nodes {
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
    .then(data => console.log('data returned:', data));

}




function printData(data){
  data = data.data;
  //console.log(data)
  console.log("Vaccinations count: " + data.vaccinations.totalCount)
  console.log("Orders count: " + data.orders.totalCount)

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