# debian 9
FROM node:10

RUN mkdir /app

RUN npm install -g nodemon

RUN npm i -g pm2 && \
  pm2 install pm2-logrotate

RUN apt-get update

RUN apt-get -y install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 && \
  apt-get -y install libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 && \
  apt-get -y install libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 && \
  apt-get -y install libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 && \
  apt-get -y install libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation && \
  apt-get -y install libappindicator1 libnss3 lsb-release xdg-utils wget

WORKDIR /app

RUN npm install

EXPOSE 3000
