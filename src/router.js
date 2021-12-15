import http from 'http';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';


let routes = [];

const add = (method, url, handler) => {
  routes.push({
    method,
    page: url.split(":")[0].replaceAll('/', ""),
    params: url.split(":")[1],
    handler
  });
};

const find = (method, requestedUrl) => {
  requestedUrl = requestedUrl.split('/').filter(page => page != "")
  let page = requestedUrl[0]
  if (!page) page = ""
  const route = routes.find(route => route.method === method && route.page === page)
  if (!route) return null;
  const value = requestedUrl[1]
  let params = {}
  params[route.params] = value

  return {
    handler: route.handler,
    params
  };
};


const router = (() => {

  const get = (route, handler) => add('get', route, handler);
  const post = (route, handler) => add('post', route, handler);

  const use = (customRoutes) => {
    return {
      ...customRoutes,
    }
  }

  const router = () => {
    const listen = (port, cb) => {
      http
        .createServer((req, res) => {
          const method = req.method.toLowerCase();
          const url = req.url.toLowerCase();
          const found = find(method, url);

          if (found) {
            req.params = found.params;
            res.views = (page = 'Home', data = []) => {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              let htmlContent = fs.readFileSync(__dirname + `/views/${page}.ejs`, 'utf8');
              let htmlRenderized = ejs.render(htmlContent, { filename: `${page}.ejs`, data, params: req.params });
              res.end(htmlRenderized)
            };
            return found.handler(req, res);
          }
          else {
            var basePath = __dirname + "/public";
            var stream = fs.createReadStream(path.join(basePath, req.url));
            stream.on('error', () => {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              let htmlContent = fs.readFileSync(__dirname + `/views/404.ejs`, 'utf8');
              let htmlRenderized = ejs.render(htmlContent, { filename: `404.ejs` });
              res.end(htmlRenderized)
            });
            stream.pipe(res);
          }

        })
        .listen(port, cb);
    };

    return {
      get,
      post,
      listen,
      use
    };
  };

  return router;
})();

export default router;
