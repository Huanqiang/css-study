echo "开始编译"
npm run build
cd build/

echo "开始 git 操作"
git init
git add .
git commit -m "@dev test"
git remote add origin https://github.com/Huanqiang/Huanqiang.github.io.git
git pull origin master --allow-unrelated-histories
git push --set-upstream origin master