#!/usr/bin/env bash
npm install

if [ $NODE_ENV == "development" ]; then
  yarn start
else
  yarn build
  serve -s build -l 3000
fi