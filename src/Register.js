import React, { useState } from "react";
import {Grid,TextField, Button} from "@material-ui/core";
import Login from "./Login";
import Axios from "axios";
const qs = require('querystring');




function Register(){
    const [info, setInfo] = useState({
        fname:"",
        lname:"",
        email:"",
        password:"",
        cnfpassword:"",
    });

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

    const user = {
        fname: info.fname,
        lname: info.lname,
        email: info.email,
        password: info.password
    };

    function handleSubmit(){
        if(info.password === info.cnfpassword){
            Axios.post("http://localhost:5000/register", qs.stringify(user), config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        setInfo({email: "", password: "", fname: "", lname: "", cnfpassword: ""});
        }else{  
            alert("Password Not Matched");
        }   
    }



    return (
        <div className="register">
        <h1 className="register-heading">Create an account </h1>
        <Grid container spacing={2} >
        <Grid item xs={6}>
            <TextField required name="fname" onChange={handleChange} value={info.fname} fullWidth label="First Name" variant="outlined" />
        </Grid>
        <Grid item xs={6}>
            <TextField required name="lname" onChange={handleChange} value={info.lname} fullWidth label="Last Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
            <TextField required type="email" name="email" onChange={handleChange} value={info.email} fullWidth label="Email" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
            <TextField required type="password" name="password" onChange={handleChange} value={info.password} fullWidth label="Password" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
            <TextField required type="password" name="cnfpassword" onChange={handleChange} value={info.cnfpassword} fullWidth label="Confirm Password" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
        <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
        </Grid>
        <Grid item xs={12}>
           <Login />
        </Grid>
        </Grid>
        </div>
    );
}

export default Register;