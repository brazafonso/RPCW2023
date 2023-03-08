


/**
 * Returns the main page of the site
 * @param {*} todo_dic 
 * @param {*} resolved_dic 
 * @returns 
 */
exports.spa = function(todo_dic,resolved_dic){
  pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Tasks lists</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <h1>Tasks Lists</h1>
        </header>

        <div class="w3-container w3-border w3-border-light-blue">
        <form  method="POST">
          <h2>Create Task</h2>
          <div class="w3-row">
            <div class="w3-col" style="width:33%">
              <b>Who : </b>
              <input class="w3-round" type="text" name="who" required>
            </div>
            <div class="w3-col" style="width:33%">
              <b>What : </b>
              <textarea class="w3-round"  name="what" required></textarea>
            </div>
            <div class="w3-col" style="width:33%">
              <b>Deadline : </b>
              <input class="w3-round" type="date" name="deadline" required>
            </div>
          </div>
          <div class="w3-row">
            <div class="w3-col" style="width:50%">
              <input class="w3-button w3-light-grey" type="submit" name="newtodo" value="+">
            </div>
            <div class="w3-col" style="width:10%">
              <input class="w3-button w3-light-grey" type="submit" name="newresolved" value="+">
            </div>
            <div class="w3-col w3-right-align" style="width:40%">
              <input class="w3-button w3-light-grey " type="Reset" value="reset">
            </div>
          </div>
        </form>
        </div>
        
        <div class="w3-row">
          <div class="w3-container w3-half w3-col">
            <h2><b>To do tasks</b></h2>
            <table class="w3-table-all">
              <tr>
                <th>Who</th><th>What</th><th>Deadline</th>
              </tr>`
  for(let value in todo_dic){
    task = todo_dic[value]
    pagHTML += `
              <tr>
                <td>${task['who']}</td><td>${task['what']}</td><td>${task['dateDued']}
                <form method='GET' action='/editTODO'>
                <input type='hidden' name="submit" value="${task['id']}" />
                <td style="width:10%"><input class="w3-round w3-input w3-blue w3-hover-amber" type='submit' name="submit" value="Edit"></td>
                </form>
                <form method='POST' action='/deletefromTODO'>
                <input type='hidden' name="submit" value="${task['id']}" />
                <td style="width:8%"><input class="w3-round w3-input w3-blue w3-hover-amber" type='submit' name="submit" value="-"></td>
                </form>
                <form method="post" action='/fromTODO'>
                <input type='hidden' name="submit" value="${task['id']}" />
                <td style="width:5%"><input class="w3-round w3-input w3-blue w3-hover-amber" type='submit' name="submit" value="->"></td>
                </form>
              </tr>
    `
  }

  pagHTML +=`  
            </table>
          </div>
          <div class="w3-container w3-half w3-col">
            <h2><b>Resolved tasks</b></h2>
            <table class="w3-table-all">
              <tr>
                <th></th><th></th><th></th><th>Who</th><th>What</th><th>Deadline</th>
              </tr>
              `
  for(let value in resolved_dic){
    task = resolved_dic[value]
    pagHTML += `
              <tr>
                <form method="post" action='/fromResolved'>
                <input type='hidden' name="submit" value="${task['id']}" />
                <td style="width:5%"><input class="w3-round w3-input w3-blue w3-hover-amber" type='submit' name="submit" value="<-"></td>
                </form>
                <form method='get' action='/editResolved'>
                <input type='hidden' name="submit" value="${task['id']}" />
                <td style="width:10%"><input class="w3-round w3-input w3-blue w3-hover-amber" type='submit' name="submit" value="Edit"></td>
                </form>
                <form method='post' action='/deletefromResolved'>
                <input type='hidden' name="submit" value="${task['id']}" />
                <td style="width:8%"><input class="w3-round w3-input w3-blue w3-hover-amber" type='submit' name="submit" value="-"></td>
                </form>
                <td>${task['who']}</td><td>${task['what']}</td><td>${task['dateDued']}
              </tr>
    `
  }
  pagHTML +=`
            </table>
          </div>
        </div>

        <footer class="w3-container w3-blue w3-bottom">
          <h5>Generated in RPCW2023-TPC4</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}


/**
 * Returns a page to edit a task
 * @param {*} task 
 * @param {*} from 
 * @returns 
 */
exports.editPage = function(task,from){
  pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Edit Task</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <h1>Edit Task</h1>
        </header>

        <div class="w3-container w3-centered w3-border w3-border-light-blue" style="height:40em;">
        <form  method="POST" action='/editTask'>
          <div class="w3-row" style="padding: 10% 0">
            <div class="w3-col" style="width:33%">
              <b>Who : </b>
              <input class="w3-round" type="text" name="who" value="${task.who}" required>
            </div>
            <div class="w3-col" style="width:33%">
              <b>What : </b>
              <textarea class="w3-round"  name="what" value="${task.what}" required>${task.what}</textarea>
            </div>
            <div class="w3-col" style="width:33%">
              <b>Deadline : </b>
              <input class="w3-round" type="date" name="deadline" value="${task.dateDued}" required>
            </div>
              <input type="hidden" name="from" value="${from}">
              <input type="hidden" name="id" value="${task.id}">
          </div>
          <div class="w3-row">
            <div class="w3-col w3-right-align" style="width:100%">
              <input class="w3-button w3-light-grey" type="submit" name="return" value="Return">
              <input class="w3-button w3-light-grey " type="Reset" value="reset">
              <input class="w3-button w3-light-grey" type="submit" name="save" value="Save">
            </div>
          </div>
        </form>
        </div>

        <footer class="w3-container w3-blue w3-bottom">
          <h5>Generated in RPCW2023-TPC4</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}