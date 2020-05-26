import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Room, Join } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/room" component={Room} />
      </Router>
    </div>
  );
}

export default App;
