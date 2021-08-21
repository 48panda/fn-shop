cd item-shop
rem npm run build
cd ..
cd ..
move fortnite-item-shop-recreation\item-shop\build\* 48panda48.github.io\
move fortnite-item-shop-recreation\item-shop\build\static 48panda48.github.io\static
cd 48panda48.github.io
git add --all
git commit -m "Updated fortnite item shop"
git push