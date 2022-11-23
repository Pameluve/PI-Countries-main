import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities, filterByContinent, filterByActivity, orderByCountryName, orderByPopulation } from "../redux/actions";
import Card from "./card";
import Paginate from "./paginate";
import SearchBar from "./searchBar";
import './styles/home.css'

const Home = ()=>{
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries)
    const activities = useSelector((state)=> state.activities)
    const [order, setOrder] = useState("");

//---------------------------PAGINATE-------------------------------  
const [currentPage, setCurrentPage] = useState(1);
const [countriesPerPage] = useState(10);
const lastCountry = currentPage ===1? 9: currentPage * countriesPerPage   // 10
const firstCountry = currentPage ===1? 0: lastCountry - countriesPerPage  // 0
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

    const orderByNameHandler = (event)=>{
        event.preventDefault();
        dispatch(orderByCountryName(event.target.value));
        setCurrentPage(1);
        setOrder(event.target.value);
    }

    const orderByPopulationHandler = (event)=>{
        event.preventDefault();
        dispatch(orderByPopulation(event.target.value));
        setCurrentPage(1);
        setOrder(event.target.value);
    }

    const filterByContinentHandler = (event)=>{
        dispatch(filterByContinent(event.target.value));
        setCurrentPage(1);
    }

    const filterByActivityHandler = (event)=>{
        dispatch(filterByActivity(event.target.value));
        setCurrentPage(1);
    }

//---------------------------RENDER-------------------------------   
    return(
        <div className="backgroundHome">
            <SearchBar
                setCurrentPage={setCurrentPage}
            />
            <button className="btn" onClick={(event)=>{clickHandler(event)}}>Cargar todos los Paises</button>
            <div className="filtrosHome">
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
                    <option value="Africa">Africa</option>
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
                <div className="card-container-home">
                    {currentCountries?.map((country)=>{
                        return(
                            <>
                                <Card
                                    flag = {country.flag}
                                    id = {country.id}
                                    name = {country.name}
                                    continent = {country.continent}
                                    population = {country.population}
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