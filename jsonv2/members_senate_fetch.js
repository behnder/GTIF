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

  var html = "";

  var records = data.results[0].members;
  console.log(records);
  records.forEach(function(A) {

    var name = A.middle_name != null ? A.middle_name : "";


    html += '<tr>' +
      '<td>' + '<a href="' + A.url + '">' + A.first_name + " " + name + " " + A.last_name + '</a>' + '</td>' +
      '<td>' + A.party + '</td>' +
      '<td>' + A.state + '</td>' +
      '<td>' + A.seniority + '</td>' +
      '<td>' + "%" + A.votes_with_party_pct + '</td>' +
      '</tr>';
  });

  var cabecera = '<tr>' + '<td>' + "FULL NAME " +
    '</td>' + '<td>' + "PARTY" + '</td>' + '<td>' +
    "STATE" + '</td>' + '<td>' + "SENIORITY" + '</td>' +
    '<td>' + "VOTES WITH PARTY" + '</td>' + '</tr>';

  console.log(html);
  document.getElementById("senate-data").innerHTML = cabecera + html;


}
