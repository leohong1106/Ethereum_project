import React, { Component } from 'react';
import Web3 from 'web3';


const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class App extends Component {

  // constructor(props){
  //   super(props)
  //   this.isConnected2=this.isConnected2.bind(this);
  // }

  // 1. 이더리움 네트웍 연동 확인
  isConnected = () => {
    console.log(web3.givenProvider)
    console.log(this) //중괄호 내에 것들만
  }

  // isConnected2() {
  //   console.log(web3.givenProvider)
  //   console.log(this)
  // }

  // 2. 네트웍 어카운트 조회
  getAccounts = () => {
    web3.eth.getAccounts()
      .then(console.log);
  }
  // 3. 후원하기
  setCount = async () => {
    var myContract = new web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_msg2", "type": "string" }], "name": "setMsg2", "outputs": [], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [], "name": "counter", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": true, "inputs": [], "name": "getMsg2", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": true, "inputs": [], "name": "getCounter", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": false, "inputs": [], "name": "setCounter", "outputs": [], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": true, "inputs": [], "name": "msg1", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function", "stateMutability": "view" }, { "inputs": [{ "name": "_msg1", "type": "string" }], "payable": false, "type": "constructor", "stateMutability": "nonpayable" }]
      ,
      '0x7d178f75d389F52E0068240753cB70b57b64B256', {
      from: "0xe5e85eeca1dcf12baec8bb8a59d5a6427d4898e5", // default from address
      gasPrice: '200000000' // default gas price in wei, 20 gwei in this case
    });
    /*  var helloethereumContract = web3.eth.Contract([{"constant":false,"inputs":[{"name":"_msg2","type":"string"}],"name":"setMsg2","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getMsg2","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[],"name":"setCounter","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"msg1","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"inputs":[{"name":"_msg1","type":"string"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"}]);
     var hello = helloethereumContract.at("0x0d66cFF739F222B95467Ba09800B4e755909Bfaf");
     hello.setCounter.sendTransaction(
       '',
       { from:web3.eth.accounts[0], gas:100000}, */


    // myContract.methods.setCounter().send({from: "0xe5e85eeca1dcf12baec8bb8a59d5a6427d4898e5", 
    // gasPrice: '20000000000'}).then(result => {
    //   console.log(result)
    // }).catch(err => {
    //   console.log(err)
    // })
    myContract.methods.setCounter().send({ from: "0xe5e85eeca1dcf12baec8bb8a59d5a6427d4898e5", gasPrice: '200000000' })
      .then(result => {
        console.log("sendCounter", result)
        web3.eth.getBlock(result.blockNumber)
          .then(result => {
            console.log("getBlock", result)
            web3.eth.getTransaction(result.transactions[0])
              .then(console.log);
          });
      }).catch(err => {
        console.log(err)
      })

    // await myContract.methods.setMsg2("hi");

    // Get the value from the contract to prove it worked.
    myContract.methods.getCounter().call()
      .then(result => {
        console.log("getCounter");
        console.log(result)
      })
  }
  render() {
    return (
      <div>
        <div>Hallo</div>
        <button type="button" onClick={this.isConnected}>네트워크 연결</button>
        {/* <button type="button" onClick={this.isConnected2}>네트워크 연결2</button> */}
        <button type="button" onClick={this.getAccounts}>어카운트 조회</button>
        <button type="button" onClick={this.setCount}>후원하기</button>
      </div>
    );
  }

}

export default App;
