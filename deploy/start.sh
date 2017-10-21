#!/bin/bash

# strart testrpc
testrpc &

# build contracts
cd /opt && truffle deploy

# build frontend
cd /opt/frontend && yarn install
cp -r /opt/build/contracts /opt/frontend/node_modules/contracts
cd /opt/frontend && yarn run build
cp -r /opt/frontend/build /opt/frontend_static


# start backend
cd /opt/server && node server
