"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","a364f19ee8b106fed762520c41e6c06a"],["/static/css/main.2e60a077.css","6c02529a762031843994225c3585995c"],["/static/js/main.616fb434.js","538ae51c5693acc58bfb4ed43a2e8cff"],["/static/media/404.85278eeb.svg","85278eeb1f4cd62b12af303d7b469841"],["/static/media/Bold.18f7f11f.woff2","18f7f11fc40d6ec66a8d62f42badd195"],["/static/media/Bold.8920fbfa.woff","8920fbfa424f2647ebb36b8333f852da"],["/static/media/FiraCode-Bold.06b79b8f.eot","06b79b8f8677e6333512a61ec7caa63f"],["/static/media/FiraCode-Bold.5c4876be.woff2","5c4876bef50a7df9d8ac48af75ecf11c"],["/static/media/FiraCode-Bold.8027cf95.woff","8027cf95961ca238debdd2352284e532"],["/static/media/FiraCode-Bold.ea734aec.ttf","ea734aec73e961c5814b1b403c9b90c6"],["/static/media/FiraCode-Light.13777887.ttf","137778879005023b427be30df1f57d83"],["/static/media/FiraCode-Light.5c6aa3e2.eot","5c6aa3e267f5554fd7cf15557b7e44aa"],["/static/media/FiraCode-Light.8c574ce8.woff2","8c574ce84d5db50582b71f028e3c08b4"],["/static/media/FiraCode-Light.aba400cf.woff","aba400cf60d151ff7b3da7c862cbde2d"],["/static/media/FiraCode-Medium.7c8fa370.eot","7c8fa37007189c6e9a50125e5ca64cff"],["/static/media/FiraCode-Medium.9e710fd1.woff","9e710fd112b1d07cf5277175c2dec679"],["/static/media/FiraCode-Medium.e0fea666.woff2","e0fea666fb73e683da8982050f509f81"],["/static/media/FiraCode-Medium.e613bf53.ttf","e613bf534959b8c52533e77ea0cee44e"],["/static/media/FiraCode-Regular.1a77fe6d.ttf","1a77fe6d9f399212fcfcfde790ce66b2"],["/static/media/FiraCode-Regular.4cfc5701.eot","4cfc570109e603356ee7586978c46852"],["/static/media/FiraCode-Regular.af2692f7.woff","af2692f72b79d5935fe511236e05dbc8"],["/static/media/FiraCode-Regular.bfec314a.woff2","bfec314a4943882a8e81f066004b74f3"],["/static/media/Gesta-Regular-webfont.2a6292ba.ttf","2a6292baa8209f21cef7cc76a5fe0d2b"],["/static/media/Gesta-Regular-webfont.57ee4962.eot","57ee4962f9647fdeb9d856a4a78ffd04"],["/static/media/Gesta-Regular-webfont.607a41cf.svg","607a41cf320f7eda8a1db94794b0d8a8"],["/static/media/Gesta-Regular-webfont.83361a3d.woff","83361a3d37d355e058aad4b9d8d6abc1"],["/static/media/Light.c086e59c.woff2","c086e59c0e79a4ab010175f93a857b2e"],["/static/media/Light.f797f977.woff","f797f977073804dfc34ad066ff7265d3"],["/static/media/Regular.0a0ca8c0.woff","0a0ca8c0134befe94191bdeca3b2b97c"],["/static/media/Regular.79fd997d.woff2","79fd997da8641f745897537aea7f80aa"],["/static/media/flags.9c74e172.png","9c74e172f87984c48ddf5c8108cabe67"],["/static/media/icons.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/media/icons.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/static/media/icons.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/media/icons.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/media/icons.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/static/media/slick.b7c9e1e4.woff","b7c9e1e479de3b53f1e4e30ebac2403a"],["/static/media/slick.ced611da.eot","ced611daf7709cc778da928fec876475"],["/static/media/slick.d41f55a7.ttf","d41f55a78e6f49a5512878df1737e58a"],["/static/media/slick.f97e3bbf.svg","f97e3bbf73254b0112091d0192f17aec"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,c){var f=new URL(e);return c&&f.pathname.match(c)||(f.search+=(f.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),f.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),f=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),f]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),c="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),a=urlsToCacheKeys.has(t));var f="/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(f,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});