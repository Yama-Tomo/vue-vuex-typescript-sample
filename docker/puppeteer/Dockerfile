FROM node:14-alpine

WORKDIR /app

RUN apk update && apk upgrade \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && apk add --no-cache \
      chromium@edge \
      nss@edge \
      freetype@edge \
      harfbuzz@edge \
      ttf-freefont@edge \
      su-exec \
      procps \
      git \
    && npm i -g npm \
    && rm -f /usr/local/bin/yarn* && rm -rf /opt/yarn* \
    && npm i -g yarn \
    && rm -rf /var/lib/apt/lists/* \
              /var/cache/apk/* \
              /usr/share/man \
              /root/.npm \
              /tmp/*

COPY puppeteer/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD bash -c "yarn --no-progress && yarn test -i"
