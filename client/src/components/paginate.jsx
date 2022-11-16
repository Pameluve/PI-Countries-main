import React from "react";

const Paginate = ({countriesPerPage, allCountries, paginate, currentPage})=>{
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                { pageNumbers && pageNumbers.map(number=>(
                    <li>
                        {currentPage === number?
                        <button onClick = {()=> paginate(number)}>{number}</button>:
                        <button onClick = {()=> paginate(number)}>{number}</button>}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginate;