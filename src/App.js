import React, { Component } from 'react';
import LoginPageUI from './component/LoginPageUI';
class App extends Component {
  render() {
    return (
      <div className="App" style={{height:'100%'}}>
        <LoginPageUI/>
      </div>
    );
  }
}

export default App;
