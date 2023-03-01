//Request especifico sobre um dado parametro
// Resposta devolve uma lista com um elemento, imprimir o nome deste
const axios = require('axios');

axios.get("http://localhost:3000/pessoas?CC=91258224-5-FV5")
      .then( function (response) {
        var pessoas = response.data
        console.log(pessoas[0].nome)
      })
      .catch( erro => {
        console.log("Erro :" + erro)
      })


