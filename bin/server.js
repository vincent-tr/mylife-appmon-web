'use strict';

const { ArgumentParser } = require('argparse');
const Server = require('../lib/server');
const config = require('../conf/config');

const debug = require('debug')('mylife:appmon:web:bin:server');

const parser = new ArgumentParser({
  description : 'Run a MyLife Application Monitor Web Client'
});

parser.addArgument([ '--port' ], {
  help     : 'Web port number',
  required : true,
  dest     : 'port'
});

parser.addArgument([ '--dev' ], {
  action : 'storeTrue',
  help   : 'Development mode',
  dest   : 'dev'
});

let server;

async function start() {
  const args = parser.parseArgs();

  debug(`Starting server (port=${args.port}, dev=${args.dev})`);

  const { viewer } = config;

  server = new Server({
    port : args.port,
    dev : args.dev,
    repositoryUrl : viewer.url
  });
}

async function stop() {
  try {
    await server.close();
    server = null;
  } catch(err) {
    console.error('Error closing server', err); // eslint-disable-line no-console
  }

  process.exit();
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

start();
