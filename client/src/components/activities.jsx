import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, getActivities } from "../redux/actions";
import ActivityCard from "./activityCard";

const Activities = ()=>{
    const dispatch = useDispatch();
    // const allCountries = useSelector((state)=> state.countries)
    const activities = useSelector((state)=> state.activities)

    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[dispatch])

    return(
        <div>
            <h1>Activities</h1>
            <Link to ="/home">
                <button>Volver</button>
            </Link>
            <Link to ="/createActivity">
                <button>Crear Actividad Turistica</button>
            </Link>
            <div className="card-container-home">
                {activities?.map((activity)=>{
                    return(
                         <>
                            <ActivityCard
                                id = {activity.id}
                                name = {activity.name}
                                difficulty = {activity.difficulty}
                                duration = {activity.duration}
                                season = {activity.season}
                                countries = {activity.countries}
                            />
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Activities;