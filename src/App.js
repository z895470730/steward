import React, { Component } from 'react';
import LoginPageUI from './component/LoginPageUI';
import HomePage from './component/HomePage'
class App extends Component {
  render() {
    return (
      <div className="App" style={{height:'100%'}}>
        {/*<LoginPageUI/>*/}
        <HomePage/>
      </div>
    );
  }
}

export default App;
