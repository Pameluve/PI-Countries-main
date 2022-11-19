import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../redux/actions";

//---------------------------VALIDATOR-------------------------------
const validation = (input)=>{
    let errors = {};
    if(!input.name){
        errors.name = "Actividad requerida";
    }
   if(input.difficulty < 1 || input.difficulty > 5){
        errors.difficulty = "Dificultad válida requerida, número entre 1 y 5";
    }
    if(!input.duration){
        errors.duration = "Duración válida requerida";
    }
    if(!input.season){
        errors.season = "Temporada requerida";
    }
    if(!input.countries){
        errors.countries = "Al menos 1 país debe ser seleccionado";
    }
    return errors;
};

//---------------------------FORM-------------------------------
const CreateActivity = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state)=>state.countries);
    const [ errors, setErrors ] = useState({});
    const [ input, setInput ] = useState({
        name:"",
		difficulty: "",
		duration: "",
		season: "",
		country: []
    })

    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

//---------------------------HANDLERS------------------------------- 
//----------------------FORM SUBMIT HANDLER-------------------------
    const submitHandler = (event)=>{
        event.preventDefault();
        setErrors(validation(input))
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.country){
            return alert ("Por favor completa todos los campos")
        }
        dispatch(postActivity(input))
        alert("Actividad turística creada con éxito")
        setInput({
            name:"",
            difficulty:0,
            duration: "",
            season: "",
            country:[]
        })
        history.push("/activities")
    };

//----------------------INPUTS HANDLER-------------------------
    const inputHandler = (event)=>{
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
            [event.target.name]: event.target.value
        }));
    };

//-------------------------CHECK HANDLER-------------------------
    const checkHandler = (event)=>{
        if(event.target.checked){
            setInput({
                ...input,
                season: event.target.value
            })
        }
    }

//-------------------SELECT COUNTRY HANDLER----------------------
    const selectCountryHandler = (event)=>{
        setInput({
            ...input,
            country: [...input.country, event.target.value]
        });
    };

//---------------------------RENDER------------------------------- 
    return(
        <div>
            <Link to ="/activities">
                <button>Volver</button>
            </Link>
            <form onSubmit={(event)=>submitHandler(event)}>
                <h1>Crea una actividad turística</h1>
                <div>
                    <label>Actividad:</label>
                    <input type="text" value={input.name} name="name" onChange={(event)=>inputHandler(event)}/>
                    {errors.name && (<h5>{errors.name}</h5>)}
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input type="number" value={input.difficulty} name="difficulty" onChange={(event)=>inputHandler(event)}/>
                    {errors.difficulty && (<h5>{errors.difficulty}</h5>)}
                </div>
                <div>
                    <label>Duración:</label>
                    <input type="text" value={input.duration} name="duration" placeholder="00:00:00 hh:mm:ss" onChange={(event)=>inputHandler(event)}/>
                    {errors.duration && (<h5>{errors.duration}</h5>)}
                </div>
                <div>
                    <label>Temporada:</label>
                    <label><input type="checkbox" value="Autumn" name="Autumn" onChange={(event)=>checkHandler(event)}/>Otoño</label>
                    <label><input type="checkbox" value="Spring" name="Spring" onChange={(event)=>checkHandler(event)}/>Primavera</label>
                    <label><input type="checkbox" value="Summer" name="Summer" onChange={(event)=>checkHandler(event)}/>Verano</label>
                    <label><input type="checkbox" value="Winter" name="Winter" onChange={(event)=>checkHandler(event)}/>Invierno</label>
                    {errors.season && (<h5>{errors.season}</h5>)}
                </div>
                <div>
                    <label>Paises:</label>
                    <select onChange={(event)=>selectCountryHandler(event)}>
                        {countries.map((country)=>(
                            <option key={country.id} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                    {errors.countries && (<h5>{errors.countries}</h5>)}
                    <ul>{input.country.map(country=> country+", ")}</ul>
                </div>
                {/* <button type="submit">Crear Actividad</button> */}
                
                {Object.keys(errors)?
                <button type="submit" disable={true}>Crear Actividad</button>:
                <button type="submit">Crear Actividad</button>
                }
            </form>
        </div>
    )
};

export default CreateActivity;