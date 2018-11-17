#!/bin/bash
#cd /app/war
#rm -rf z-manager
exho "upload file...."
scp -r ./dist root@47.99.247.130:/app/war/z-manager-new
exho "ssh login...."
ssh root@47.99.247.130 -p 22 "cd /app/war ; pwd"
exho "remove old file...."
rm -rf /app/war/static/*
mv /app/war/z-manager-new ./z-manager
exho "check file.."
ls -l /app/war/static/
sh /app/script/nginx_reload.sh
echo "finish success!"
