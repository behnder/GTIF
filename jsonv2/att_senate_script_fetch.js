fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
    method: "GET", //obtener por get
    headers: new Headers({
        "X-API-Key": 'jeMK8VwUV6JMGPHccmEZFEDenNipWQ0rvtgBlTuF' //asignar el header con la key del mail
    }),
}).then(function (response) {
    if (response.ok)
        return response.json();
    throw new Error(response.statusText);
}).then(function (json) {

    mifuncion(json);

});

function mifuncion(data){

  var party_rep = 0;
  var party_dem = 0;
  var party_ind = 0;

  var party_R = "";
  var party_D = "";
  var party_I = "";

  var votes_with_pty_dem = 0;
  var votes_with_pty_ind = 0;
  var votes_with_pty_rep = 0;

  var tot = 0;


  var records = data.results[0].members;

  //////LEAST ENGAGED
  records = records.sort((a, b) => (a.missed_votes_pct > b.missed_votes_pct) ? 1 : -1);

  var cantRecords = records.length * 0.1;

  var least_engaged = '';

  for (var i = 0; i < cantRecords; i++) {

    least_engaged += `
      <tr>
        <td>` + records[i].first_name + `</td>
        <td>` + records[i].missed_votes + `</td>
        <td>` + records[i].missed_votes_pct + `</td>
      </tr>
    `;

  }
  document.getElementById("sen_least_engaged").innerHTML = least_engaged;
  //====================

  //MOST Engaged
  records = records.sort((a, b) => (a.missed_votes_pct < b.missed_votes_pct) ? 1 : -1);
  //records = ordenarArray(records,"missed_votes_pct","desc");

  var most_engaged = '';

  for (var i = 0; i < cantRecords; i++) {

    most_engaged += `
      <tr>
        <td>` + records[i].first_name + `</td>
        <td>` + records[i].missed_votes + `</td>
        <td>` + records[i].missed_votes_pct + `</td>
      </tr>
    `;

  }
  document.getElementById("sen_most_engaged").innerHTML = most_engaged;
  //=====================



  records.forEach(function(A) {



    //cantidad de Republicanos, Democratas e independientes
    if (A.party == "R") {
      party_R = A.party;
      party_rep += 1;
      votes_with_pty_rep += A.votes_with_party_pct;
      votes_with_pty_rep = parseFloat(votes_with_pty_rep).toFixed(2);
    }
    if (A.party == "D") {
      party_D = A.party;
      party_dem += 1;
      votes_with_pty_dem += A.votes_with_party_pct;
    }
    if (A.party == "I") {
      party_I = A.party;
      party_ind += 1;
      votes_with_pty_ind += A.votes_with_party_pct;
    }
    //-------------------------
    //este es el total de miembros
    tot += 1;
    //=========================

  });
  //este es el total de miembros

  //=========================
  var percent_total_rep = votes_with_pty_rep / party_rep;
  var percent_total_dem = votes_with_pty_dem / party_dem;
  var percent_total_ind = votes_with_pty_ind / party_ind;

  percent_total_rep = parseFloat(percent_total_rep).toFixed(2);
  percent_total_dem = parseFloat(percent_total_dem).toFixed(2);


  //DATOS PARA SENATE AT GLANCE
  var stats = {
    members: [{
        "party": party_R,
        "votes": party_rep,
        "percent": percent_total_rep,
      },
      {
        "party": party_D,
        "votes": party_dem,
        "percent": percent_total_dem,
      },
      {
        "party": party_I,
        "votes": party_ind,
        "percent": percent_total_ind,
      }
    ]
  };
  //========================

  //tabla para SENATE AT GLANCE

  senate_at_glance = "";
  stats.members.forEach(function(A) {
    senate_at_glance += '<tr><td>' + A.party + '</td>' + '<td>' + A.votes + '</td>' + '<td>' + A.percent + '</td></tr>'

  });
  document.getElementById("sen_at_glance_id").innerHTML = senate_at_glance;
  //=============================



}
