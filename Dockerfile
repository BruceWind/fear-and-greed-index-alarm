FROM ghcr.io/puppeteer/puppeteer:16.1.0


USER root
RUN chown -R node:node /usr/local/lib/node_modules
RUN chown -R pptruser:pptruser /usr/local/lib/node_modules

RUN mkdir -p /home/pptruser
COPY . /home/pptruser

EXPOSE $PORT
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm i -g puppeteer
#RUN npm config set registry https://registry.npm.taobao.org
RUN cnpm install

USER pptruser

CMD ["node", "index.js"]