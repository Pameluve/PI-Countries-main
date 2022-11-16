import React from "react";
import { Link } from "react-router-dom";


const Card = ({flag, id, name, continent})=>{
    return(
        <div>
            <Link to ={`/countries/${id}`}>    
                <img src = {flag} alt="" width="350px" height="230px"/>
            </Link>
                <h2>{name}</h2>
                <h5>{continent}</h5>
        </div>
    )
};

export default Card;