var http = require('http');
var fs = require('fs');

var re = new RegExp("/\\d+")

http.createServer(function(req, res){
  console.log(req.url)
  var path = ''
  var cType = ''
  if(req.url == '/'){
    path = 'arq_site.html'
    cType = 'text/html'
  }else if(req.url.match(re)){
    path = 'arq/arq' + req.url.substring(1) + '.xml'
    cType = 'text/xml'
  }
  console.log(path)
  fs.readFile(path,function(err,data){
    res.writeHead(200,{'Content-Type': cType})
    if(err){
      res.write('Erro: ' + err)
    }
    else{
      res.write(data)
    }
    res.end()
  })
}).listen(7777)

console.log('Servidor a ouvir na porta 7777...')