#!/bin/bash
cd ~/Documents/Project/React/css-study
yarn build:blog
yarn addBlog
yarn deploy
echo '如果上传至 github 失败，请手动执行 yarn run publish'