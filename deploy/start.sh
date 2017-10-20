#!/bin/bash

# strart testrpc
testrpc &

# build contracts
cd ..
truffle deploy
cd server

# start backend
node server
