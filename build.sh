#!/bin/bash

git pull
npm run build

pm2 restart patchhub@18003