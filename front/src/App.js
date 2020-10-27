import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom"
import Find from "./components/find"
import Create from "./components/create"
import Chat from "./components/chat"


function App() {
  return (
   <Switch>
     <Route path="/" component={Find} exact />
     <Route path="/create" component={Create} exact />
     <Route path="/:id" component={Chat} />
   </Switch>
  );
}

export default App;



