import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getDetailbyId } from "../redux/actions";

const Detail = (props)=>{
    const dispatch = useDispatch()
    const detail = useSelector((state)=> state.detail)
    // const activities = useSelector((state)=> state.activities)
    const countryId = props.match.params.id

    useEffect(()=>{
        dispatch(getDetailbyId(countryId))
        // dispatch(getActivities(countryId))
    }, [dispatch])

    return(
        <div>
            <div>
                <img src={detail.flag} alt={"img not found"}/>
                <h1>{detail.name}</h1>
                <h4>Continente: {detail.continent}</h4>
                <h4>Código del Pais: {detail.id}</h4>
                <h4>Capital: {detail.capital}</h4>
                <h4>Subregion: {detail.subregion}</h4>
                <h4>Área: {detail.area}km2</h4>
                <h4>Población: {detail.population}</h4>
                {}
                <h4>Actividades Turísticas: {detail.activities}</h4>
            </div>
            <Link to = "/home">
                <button>Volver</button>
            </Link>
        </div>
    )
};

export default Detail;