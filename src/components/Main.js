import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Route, Switch } from 'react-router-dom';

export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/Login" component={Login}/>
                    <Route component={Login}/>
                </Switch>
            </div>
        );
    }
}
