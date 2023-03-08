var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');
var taskPages = require('./taskpage');
var static = require('./static');
var {parse} = require('querystring')
var util = require('./task_util');


/**
 * Busca a lista de todo tasks e resolved tasks e cria a pagina principal com estas
 * @param {*} res 
 */
function get_tasks_lists(res){
	axios.get(`http://localhost:3000/todo?_sort=dateDued&_order=asc`)
	.then( function (response) {
	  todo = response.data
	  axios.get(`http://localhost:3000/resolved?_sort=dateDued&_order=desc`)
              .then( function (response) {
                resolved = response.data
				res.writeHead(200,{'Content-Type': 'text/html'})
				res.end(taskPages.spa(todo,resolved))
              })
              .catch( erro => {
                console.log("Erro axios:" + erro)
              })
	})
	.catch( erro => {
	  console.log("Erro axios:" + erro)
	})
}

/**
 * Apaga uma task no json server e retorna para a pagina principal
 * @param {*} res 
 * @param {*} id 
 * @param {*} from 
 */
function delete_task(res,id,from){
	axios.delete(`http://localhost:3000/${from}/${id}`)
		.then(function (response) {
			console.log('Delete successfull');
			res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'})
			res.end()
		})
		.catch(function (error) {
		console.log(`Erro no Delete: ${error}`);
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
		res.write('<p>Couldn\'t delete task</p>')
		res.write('<p><a href="/">Return</a></p>')
		res.end()
	})
}

/**
 * Redireciona para a pagina de edicao de uma tarefa
 * @param {*} res 
 * @param {*} from 
 * @param {*} id 
 */
function edit_task_page(res,from,id){
	axios.get(`http://localhost:3000/${from}?id=${id}`)
	.then( function (response) {
	  	task = response.data[0]
		console.log(task)
		res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
		res.end(taskPages.editPage(task,from))
	})
	.catch( erro => {
	  console.log("Erro axios:" + erro)
	})
}

/**
 * Edita uma tarefa no json server
 * @param {*} res 
 * @param {*} id 
 * @param {*} who 
 * @param {*} what 
 * @param {*} deadline 
 * @param {*} from 
 */
function edit_task(res,id,who,what,deadline,from){
	axios.put(`http://localhost:3000/${from}/${id}`,{'dateDued':deadline,'who':who,'what':what})
	.then( function (response) {
	  	task = response.data[0]
		console.log(task)
		res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'})
		res.end()
	})
	.catch( erro => {
	  console.log("Erro axios:" + erro)
	})
}


/**
 * Muda uma task de uma das listas para a oposta
 * @param {*} res 
 * @param {*} id 
 * @param {*} from 
 * @param {*} to 
 */
function switch_task(res,id,from,to){
	axios.get(`http://localhost:3000/${from}?id=${id}`)
	.then( function (response) {
	  	task = response.data[0]
		console.log(task)
		util.sleep(200)
		axios.post(`http://localhost:3000/${to}`,{'dateDued':task.dateDued,'who':task.who,'what':task.what})
		.then(function (response) {
			console.log('Post successfull');
			util.sleep(200)
			axios.delete(`http://localhost:3000/${from}/${task.id}`)
				.then(function (response) {
					console.log('Delete successfull');
					res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'})
					res.end()
				})
				.catch(function (error) {
				console.log(`Erro no Delete: ${error}`);
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
				res.write('<p>Couldn\'t delete task during transfer</p>')
				res.write('<p><a href="/">Return</a></p>')
				res.end()
			});
			})
		.catch(function (error) {
			console.log(`Erro no Post: ${error}`);
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
			res.write('<p>Couldn\'t add tas during transfer</p>')
			res.write('<p><a href="/">Return</a></p>')
			res.end()
		});
	})
	.catch( erro => {
	  console.log("Erro axios:" + erro)
	})
}


/**
 * Coleta dados no body de uma http request post
 * @param {*} request 
 * @param {*} callback 
 */
function collectRequestBodyData(request, callback) {
  if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
          callback(parse(body));
      });
  }
  else {
      callback(null);
  }
}


