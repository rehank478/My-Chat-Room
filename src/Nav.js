import React from "react";

function Nav(props){
    return(
        <header className="navbar">
           <h1 className="title"> {props.title} </h1>
        </header>
    );
}

export default Nav;