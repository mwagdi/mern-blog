import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import Register from '../routes/Register';
import LoginContainer from '../containers/LoginContainer';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/" component={HomeContainer} />
        </Switch>
    </BrowserRouter>
)