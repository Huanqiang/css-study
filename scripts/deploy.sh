echo "开始编译"
npm run build
cd build/

echo "开始 git 操作"
git init
git add .
git commit -m "@dev test"
git remote add origin git@github.com:Huanqiang/Huanqiang.github.io.git
git config --local http.postBuffer 524288000
git pull origin master --allow-unrelated-histories
git push --set-upstream origin master