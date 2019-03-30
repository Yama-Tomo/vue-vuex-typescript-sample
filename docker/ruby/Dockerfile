FROM circleci/ruby:2.4.1-node

RUN sudo sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 2AF971A1 && \
    sudo sh -c 'echo "deb http://deb.debian.org/debian jessie main" > /etc/apt/sources.list' && \
    sudo sh -c 'echo "deb http://security.debian.org jessie/updates main" >> /etc/apt/sources.list' && \
    sudo sh -c 'echo "deb http://ppa.launchpad.net/tianon/gosu/ubuntu trusty main" >> /etc/apt/sources.list' && \
    sudo sh -c 'echo "deb-src http://ppa.launchpad.net/tianon/gosu/ubuntu trusty main" >> /etc/apt/sources.list' && \
    sudo apt-get update && sudo apt-get install -y --no-install-recommends gosu && \
    sudo chmod g+s /usr/sbin/gosu && \
    sudo chmod u+s /usr/sbin/gosu

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sudo chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD bash
