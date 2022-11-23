import React from "react";
import { Link } from "react-router-dom";
import "./styles/card.css";


const Card = ({flag, id, name, continent, population})=>{
    return(
        <div className="container-card">
            <Link to ={`/countries/${id}`}>    
                <img src = {flag} alt="" width="350px" height="230px"/>
            </Link>
                <h2>{name}</h2>
                <h5>{continent}</h5>
                <h5>{population}</h5>
        </div>
    )
};

export default Card;