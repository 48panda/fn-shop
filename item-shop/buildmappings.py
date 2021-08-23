import requests
import json

x = requests.get('https://fortnite-api.com/v2/cosmetics/br')
x = json.loads(x.text)
x =  x["data"]
blacklist=['banner','contrail','emoji','loadingscreen','music','spray','toy']
backbling=['backpack','petcarrier','pet']

items=[]
with open('public/mappings.json') as f:
  items = json.load(f)["data"]

for i in x:
  if i["id"] in items:
    continue
  if not i['introduction']:
    continue
  if i['name'].startswith("Set_01"):
    continue
  if i["type"]["value"] in blacklist:
    continue
  if i["type"]["value"] in backbling:
    i["type"]["value"] = 'backpack'
  items.append(i["id"])
  print("append!")
with open('public/mappings.json', 'w') as f:
    json.dump({"data":items}, f)
