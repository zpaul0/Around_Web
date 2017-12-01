import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Route, Switch, Redirect} from 'react-router-dom';
import {Home } from './Home'

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login/>;
    }
    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/Login"/>;
    }
    getRoot = () => {
        return <Redirect to="/Login"/>
    }
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/Login" render={this.getRoot()}/>
                    <Route path="/register" render={this.getLogin}/>
                    <Route path="/Login" component={Register}/>
                    <Route path="/Home" render={this.getHome}/>
                    <Route component={Login}/>
                </Switch>
            </div>
        );
    }
}
