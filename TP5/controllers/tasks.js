var axios = require('axios')
var util = require('./utils')

module.exports.get_tasks = () => {
  return axios.get(`http://localhost:3000/todo?_sort=dateDued&_order=asc`)
	.then( function (response) {
	  todo = response.data
	  return axios.get(`http://localhost:3000/resolved?_sort=dateDued&_order=desc`)
              .then( function (response) {
                resolved = response.data
                return [todo,resolved]
              })
              .catch( erro => {
                console.log("Erro axios:" + erro)
                return erro
              })
	})
	.catch( erro => {
	  console.log("Erro axios:" + erro)
	})
}


module.exports.get_task = (from,id) => {
  return axios.get(`http://localhost:3000/${from}?id=${id}`)
    .then( function (response) {
        task = response.data[0]
        return task
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
    })
}

module.exports.add_task = (task,list) => {
  return axios.post(`http://localhost:3000/${list}`,{'dateDued':task.deadline,'who':task.who,'what':task.what})
      .then(function (response) {
        console.log('Post successfull');
        return response.data
      })
      .catch(function (error) {
        console.log('Erro no Post');
        return error
      });
}

module.exports.transfer_task = (id,from,to) => {
  return axios.get(`http://localhost:3000/${from}?id=${id}`)
	.then( function (response) {
	  	task = response.data[0]
      util.sleep(200)
      return axios.post(`http://localhost:3000/${to}`,{'dateDued':task.dateDued,'who':task.who,'what':task.what})
      .then(function (response) {
        console.log('Post successfull');
        util.sleep(200)
        return axios.delete(`http://localhost:3000/${from}/${task.id}`)
          .then(function (response) {
            console.log('Delete successfull');
            return response
          })
          .catch(function (error) {
            console.log(`Erro no Delete: ${error}`);
            return error
        });
        })
      .catch(function (error) {
        console.log(`Erro no Post: ${error}`);
        return error
      });
    })
  .catch( error => {
    console.log("Erro axios:" + error)
    return error
  })
}


module.exports.delete_task = (id,from) =>{
  return axios.delete(`http://localhost:3000/${from}/${id}`)
    .then(function (response) {
      console.log('Delete successfull');
      return response
    })
    .catch(function (error) {
      console.log(`Erro no Delete: ${error}`);
      return error
    })
}

module.exports.update_task = (id,who,what,deadline,from) => {
  return axios.put(`http://localhost:3000/${from}/${id}`,{'dateDued':deadline,'who':who,'what':what})
    .then( function (response) {
        console.log('Update successfull')
        return response
    })
    .catch( erro => {
      console.log("Erro axios:" + erro)
      return erro
    })
}