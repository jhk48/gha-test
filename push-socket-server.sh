#!/bin/bash

GIT_HASH=$(git log -1 --pretty=%h)
docker build -t jaehyeon48/socket-server:$GIT_HASH -f Dockerfile.socket-server .

docker push jaehyeon48/socket-server:$GIT_HASH
