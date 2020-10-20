import React from 'react'
import './Home.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
const Home = () => (
  
  
         <Router>
           <Route path="/init" exact component={Join} />
           <Route path="/chat" component={Chat} />
        </Router>
    
    );

export default Home
