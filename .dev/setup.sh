#!/bin/bash

STATUS=$(docker ps -a | grep mongo)
if [ -z "$STATUS" ]; then
    docker run --name mongo -d -it -p 27017:27017 mongo
else
    STATUS=$(echo "$STATUS" | grep Exited)
	if [ -z "$STATUS" ]; then
		echo mongo docker is already running
	else
		docker start mongo
	fi
fi

cd ../client
npm i
npm run build
cd ../server
npm i

HOST=`hostname | cut -d '.' -f 1`
HOST=$HOST:3000

echo HOST=\"$HOST\" >> ../server/.env
echo REDIRECT_URI=\"http://$HOST/oauth/callback\" >> ../server/.env
