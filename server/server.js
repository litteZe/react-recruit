import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../src/reducer';
import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
import staticPath from '../build/asset-manifest.json';
assethook({
    extensions: ['png']
});
/* eslint-disable */
import App from '../src/App';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userRouter = require('./user');
const models = require('./model');

const Chat = models.getModel('chat');
const PORT = 9093;

io.on('connection', socket => {
    socket.on('sendmsg', data => {
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create(
            {
                chatid,
                from,
                to,
                content: msg
            },
            (err, doc) => {
                console.log(doc);
                io.emit('recvmsg', doc);
            }
        );
    });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use((req, res, next) => {
    if (/^(\/user|\/static)/.test(req.url)) {
        return next();
    }
    const store = createStore(reducers, applyMiddleware(thunk));
    let context = {};
    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" href="/${staticPath['main.css']}"/>
        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">`);
    const markupStream = renderToNodeStream(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    markupStream.pipe(res, { end: false });
    markupStream.on('end', () => {
        res.write(`</div><script src="/${staticPath['main.js']}"></script></body></html>`);
        res.end();
    });
});
app.use('/', express.static(path.resolve('build')));

server.listen(PORT, function() {
    console.log(`Node App start at port ${PORT}`);
});
