const axios = require("axios");
const { Country, Activity } = require("../db");


//------------OBTENER TODOS LOS COUNTRIES DE LA API------------

const getApiCountries = async ()=>{
    const apiInfo = await axios.get("https://restcountries.com/v3.1/all");
    const apiCountries = await apiInfo.data.map(element =>{
        return{
            id: element.cca3,
            name: element.name.common,
            flag: element.flags.png,
            continent: element.region,
            capital: element.capital? element.capital[0]: "Sin Capital",
            subregion: element.subregion? element.subregion: "Sin Subregion",
            area: element.area,
            population: element.population
        };
    });
    console.log(apiCountries.length)
    return apiCountries;
};

//------------GUARDARLOS EN LA DATA BASE Y MOSTRARLOS CON LAS ACTIVITIES------------

const savedCountries = async ()=>{
    const countries = await getApiCountries()
    countries.forEach(element=>{
        Country.findOrCreate({
            where:{
                id: element.id,
                name: element.name,
                flag: element.flag,
                continent: element.continent,
                capital: element.capital,
                subregion: element.subregion,
                area: element.area,
                population: element.population
            },
        });
    });
    console.log("countries saved")
    const allCountries = await Country.findAll({
        order:[["name", "ASC"]],
        include:[{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes:[] }
        }]
    });

    return allCountries;
};


//------------OBTENER LISTADO DE TODOS LOS COUNTRIES------------

const countriesList = async ()=>{
    const countries = await Country.findAll({
        attributes:["name"],
        order:[["name", "ASC"]]
    });
    return countries;
}

module.exports={
    savedCountries,
    countriesList
}