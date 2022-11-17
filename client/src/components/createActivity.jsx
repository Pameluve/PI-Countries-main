import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, postActivity } from "../redux/actions";

//---------------------------VALIDATOR-------------------------------


//---------------------------FORM-------------------------------
const CreateActivity = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector((state)=>state.activities);
    const [ errors, setErrors ] = useState({});
    const [ input, setInput ] = useState({
        name:"",
		difficulty:0,
		duration: "",
		season: "",
		countries: []
    })

    useEffect(()=>{
        dispatch()
    }, [dispatch])

//---------------------------RENDER------------------------------- 
    return(
        <div>
            <Link>
                <button>Volver</button>
            </Link>
            <form onSubmit={(event)=>submitHandler(event)}>
                <h1>Crea una actividad turística</h1>
                <div>
                    <label>Actividad:</label>
                    <input type="text" value={input.name} name="name" onChange={(event)=>changeHandler(event)}/>
                    {errors.name && (<h5>{errors.name}</h5>)}
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input type="number" value={input.difficulty} name="difficulty" onChange={(event)=>changeHandler(event)}/>
                    {errors.difficulty && (<h5>{errors.difficulty}</h5>)}
                </div>
                <div>
                    <label>Duración:</label>
                    <input type="text" value={input.duration} name="duration" onChange={(event)=>changeHandler(event)}/>
                    {errors.duration && (<h5>{errors.duration}</h5>)}
                </div>
                <div>
                    <label>Temporada:</label>
                    <input type="text" value={input.season} name="season" onChange={(event)=>changeHandler(event)}/>
                    {errors.season && (<h5>{errors.season}</h5>)}
                </div>
                <div>
                    <label>Paises:</label>
                    <select onChange={(event)=>selectCountryHandler(event)}>
                        {countries.map((country)=>(
                            <option value={country.name}>{country.name}</option>
                        ))}
                    </select>
                    {errors.countries && (<h5>{errors.countries}</h5>)}

                    <ul>{input.countries.map(country=> country+", ")}</ul>
                </div>
            </form>
        </div>
    )
};

export default CreateActivity;