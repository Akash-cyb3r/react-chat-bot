import React, { Component } from "react";
import "./App.css";
import Chat from "./Chat";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 style={{ margin: "unset" }}>Chat App</h2>
        </div>
        <Chat />
      </div>
    );
  }
}

export default App;
