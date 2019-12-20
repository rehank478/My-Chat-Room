import React, { useState } from "react";
import Nav from "./Nav";
import {Grid, TextField, Button, Link} from "@material-ui/core";
import Axios from "axios";
import Show from "./Show";
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const qs = require('querystring');




function Messages(){
    var userName = "";
    Axios.get("http://localhost:5000/user")
    .then(res => {
        userName = res.data; 
        setX(userName);
    })
    .catch(err => console.log(err)
    );
    const [message, setMessage] = useState("");
    const [x, setX] = useState(""); 

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
    

    function handleChange(event){
        setMessage(event.target.value);
    }

    

    function handleSubmit(){
        const data = {
            userName: userName,
            message: message
        };
        Axios.post("http://localhost:5000/message", qs.stringify(data), config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        setMessage("");
    }
    
    

    return(
        <div>
            <header>
            <Grid container spacing={2}>
            <Grid item xs={11}>
            <Nav title={"Hey, " + x} />
            </Grid>
            <Grid item xs={1}>
            <Link href="/">
            <Button className="logout" type="submit" variant="contained" color="secondary"><ExitToAppIcon /></Button>
            </Link>
            </Grid>
            </Grid>
            </header>
            <Show myName={x} />
            <footer>
            <Grid container spacing={2}>
            <Grid item xs={10}>
            <TextField name="message" value={message} onChange={handleChange} fullWidth label="Type a message" variant="outlined" />
            </Grid>
            <Grid item xs={2}>
            <Link href="/mes">
            <Button className="send" onClick={handleSubmit} type="submit" variant="contained" color="primary"><SendIcon /></Button>
            </Link>
            </Grid>
            
            </Grid>
            </footer>
        </div>
    );
}

export default Messages; 