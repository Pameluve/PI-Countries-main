import React from "react";
import { Link } from "react-router-dom";
import "./styles/landingPage.css"
import titulo from "../components/media/titulo.gif"

const LandingPage = ()=>{
    return(
        <div className="backgroundLanding">
            <div>
                <img src={titulo} alt=""/>
            </div>
            <Link to="/home">
                <button className="btn">Ingresar</button>
            </Link>
        </div>
    )
};

export default LandingPage;