let app = new Vue({
  el: '#app',
  data: {
    members: [

    ]
  },
  methods: {
    devolverArray() {
      fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
        method: "GET", //obtener por get
        headers: new Headers({
          "X-API-Key": 'jeMK8VwUV6JMGPHccmEZFEDenNipWQ0rvtgBlTuF' //asignar el header con la key del mail
        }),
      }).then(function(response) {
        if (response.ok)
          return response.json();
        throw new Error(response.statusText);
      }).then(function(json) {
        var personas = json.results[0].members;
        console.log("esto es this members", personas);
        //console.log(json.results[0].members);
        this.members.push({
          personas

        })
      });
    },
    mostrarLogArray() {
      console.log(members);
    }


  }

});