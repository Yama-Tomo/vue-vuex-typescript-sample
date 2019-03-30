FROM buildkite/puppeteer:latest

RUN apt-get update && apt-get -y install git procps gosu && npm i -g npm
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD bash -c "npm i --no-progress && npm run test -- -i"
