#!/usr/bin/env node --enable-source-maps

import { readFileSync } from "fs";

const http = require("http");
const httpProxy = require("http-proxy");

const configText = readFileSync("./bcproxy.json").toString();
const config = JSON.parse(configText);

const proxy = httpProxy.createProxyServer({});

if (config.request) {
  proxy.on("proxyReq", (proxyReq: any) => {
    config.request.forEach((action: any) => {
      if (action.action === "setHeader") {
        proxyReq.setHeader(action.key, action.value);
      }
    });
  });
}

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, { target: config.target });
});

console.log(`listening on port ${config.proxyPort}`);
server.listen(config.proxyPort);
