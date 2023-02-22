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
  path = f"arq/arq{iter}.xml"
  web_page += f"""
            <li>
              <a name="{arq['name']}" href="{iter}">{arq['name']}</a>
            </li>
  """
  text = f"""<?xml version="1.0" encoding="utf-8"?>
  {arq['data']}
  """
  open(path,'w').write(text)
  iter += 1

web_page += """   
    </ul>
  </body>
</html>"""


file = open("arq_site.html","w",encoding='utf-8')
file.write(web_page)