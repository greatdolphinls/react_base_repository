import React, { Component } from 'react';
import Main from './MainRoutes';
import Header from './layout/header/header';
import Boot from "./setting/boot";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

Boot()
  .then(() => App())
  .catch(error => console.error(error));
export default App;
