const ul = document.getElementById('authors'); // Get the list where we will place our authors
const uri = 'https://api.propublica.org/congress/v1/102/house/members.json'; // Get 10 random users

let h = new Headers();
h.append('X-API-Key','jeMK8VwUV6JMGPHccmEZFEDenNipWQ0rvtgBlTuF')
let req = new Request(uri,{
  method: 'GET',
  headers: h,
  mode: 'cors'

});

fetch(req)
    .then(function(response) {
        return response.json();
        throw new Error(response.statusText);
    }).then(function (json) {

        mifuncion(json);

    });
