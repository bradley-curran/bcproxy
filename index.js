#!/usr/bin/env node --enable-source-maps
"use strict";var t=require("fs"),s=require("http"),a=require("./node_modules/http-proxy/index.js"),c=(0,t.readFileSync)("./bcproxy.json").toString(),r=JSON.parse(c),n=a.createProxyServer({});r.request&&n.on("proxyReq",o=>{r.request.forEach(e=>{e.action==="setHeader"&&o.setHeader(e.key,e.value)})});var y=s.createServer((o,e)=>{n.web(o,e,{target:r.target})});console.log(`listening on port ${r.proxyPort}`);y.listen(r.proxyPort);
//# sourceMappingURL=index.js.map
