import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteActivity } from "../redux/actions";
// import "./styles/card.css";


const ActivityCard = ({ id, name, difficulty, duration, season, countries})=>{
    const dispatch = useDispatch()

    const deleteActivityHandler = ()=>{}; 
    
    
    return(
        <div>
                <h1>{name}</h1>
                <h5>Dificultad: {difficulty}</h5>
                <h5>Duración: {duration}</h5>
                <h5>Temporada: {season}</h5>
                <h5>Paises: {countries+" "}</h5>
                <button>Editar</button>
                <button onChange={event=> deleteActivityHandler(event)}>Eliminar</button>
        </div>
    )
};

export default ActivityCard;