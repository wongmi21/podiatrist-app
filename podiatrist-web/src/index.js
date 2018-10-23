import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import App from './App';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {createStore} from 'redux';
import rootReducer from './reducers';
import {Provider} from 'react-redux';

import 'antd/dist/antd.css';
import RegisterPage from "./RegisterPage";


const store = createStore(rootReducer);

const RedirectRoute = ({ component: Component, redirect, ...rest }) => (
    <Route {...rest} render={(props) => (
        store.getState().auth === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: redirect,
                state: { from: props.location }
            }} />
    )} />
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
                <RedirectRoute path='/app' redirect='/login' component={App} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));