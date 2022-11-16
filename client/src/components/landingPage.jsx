import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ()=>{
    return(
        <div>
            <div>
                <h1>Landing Page</h1>
            </div>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
};

export default LandingPage;