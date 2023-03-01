
exports.mainPage = function() {
  var pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title> About People</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <h1>About People</h1>
        </header>
        
        <div class="w3-container">
          <ul>
            <li><h2><a href="pessoas">Listagem completa</a></h2></li>
            <li><h2><a href="genero">Distribuição de género</a></h2></li>
            <li><h2><a href="desporto">Distribuição de desportos</a></h2></li>
            <li><h2><a href="topProf">Top profissões</a></h2></li>
          </ul>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC3</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}


exports.pessoasPage = function(lista){
  var pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title> About People</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <table style="width: 100%">
          <tr>
            <td>
              <h1>Lista de Pessoas</h1>
            </td>
            <td align="right">
              <a href="/"><h1>Início</h1></a>
            </td>
          </tr>
        </table>
        </header>
        
        <div class="w3-container">
          <table class="w3-table-all">
            <tr>
              <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
            </tr>
        `
  for(let i=0; i < lista.length; i++){
    pagHTML += `
          <tr onclick="window.location='/${lista[i].id}'">
            <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td><td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
          </tr>
    `
  }
  pagHTML +=`
          </table>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC3</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}

exports.pessoaPage = function(pessoa){
  pessoa = pessoa[0]
  var pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title> About People</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <table style="width: 100%">
          <tr>
            <td>
              <h1>${pessoa.nome}</h1>
            </td>
            <td align="right">
              <a href="/"><h1>Início</h1></a>
            </td>
          </tr>
        </table>
        </header>
        
        <div class="w3-container">
          <table class="w3-table-all">
            <tr>
              <th>Key</th><th>Value</th>
            </tr>
            <tr>
              <td>ID</td><td>${pessoa.id}</td>
            </tr>
            <tr>
              <td>BI</td><td>${pessoa.BI}</td>
            </tr>
            <tr>
              <td>Nome</td><td>${pessoa.nome}</td>
            </tr>
            <tr>
              <td>Idade</td><td>${pessoa.idade}</td>
            </tr>
            <tr>
              <td>Sexo</td><td>${pessoa.sexo}</td>
            </tr>
            <tr>
              <td>Profissão</td><td>${pessoa.profissao}</td>
            </tr>
            <tr>
              <td>Cidade</td><td>${pessoa.morada.cidade}</td>
            </tr>
            <tr>
              <td>Distrito</td><td>${pessoa.morada.distrito}</td>
            </tr>
            <tr>
              <td>Partido Político</td><td>${pessoa.partido_politico.party_name} (${pessoa.partido_politico.party_abbr})</td>
            </tr>
            <tr>
              <td>Religião</td><td>${pessoa.religiao}</td>
            </tr>
            <tr>
              <td>Desporto</td>
              <td>
        `
  
  pagHTML += html_list(pessoa.desportos)
  pagHTML +=`
              </td>
            </tr>
            <tr>
              <td>Animais</td>
              <td>
        `
  pagHTML += html_list(pessoa.animais)
  pagHTML +=`
              </td>
            </tr>
            <tr>
              <td>Celebridade preferidas</td>
              <td>
        `
  pagHTML += html_list(pessoa.figura_publica_pt)
  pagHTML +=`
              </td>
            </tr>
            <tr>
              <td>Marca Carro</td><td>${pessoa.marca_carro}</td>
            </tr>
            <tr>
              <td>Destinos Favoritos</td>
              <td>
        `
  pagHTML += html_list(pessoa.destinos_favoritos)
  pagHTML +=`
              </td>
            </tr>
            <tr>
              <td>Atributos</td>
              <td>
                <ul>
        `
  for(let key in pessoa.atributos){
    if(pessoa.atributos[key] == true){
      pagHTML += `
                  <li>
                    <p>${key.replace('_',' ')}</p>
                  </li>
      `
    }
  }
  pagHTML +=`
                </ul>
              </td>
            </tr>
          </table>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC3</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}

exports.sexesPage = function(sexesList){
  pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title> About People</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
      <header class="w3-container w3-blue">
      <table style="width: 100%">
        <tr>
          <td>
            <h1>Lista de Géneros</h1>
          </td>
          <td align="right">
            <a href="/"><h1>Início</h1></a>
          </td>
        </tr>
      </table>
      </header>
        
        <div class="w3-container">
          <table style="width: 30%">
            <tr>
              <th><h2>Género</h2></th><th><h2>Quantidade de pessoas</h2></th>
            </tr>
    `
  for(key in sexesList){
    sex = sexesList[key][0]
    count = sexesList[key][1]
    pagHTML +=`
            <tr>
              <td align="center"><a href="/pessoas?sexo=${sex}"><h3>${sex}</h3></td><td align="center"><h3>${count}</h3></td>
            </tr>
    `

  }

  pagHTML +=`
          </table>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC3</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}


exports.sportsPage = function(sportsList){
  pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title> About People</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
      <header class="w3-container w3-blue">
      <table style="width: 100%">
        <tr>
          <td>
            <h1>Lista de Desportos</h1>
          </td>
          <td align="right">
            <a href="/"><h1>Início</h1></a>
          </td>
        </tr>
      </table>
      </header>
        
        <div class="w3-container">
          <table style="width: 30%">
            <tr>
              <th><h2>Desporto</h2></th><th><h2>Quantidade de pessoas</h2></th>
            </tr>
    `
  for(key in sportsList){
    sport = sportsList[key][0]
    count = sportsList[key][1]
    pagHTML +=`
            <tr>
              <td align="center"><a href="/desporto/${sport}"><h3>${sport}</h3></td><td align="center"><h3>${count}</h3></td>
            </tr>
    `

  }

  pagHTML +=`
          </table>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC3</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}

function html_list(list){
  str = `<ul>`
  for(var i = 0; i < list.length; i++){
    str += `
      <li>
        <p>${list[i]}</p>
      </li>
      `
  }
  str += `</ul>`
  return str
}



exports.professionsPage = function(professionsList){
  pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title> About People</title>
      <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
      <div class="w3-card-4">
      <header class="w3-container w3-blue">
      <table style="width: 100%">
        <tr>
          <td>
            <h1>Top Profissões</h1>
          </td>
          <td align="right">
            <a href="/"><h1>Início</h1></a>
          </td>
        </tr>
      </table>
      </header>
        
        <div class="w3-container">
          <table style="width: 30%">
            <tr>
              <th><h2>Profissão</h2></th><th><h2>Quantidade de pessoas</h2></th>
            </tr>
    `
  for(key in professionsList){
    profession = professionsList[key][0]
    count = professionsList[key][1]
    pagHTML +=`
            <tr>
              <td align="center"><a href="/pessoas?profissao=${profession}"><h3>${profession}</h3></td><td align="center"><h3>${count}</h3></td>
            </tr>
    `

  }

  pagHTML +=`
          </table>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC3</h5>
        </footer>
      </div>
    </body>
  </html>
  `
  return pagHTML
}

function html_list(list){
  str = `<ul>`
  for(var i = 0; i < list.length; i++){
    str += `
      <li>
        <p>${list[i]}</p>
      </li>
      `
  }
  str += `</ul>`
  return str
}