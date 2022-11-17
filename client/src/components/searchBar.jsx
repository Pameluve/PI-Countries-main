import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../redux/actions";
import { Link } from "react-router-dom";

const SearchBar = ({setCurrentPage})=>{
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const inputHandler = (event)=>{
        event.preventDefault();
        setName(event.target.value)
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        dispatch(getCountryByName(name));
        setCurrentPage(1);
    }

    return(
        <div>
            <input type="text" placeholder="Nombre del Pais..." onChange={(event)=> inputHandler(event)}/>
            <button type="submit" onClick={(event)=> submitHandler(event)}>Buscar</button>
            <Link to ="/createActivity">
                <button>Crear Actividad Turistica</button>
            </Link>
        </div>
    )
};

export default SearchBar;