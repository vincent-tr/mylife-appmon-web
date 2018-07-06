'use strict';

const util          = require('util');
const path          = require('path');
const http          = require('http');
const express       = require('express');
const enableDestroy = require('server-destroy');
const IOServer      = require('socket.io');
const IOClient      = require('socket.io-client');

const debug = require('debug')('mylife:appmon:web:server');

module.exports = class Server {

  constructor(options) {
    const app = express();

    if(options.dev) {
      debug('setup webpack dev middleware');

      // lazy require dev dependencies
      const webpack           = require('webpack');
      const webpackMiddleware = require('webpack-dev-middleware');
      const webpackConfig     = require('../webpack.config');
      const conf = { mode : 'development', ... webpackConfig };
      app.use(webpackMiddleware(webpack(conf), { publicPath: webpackConfig.output.publicPath }));
    }

    const publicDirectory = path.resolve(path.join(__dirname, '../public'));
    app.use(express.static(publicDirectory));

    this._server = http.Server(app);
    enableDestroy(this._server);

    const ios = new IOServer(this._server);
    ios.on('connection', socket => createBridge(socket, options.repositoryUrl));

    debug(`Start listening on port ${options.port}`);
    this._server.listen(options.port);
  }

  async close() {
    await util.promisify(done => this._server.close(done));
    this._server.destroy();
  }
};

function createBridge(webSocket, url) {
  const repositorySocket = IOClient(url);
  let closed = false;

  const close = () => {
    if(closed) { return; }
    closed = true;

    webSocket.disconnect(true);
    repositorySocket.close();
  };

  webSocket.on('disconnect', close);
  repositorySocket.on('disconnect', close);

  repositorySocket.on('connect', () => repositorySocket.send({ msgtype : 'viewer-handshake' }));

  repositorySocket.on('message', msg => webSocket.send(msg));
  webSocket.on('message', msg => repositorySocket.send(msg));
}
