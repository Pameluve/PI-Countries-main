import React from "react";
// import "./styles/card.css";

const CountryActivityCard = ({ id, name, difficulty, duration, season})=>{

    return(
        <div>
                <h4>{name}</h4>
                <h5>Dificultad: {difficulty}</h5>
                <h5>Duración: {duration}</h5>
                <h5>Temporada: {season}</h5>
        </div>
    )
};

export default CountryActivityCard;