import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {Route, Switch} from 'react-router'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configure from 'medium';
import Restricted from 'containers/restricted'


const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);


configure([middleware], {router: routerReducer})
    .then(
        medium => {
            ReactDOM.render(
                (<Provider store={medium}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/login" component={App}/>
                            <Restricted exact path="/" component={App}/>
                        </Switch>
                    </ConnectedRouter>
                </Provider>),
                document.getElementById('root')
            );
            registerServiceWorker();
        }
    );