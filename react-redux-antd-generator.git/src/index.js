
require('antd/dist/antd.less');

import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory  } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import reducers from './reducers/index';
import sagas from './sagas/index';
import global from './common/global';
import logger from 'redux-logger';

import AppRouter from './router'
//////////////////////
// Store

// 建立 saga middleware
// debugger
const sagaMiddleware = [createSagaMiddleware()];

// if (module.hot) {
//     sagaMiddleware.push(logger);
// }

const enhancer = compose(
  applyMiddleware(...sagaMiddleware)
);
// 將 saga middleware mount 在 Store 上
const initialState = {}
const store = createStore(
  combineReducers({...reducers, routing}),
  initialState,
  enhancer
  // applyMiddleware(sagaMiddleware, logger)
)

// 然後執行 saga
sagaMiddleware[0].run(sagas);
global.store = store;

//////////////////////
// Render
const history = syncHistoryWithStore(hashHistory, store);

const rootEl = document.getElementById('app')
ReactDom.render(
        <Provider store={store}>
            <AppRouter history={history}/>
        </Provider>

, rootEl);

if (module.hot) {
    module.hot.accept('./router.js', function () {
        const AppRouter = require('./router.js').default;
        ReactDom.render(
            <AppContainer>
                <Provider store={store}>
                    <AppRouter history={history}/>
                </Provider>
            </AppContainer>
        , rootEl);
     });
}
