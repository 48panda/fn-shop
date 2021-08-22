cd item-shop
call npm run build
cd ..
cd ..
del 48panda48.github.io\index.html
del 48panda48.github.io\manifest.json
del 48panda48.github.io\asset-manifest.json
del 48panda48.github.io\robots.txt
move fortnite-item-shop-recreation\item-shop\build\* 48panda48.github.io\
rd /s /q 48panda48.github.io\static\
move fortnite-item-shop-recreation\item-shop\build\static 48panda48.github.io\static
cd 48panda48.github.io
cmd /k