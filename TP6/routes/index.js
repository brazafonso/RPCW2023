var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Person.list()
    .then(people => {
      res.render('index', { slist: people, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de people"})
    })
});

/* GET Person Form. */
router.get('/people/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPersonForm', {d: data})
});

/* GET Person page. */
router.get('/people/:idPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  console.log(req.params)
  Person.getPerson(req.params.idPerson)
    .then(Person => {
      console.log(Person)
      res.render('person', { p: Person, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Person"})
    })
});

/* GET Person Update Form. */
router.get('/people/edit/:idPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Person.getPerson(req.params.idPerson)
    .then(p => {
      person = Person.formatPerson(p)
      res.render('updatePersonForm', {p: person, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Person"})
    })
});

/* GET Person Delete Form. */
router.get('/people/delete/:idPerson', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Person.getPerson(req.params.idPerson)
    .then(Person => {
      res.render('deletePersonForm', {p: Person, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Person"})
    })
});

/* GET Delete Confirmation */
router.get('/people/delete/:idPerson/confirm', (req,res)=>{
  Person.deletePerson(req.params.idPerson)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Person"})
    })
})

// POST Person Form Data
router.post('/people/registo', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Person.addPerson(req.body)
    .then(Person => {
      res.render('addPersonConfirm', {p: Person})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de Person"})
    })
})

// POST Person Update Form
router.post('/people/edit/:idPerson', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Person.updatePerson(req.body)
    .then(Person => {
      console.log(Person)
      res.render('updatePersonConfirm', {p: Person})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de Person"})
    })
})

module.exports = router;
