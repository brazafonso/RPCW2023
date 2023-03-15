var express = require('express');
var Task = require('../controllers/tasks');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Task.get_tasks()
    .then(tasks =>{
      todo = tasks[0]
      resolved = tasks[1]
      res.render('index', { todoList: todo,resolvedList:resolved ,d:data});
    })
    .catch(err =>{
      res.render('error',{'error':err})
    })
});

/** Get pagina para editar todo */
router.get('/editTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  id = req.query['submit'][0]
  from = req.query['from']
  Task.get_task(from,id)
    .then(task =>{
      res.render('editTask', { task: task,from:from,d:data});
    })
    .catch(err =>{
      res.render('error',{'error':err})
    })
});


/** Post de uma nova task */
router.post('/',function(req,res,next){
  var data = new Date().toISOString().substring(0,16)
  task = req.body
  list = 'todo'
  if('newresolved' in task)
    list = 'resolved'
  Task.add_task(task,list)
    .then(task =>{
      res.redirect('/')
    })
    .catch(err =>{
      res.render('error',{'error':err})
    })
})

/** Post de transferencia de lista de uma task */
router.post('/transferTask',function(req,res,next){
  var data = new Date().toISOString().substring(0,16)
  body = req.body
  id = body['submit'][0]
  from = body['from']
  to = body['to']
  Task.transfer_task(id,from,to)
    .then(task =>{
      res.redirect('/')
    })
    .catch(err =>{
      res.render('error',{'error':err})
    })
})


/** Post de delete de uma task */
router.post('/deleteTask',function(req,res,next){
  var data = new Date().toISOString().substring(0,16)
  body = req.body
  id = body['submit'][0]
  from = body['from']
  Task.delete_task(id,from)
    .then(task =>{
      res.redirect('/')
    })
    .catch(err =>{
      res.render('error',{'error':err})
    })
})


/** Post para PUT de uma task */
router.post('/editTask',function(req,res,next){
  var data = new Date().toISOString().substring(0,16)
  body = req.body
  if('save' in body){
    console.log(body)
    id = body['id']
    who = body['who']
    what = body['what']
    deadline = body['deadline']
    from= body['from']
    Task.update_task(id,who,what,deadline,from)
      .then(task =>{
        res.redirect('/')
      })
      .catch(err =>{
        res.render('error',{'error':err})
      })
  }
  else{
    res.redirect('/')
  } 
})

module.exports = router;
