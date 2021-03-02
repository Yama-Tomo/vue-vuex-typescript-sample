FROM ruby:3-alpine

WORKDIR /app
COPY __api/Gemfile* ./

RUN apk add --no-cache --virtual .build-deps ruby-dev libc-dev musl-dev g++ make gcc libc-dev \
    && apk add --no-cache sqlite-dev tzdata su-exec libxml2-dev libxslt-dev \
    && bundle config build.nokogiri --use-system-libraries \
    && bundle install --jobs=$(getconf _NPROCESSORS_ONLN) \
    && apk del .build-deps \
    && rm -rf /var/lib/apt/lists/* \
              /var/cache/apk/* \
              /usr/share/man \
              /app/* \
              /tmp/*

COPY docker/ruby/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD sh
