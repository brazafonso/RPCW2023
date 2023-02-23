from bs4 import BeautifulSoup

arq = open('arq.xml', 'r',encoding='utf-8')

soup = BeautifulSoup(arq, 'lxml-xml',from_encoding='utf-8')


web_page = """
  <!DOCTYPE html>
<html>
  <head>
    <title>Arq</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>Índice de conteúdos</h1>
    <a name='indice'>
    <!-- Lista com o índice -->
      <ul>
"""
arq_dict = []


for arq in soup.find_all('ARQELEM'):
  id = arq.IDENTI.text
  arq_dict.append( 
  {
    'name' : id,
    'data' : arq
  })


soup.clear()
arq_dict = sorted(arq_dict, key=lambda a:a['name'])
iter = 1

for arq in arq_dict:
  path = f"arq/arq{iter}.html"
  web_page += f"""
            <li>
              <a name="{arq['name']}" href="{iter}">{arq['name']}</a>
            </li>
  """
  text = f"""<!DOCTYPE html>
  <html>
    <head>
      <title>Arq{arq['name']}</title>
      <meta charset="UTF-8" />
    </head>
    <body>
      <p><a name='identi'><h1> {arq['data'].IDENTI}</h1><p>
      <h2><a name='descri'><b>Descrição :</b> {arq['data'].DESCRI} </h2>
      <h2><a name='crono'><b>Crono :</b> {arq['data'].CRONO}</h2>
      <h2><a name='lugar'><b>Lugar :</b> {arq['data'].LUGAR}</h2>
      <h2><a name='fregue'><b>Freguesia :</b> {arq['data'].FREGUE}</h2>
      <h2><a name='concel'><b>Concelho :</b> {arq['data'].CONCEL}</h2>
      <h2><a name='codadm'><b>Código :</b> {arq['data'].CODADM}</h2>
      <h2><a name='latitu'><b>Latitude :</b> {arq['data'].LATITU}</h2>
      <h2><a name='longit'><b>Longitude :</b> {arq['data'].LONGIT}</h2>
      <h2><a name='altitu'><b>Altitude :</b> {arq['data'].ALTITU}</h2>
      <h2><a name='acesso'><b>Acesso :</b> </h2>
        <h3>{arq['data'].ACESSO}</h3>
      <h2><a name='quadro'><b>Quadro :</b> </h2>
        <h3>{arq['data'].QUADRO}</h3>
      <h2><a name='traarq'><b>Traarq :</b> </h2>
        <h3>{arq['data'].TRAARQ}</h3>
      <h2><a name='desarq'><b>Desarq :</b> </h2>
        <h3>{arq['data'].DESARQ}</h3>
      <h2><a name='interp'><b>Interp :</b> {arq['data'].INTERP}</h2>
      <h2><a name='biblio'><b>Bibliografia :</b> </h2>
        <h3>{arq['data'].BIBLIO}</h3>
      <h2><a name='autor'><b>Autor :</b> {arq['data'].AUTOR}</h2>
      <h2><a name='data'><b>Data :</b> {arq['data'].DATA}</h2>
    </body>
  </html>
  """
  open(path,'w',encoding='utf-8').write(text)
  iter += 1

web_page += """   
    </ul>
  </body>
</html>"""


file = open("arq_site.html","w",encoding='utf-8')
file.write(web_page)