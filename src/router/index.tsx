import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../container/Home';
import * as RoutePath from './config';

const Routes: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <Route exact key="Home" path={RoutePath.ROOT}>
                <Home />
            </Route>
            <Redirect from="*" to={RoutePath.ROOT} />
        </Switch>
    );
};

export default Routes;
