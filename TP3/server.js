var http = require('http');
var url = require('url');
var axios = require('axios');
var mypages = require('./mypages');
var util = require('./util');
var fs = require('fs');
var reID = new RegExp("/p\\d+")
var reSport = new RegExp("/desporto/[^/]+")

http.createServer(function(req, res){
  var d = new Date().toISOString().substring(0,16)
  console.log(req.method + " " + req.url + " " + d)
  var dicURL = url.parse(req.url,true);
  // resposta basica
  if (dicURL.pathname == "/"){
    res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
    res.end(mypages.mainPage())
  }
  //lista de todas as pessoas ordenada (possivel ter uma query para filtrar)
  else if(dicURL.pathname == "/pessoas"){
    axios.get(`http://localhost:3000${req.url}`)
    .then( function (response) {
      var pessoas = response.data
      let pessoasOrdenadas = pessoas.sort(
        (p1,p2) => (p1.nome < p2.nome) ? -1 : 1
      )
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end(mypages.pessoasPage(pessoasOrdenadas))
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end('Erro axios:' + erro)
    })
  }
  //pagina de uma pessoa com id do path
  else if(dicURL.pathname.match(reID)){
    let id = dicURL.pathname.substring(1,)
    axios.get(`http://localhost:3000/pessoas?id=${id}`)
    .then( function (response) {
      var pessoa = response.data
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end(mypages.pessoaPage(pessoa))
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end('Erro axios:' + erro)
    })
  }
  //pagina com estatisticas dos generos
  else if(dicURL.pathname == "/genero"){
    axios.get("http://localhost:3000/pessoas")
    .then( function (response) {
      var pessoas = response.data
      var result = util.count_sexes(pessoas)
      let sexos_ordenado = result.sort(
        (p1,p2) => (p1[0] < p2[0]) ? -1 : 1
      )
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end(mypages.sexesPage(sexos_ordenado))
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end('Erro axios:' + erro)
    })
  }
  //pagina com estatisticas dos desportos
  else if(dicURL.pathname == "/desporto"){
    axios.get("http://localhost:3000/pessoas")
    .then( function (response) {
      var pessoas = response.data
      var result = util.count_sports(pessoas)
      let sports_ordenado = result.sort(
        (p1,p2) => (p1[1] > p2[1]) ? -1 : 1
      )
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end(mypages.sportsPage(sports_ordenado))
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end('Erro axios:' + erro)
    })
  }
  //pagina com todas as pessoas com um desporto
  else if(dicURL.pathname.match(reSport)){
    axios.get(`http://localhost:3000/pessoas`)
    .then( function (response) {
      let sport = decodeURI(dicURL.pathname.substring(10,))
      var pessoas = response.data
      pessoas = util.filter_sport(pessoas,sport)
      pessoas = pessoas.sort(
        (p1,p2) => (p1.nome < p2.nome) ? -1 : 1
      )
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end(mypages.pessoasPage(pessoas))
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end('Erro axios:' + erro)
    })
  }
  //pagina com top profissoes
  else if(dicURL.pathname == "/topProf"){
    axios.get("http://localhost:3000/pessoas")
    .then( function (response) {
      var pessoas = response.data
      var result = util.count_professions(pessoas)
      let professions_ordenado = result.sort(
        (p1,p2) => (p1[1] > p2[1]) ? -1 : 1
      ).slice(0,10)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end(mypages.professionsPage(professions_ordenado))
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
      res.end('Erro axios:' + erro)
    })
  }
  // responder css
  else if(dicURL.pathname == "/w3.css"){
    fs.readFile('w3.css',function(err,data){
      res.writeHead(200,{'Content-Type': 'text/css;charset=utf-8'})
      if(err){
        console.log('Erro :'+err)
        res.write('Erro :'+err)
      }
      else{
        res.write(data)
      }
      res.end()
    })
  }
  else{
    res.writeHead(404,{'Content-Type': 'text/html;charset=utf-8'})
    res.end('Erro: Operação Não suporatda')
  }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')