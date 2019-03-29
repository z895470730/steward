import React, { Component } from 'react';
import store from './store/index';
import LoginPageUI from './component/LoginPageUI';
import HomePage from './component/HomePage';
class App extends Component {
  constructor(props){
    super(props);
    this.state = store.getState();
    store.subscribe(()=>{this.setState(store.getState())});
  }
  render() {
    return (
      <div className="App" style={{height:'100%'}}>
        {
          (() =>{
            return this.state.login_state ? <HomePage/> : <LoginPageUI/>;
          })()
        }
      </div>
    );
  }
}

export default App;
