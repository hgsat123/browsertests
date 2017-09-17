FROM ubuntu:16.04
MAINTAINER Satish Hegde

ENV BROWSERSTACK_USERNAME satishghegde1
ENV BROWSERSTACK_ACCESS_KEY 3AXeNBabQ7xcYNC9vY2a
#Setup build environment for libpam
RUN apt-get update -y
RUN mkdir -p /app && cd /app
RUN apt-get install -y nodejs npm git build-essential
RUN ln -s nodejs /usr/bin/node

RUN cd /tmp && git clone https://github.com/browserstack/protractor-browserstack
RUN cd protractor-browserstack && npm install

#RUN npm run local

