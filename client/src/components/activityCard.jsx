import React from "react";
import { useDispatch } from "react-redux";
import { deleteActivity } from "../redux/actions";
// import "./styles/card.css";
import "./styles/activityCard.css"


const ActivityCard = ({ id, name, difficulty, duration, season, countries})=>{
    const dispatch = useDispatch()

    const deleteActivityHandler = (event)=>{
        dispatch(deleteActivity(id));
        window.location.reload();
    };
    
    return(
        <div className="activity-container-card">
                <h2>{name}</h2>
                <h5>Dificultad: {difficulty}</h5>
                <h5>Duración: {duration}</h5>
                <h5>Temporada: {season}</h5>
                <h5>Paises: {countries+" "}</h5>
                <button id="delAct" value="delete" onClick={()=>{deleteActivityHandler(id)}}>Eliminar</button>
        </div>
    )
};

export default ActivityCard;