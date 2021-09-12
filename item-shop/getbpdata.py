import requests
import json
header = {"Authorization": "679a7a74-08dce1f7-7c544e7d-b6f1ecd7"}
for i in [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]:
  response = requests.get("https://fortniteapi.io/v2/battlepass?lang=en&season="+str(i), headers=header)
  with open(f"public/bp{i}.json","w+") as f:
    f.write(response.text)
