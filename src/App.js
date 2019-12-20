import React from 'react';
import Nav from './Nav';
import Register from './Register';
import {Grid} from "@material-ui/core";
import chatImg from './chat1.png';
import Messages from './Messages';
import {
  BrowserRouter as Router,

  Route

} from "react-router-dom";


function App() {

  
  return (
    
   <div>
     
   <Router>
       <Route exact path="/mes">
       <Messages />
        </Route>
        <Route exact path="/">
        <Nav title="My Chat App" />
     <div >
     <Grid container spacing={2} >
     <Grid item xs={6}>
     <img className="chat-img" src={chatImg} alt="Chat" />
       </Grid>
       <Grid item xs={4}>
       <Register />
       </Grid>
       </Grid>
      
       </div>
        </Route>
        </Router>
     
      
        
   </div>
  );
}

export default App;
