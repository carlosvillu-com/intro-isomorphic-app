/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

import React from 'react';
import {RoutingContext, match} from "react-router";
import {createHistory} from "history";
import routes from './app/routes';
import {readFileSync} from 'fs';
import Transmit from "react-transmit";


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(express.static(__dirname + '/dist'));

if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.get('*', function response(req, res) {

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {

    Transmit.renderToString(RoutingContext, renderProps).then(({reactString, reactData}) => {

      console.log(reactString, reactData);

      const html = readFileSync(__dirname + '/views/index.html')
                    .toString()
                    .replace('#APP#', reactString);
      const output = Transmit.injectIntoMarkup(html, reactData, ['/main.js'])
      res.send(output);
    }).catch(console.error.bind(console));

  });

});

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
