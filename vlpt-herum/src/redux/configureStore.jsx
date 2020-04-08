import {createStore, applyMiddleware, compose} from 'redux';
import penderMiddleWare from 'redux-pender';
import modules from './modules';

//Todo :미들웨어, react-hot-loader 적용

const isDevelopment = process.env.NODE_EVN === 'development';
const composeEnhancers = isDevelopment ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const configureStore = (initialState) => {
    const store = createStore(modules, initialState,composeEnhancers(
        applyMiddleware(penderMiddleWare())
    ));
    return store;
}

export default configureStore;