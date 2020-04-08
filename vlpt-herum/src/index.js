import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';
import configureStore from './redux/configureStore.jsx';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>
,document.getElementById('root'));
