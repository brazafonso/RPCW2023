import json


file = open("mapa.json","r",encoding='utf-8')
data = file.read()
data = json.loads(data)


links = data["ligações"]
cities = sorted(data["cidades"],key=lambda a:a["nome"])


cities_info = {}

#criar dicionario com informacao de todas as cidades e espaco para as ligacoes
for city in cities:
  cities_info[city['id']] = {
    'name' : city['nome'],
    'population' : city['população'],
    'description' : city['descrição'],
    'district': city['distrito'],
    'links' : set()
  }

#preencher ligações para todas as cidades
for city in links:
  id = city['origem']
  destination = city['destino']
  distance = city['distância']
  cities_info[id]['links'].add((cities_info[destination]['name'],destination, distance))
  cities_info[destination]['links'].add((cities_info[id]['name'],id, distance))


#Preencher HTML

web_page = """
<!DOCTYPE html>
<html>
  <head>
    <title>Mapa Virtual</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>Mapa Virtual</h1>
    <table>
      <tr>
        <td width="30%" valign="top">
          <h3>Índice</h3>
          <a name='indice'>
          <!-- Lista com o índice -->
          <ul>
"""

#Indice
for city in cities_info:
  web_page += f"""
    <li>
      <a href='#{city}'>{cities_info[city]['name']}</a>
    </li>
  """

web_page += """
        </ul>
      </td>
        <td width="70%">
        <!-- Informação das cidades -->
"""

#Informação das cidades
for city in cities_info:
  web_page += f"""
    <a name='{city}'/>
    <h3>{cities_info[city]['name']}</h3>
    <p><b>População:</b> {cities_info[city]['population']}</p>
    <p><b>Descrição:</b> {cities_info[city]['description']}</p>
    <p><b>Distrito:</b> {cities_info[city]['district']}</p>
    <center>
      <hr width="60%"/>
    </center>
    <p><b>Ligações:</b></p>
    <table width="80%">
  """

  links = sorted(cities_info[city]['links'],key=lambda a:a[0])
  side = 0
  for link in links:
    dest = link[1]
    distance = link[2]
    if not side:
      web_page += "<tr>"
    web_page += f"""
    <td>
    <address style="font-size: 15px"><b>Destino:</b> <a href="#{dest}">{cities_info[dest]['name']}</a></address>
    <p style="font-size: 10px"><b>Distância:</b> {distance}</p>
    </td>
    """
    if side:
      web_page += "</tr>"
      side = 0
    else:
      side = 1

  web_page +="""
    </table>
    <address>[<a href="#indice"> Voltar ao índice </a>]</address>
    <center>
      <hr width="100%"/>
    </center>

  """


web_page += """   
        </td>
      </tr>
    </table>
  </body>
</html>"""


file = open("site.html","w",encoding='utf-8')
file.write(web_page)



"""TODO:

  utilizar informaçao das ligaçoes no dataset
  - colocar para cada cidade as suas ligaçoes com respetiva distancia


"""