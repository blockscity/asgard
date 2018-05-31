import React, { Component } from 'react';
import logo from '../logo.svg';
import './login.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          you have logged in
        </p>
      </div>
    );
  }
}

export default Home;
