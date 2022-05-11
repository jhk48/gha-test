#!/bin/bash

GIT_HASH=$(git log -1 --pretty=%h)
docker build -t jaehyeon48/daily-record-server:$GIT_HASH -f Dockerfile.daily-record-server .

docker push jaehyeon48/daily-record-server:$GIT_HASH
