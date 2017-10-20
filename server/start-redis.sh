#!/bin/sh

docker run -p 6379:6379 -v $PWD/redis-data:/data redis