import React, { useState } from "react";
import {Grid,Link, Dialog, DialogTitle, DialogContent, DialogActions,  TextField} from "@material-ui/core";
import Axios from "axios";



const qs = require('querystring');


function Login(){
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        email:"",
        password:""
    });
    const [isUserLogged, setIsUserLogged] = useState(false);
        

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }



    function handleChange(event){
        const {name,value} = event.target;
        setInfo(prevValue => {
            return {
                ...prevValue, 
                [name]: value
            };
        });
    }

    function handleClick(){
        setOpen(true);
    }

   

    function handleClose(event){
        Axios.post("http://localhost:5000/login", qs.stringify(info), config)
        .then(res => {
            if(res){
                setIsUserLogged(true);
            }
        })
        .catch(err => console.log(err));
        
        setInfo({email: "", password: ""});
        setOpen(false);
        
    }
    
    
    
    return (
        <div className="login">
        <div>
        <Grid container spacing={2} >
        <Grid item xs={12}>
            <Link className="have-account" onClick={handleClick} >Already Have an Account?</Link>
        </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
        <Grid container spacing={2} >
        <Grid item xs={12}>
            <TextField type="email" name="email" onChange={handleChange} value={info.email} fullWidth label="Email" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
            <TextField type="password" name="password" onChange={handleChange} value={info.password} fullWidth label="Password" variant="outlined" />
        </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
         <Link onClick={handleClose} color="primary" href={!isUserLogged ? "/mes" : "/"}>
            Login
        </Link>
        </DialogActions>
        </Dialog> 
        
        
        </div>
        
        </div>
        
    );
}



export default Login;


