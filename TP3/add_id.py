import json


ds = "dataset-extra1.json"

json_file = open(ds, "r")
dic = json.load(json_file)
json_file.close()


id = 1
for entry in dic['pessoas']:
    entry['id'] = f'p{id}'
    id += 1

json_file = open(ds, "w").write(str)
str = json.dumps(dic,json_file)
json_file.close()

print(f"Adicionados {id} identificadores.")



    