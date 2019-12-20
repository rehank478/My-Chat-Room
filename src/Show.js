import React, {  useState, useEffect } from "react";
import Axios from "axios";


function Show(props){
    const [messages, setMessages] = useState([{}]);

        useEffect(() => {
            Axios.get("http://localhost:5000/show")
            .then(function(res){
                const myMessage= res.data;
                myMessage.forEach(element => {
                    setMessages((prevValue) => {
                        return[...prevValue, element];
                    });
                    
                });
                
                
            })
            .catch(err => console.log(err));
   
        }, []);
        
      
       
        
    
    return(
        <div>
        {messages.map(function(element){
            return (<div className="message" style={(element.userName === props.myName) ? {marginLeft: "60%"} : null}>
                <h4 >{(element.userName === props.myName) ? "You" : element.userName}</h4>
                <p style={{marginTop: "-15px"}}>{element.message}</p>

                
                </div>
                );
        })}
        </div>
    );
}



export default Show;
