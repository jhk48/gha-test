#!/bin/bash

GIT_HASH=$(git log -1 --pretty=%h)
docker build -t jaehyeon48/server:$GIT_HASH -f Dockerfile.server .

docker push jaehyeon48/server:$GIT_HASH
