
#kill all nodeJS 
pm2 kill 

#restart nodejs
pm2 start -i 4 ./bin/www