import React, { Component } from 'react';
import './App.css';
import AccountBalanceBoard from './components/AccountBalanceBoard';
import Web3 from 'web3';
import SendTokenForm from './components/SendTokenForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3();
    this.web3.setProvider(new this.web3.providers.HttpProvider("http://localhost:8545"));

    // NOTE yuito
    // https://github.com/coopermaruyama/react-web3/issues/25
    // windowのweb3を塗り替える。
    if (window.web3) {
      window.web3 = this.web3;
    }
  }

  render() {
    return (
      <div>
        <AccountBalanceBoard web3={this.web3}/>
        <SendTokenForm web3={this.web3}/>
      </div>
    );
  }
}

export default App;
