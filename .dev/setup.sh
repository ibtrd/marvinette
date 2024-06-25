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

cd ..
npm i
npm run build
