import React, { Component } from 'react';
import { Header } from './Header';
import { Main } from './Main'
import { TOKEN_KEY } from "../constants"
import '../styles/App.css';

class App extends Component {
    state = {
        isLoggedIn: false,
    }
    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({isLoggedIn: true });
}
    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} />
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
