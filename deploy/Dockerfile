FROM node:8.7.0

RUN apt-get update && apt-get install -y \
    git

RUN npm install -g ethereumjs-testrpc
RUN npm install -g serve
RUN npm install -g truffle

COPY . /opt/
RUN cd /opt/server && npm install

WORKDIR /opt/server

CMD ["/opt/deploy/start.sh"]