var tasksServer = http.createServer(function(req, res){
  var d = new Date().toISOString().substring(0,16)
  console.log(req.method + " " + req.url + " " + d)
  var dicURL = url.parse(req.url,true);

  if(static.staticResource(req)){
    static.serveStaticResource(req, res)
  }
  else{
    switch(req.method){
		case "GET":
			// resposta basica
			if(dicURL.pathname == "/"){
				get_tasks_lists(res)
			}
			// pedido de editar uma task todo
			else if(dicURL.pathname == "/editTODO"){
				id = dicURL.query['submit'][0]
				from='todo'
				edit_task_page(res,from,id)
			}
			// pedido de editar uma task resolved
			else if(dicURL.pathname == "/editResolved"){
				id = dicURL.query['submit'][0]
				from='resolved'
				edit_task_page(res,from,id)
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
			break
		
		case "POST":
			// adicionar uma nova task em uma das listas
			if(dicURL.pathname == "/"){
				collectRequestBodyData(req, result => {
					if(result){
						console.dir(result)
						let list = 'todo' 
						if('newresolved' in result){
							list = 'resolved'
						}
						if(util.valid_task(result)){
							axios.post(`http://localhost:3000/${list}`,{'dateDued':result.deadline,'who':result.who,'what':result.what})
							.then(function (response) {
								console.log('Post successfull');
								res.setHeader('Content-Type', 'text/html;charset=utf-8')
								res.statusCode = 302
								res.setHeader('Location','/')
								res.end()
							})
							.catch(function (error) {
								console.log('Erro no Post');
								res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
								res.write('<p>Couldn\'t add task</p>')
								res.write('<p><a href="/">Return</a></p>')
								res.end()
							});
						}else{
							res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
							res.write('<p>Bad task post request</p>')
							res.write('<p><a href="/">Return</a></p>')
							res.end()
						}
					}
					else{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.write("<p>Unable to collect data from body...</p>")
						res.end()
					}
				})
			}
			// pedido para dar switch de uma task de todo para resolved
			else if(dicURL.pathname == "/fromTODO"){
				collectRequestBodyData(req, result => {
					if(result){
						id = result['submit'][0]
						from='todo'
						to='resolved'
						switch_task(res,id,from,to)
					}
					else{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.write("<p>Unable to collect data from body...</p>")
						res.end()
					}
				})
			}
			// pedido para dar switch de uma task de resolved para todo
			else if(dicURL.pathname == "/fromResolved"){
				collectRequestBodyData(req, result => {
					if(result){
						id = result['submit'][0]
						from='resolved'
						to='todo'
						switch_task(res,id,from,to)
					}
					else{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.write("<p>Unable to collect data from body...</p>")
						res.end()
					}
				})
			}
			// pedido para apagar uma task todo
			else if(dicURL.pathname == "/deletefromTODO"){
				collectRequestBodyData(req, result => {
					if(result){
						id = result['submit'][0]
						from='todo'
						delete_task(res,id,from)
					}
					else{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.write("<p>Unable to collect data from body...</p>")
						res.end()
					}
				})
			}
			// pedido para apagar uma task resolved
			else if(dicURL.pathname == "/deletefromResolved"){
				collectRequestBodyData(req, result => {
					if(result){
						id = result['submit'][0]
						from='resolved'
						delete_task(res,id,from)
					}
					else{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.write("<p>Unable to collect data from body...</p>")
						res.end()
					}
				})
			}
			// pedido para gravar a edicao de uma task (ou retornar a pagina principal)
			else if(dicURL.pathname == "/editTask"){
				collectRequestBodyData(req, result => {
					if(result){
						console.log(result)
						if('save' in result){
							id = result['id']
							who = result['who']
							what = result['what']
							deadline = result['deadline']
							from= result['from']
							edit_task(res,id,who,what,deadline,from)
						}
						else{
							res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'})
							res.end()
						}
					}
					else{
						res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
						res.write("<p>Unable to collect data from body...</p>")
						res.end()
					}
				})
			}
			else{
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
				res.write('<p>Unsupported POST request: ' + req.url + '</p>')
				res.write('<p><a href="/">Return</a></p>')
				res.end()
			}
			break
		default: 
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
			res.write("<p>" + req.method + " unsupported in this server.</p>")
			res.end()
		}
  }
  
})

tasksServer.listen(7779,() => {
  console.log('Servidor à escuta na porta 7779...')
})
