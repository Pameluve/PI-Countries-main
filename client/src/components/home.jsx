import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "../redux/actions";
import Card from "./card";
import Paginate from "./paginate";

const Home = ()=>{
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries)
    const activities = useSelector((state)=> state.activities)

//---------------------------PAGINATE-------------------------------  
const [currentPage, setCurrentPage] = useState(1);
const [countriesPerPage] = useState(10);
const lastCountry = currentPage * countriesPerPage   // 10
const firstCountry = lastCountry - countriesPerPage  // 0
const currentCountries = allCountries.slice(firstCountry, lastCountry)
const paginate = (pageNumber) => setCurrentPage(pageNumber);
//------------------------------------------------------------------

    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[dispatch])

//---------------------------HANDLERS-------------------------------
    const clickHandler = (event)=>{
        event.preventDefault();
        dispatch(getCountries());
    };

    const orderByNameHandler = ()=>{}
    const orderByPopulationHandler = ()=>{}
    const filterByContinentHandler = ()=>{}
    const filterByActivityHandler = ()=>{}


//---------------------------RENDER-------------------------------   
    return(
        <div>
            <button onClick={(event)=>{clickHandler(event)}}>Cargar todos los Paises</button>
            <h1>COUNTRIES - HOME</h1>

            <div>
                <h3>Ordenar/filtrar los paises:</h3>
                <select onChange={event=> orderByNameHandler(event)}>
                    <option value = "asc">A-Z</option>
                    <option value = "desc">Z-A</option>
                </select>
                <select onChange={event=> orderByPopulationHandler(event)}>
                    <option value = "PopulationASC">Mayor Población</option>
                    <option value = "PopulationDESC">Menor Población</option>
                </select>
                <select onChange={event=> filterByContinentHandler(event)}>
                    <option value= "Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Antarctic">Antartica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <select onChange={event=> filterByActivityHandler(event)}>
                    {activities.map((activity)=>(
                        <option value={activity.name}>{activity.name}</option>
                    ))}
                </select>
                <div>
                    <Paginate
                        countriesPerPage = { countriesPerPage }
                        allCountries = { allCountries.length }
                        paginate = { paginate }
                        currentPage = { currentPage }
                    />
                </div>
                <div>
                    {currentCountries?.map((country)=>{
                        return(
                            <>
                                <Card
                                    flag = {country.flag}
                                    id = {country.id}
                                    name = {country.name}
                                    continent = {country.continent}
                                />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default Home;