const { Router } = require("express");
const { savedCountries, countriesList } = require("../controllers/countriesController");
const countriesRouter = Router();

//---------------------------GET BY NAME or GET ALL---------------------------
countriesRouter.get("/", async (req, res)=>{
    const { name } = req.query
    const allCountries = await savedCountries();

    try {
        if(name){
            let countryName = allCountries.filter(country=> country.name.toLowerCase().includes(name.toLowerCase()));
            if (countryName.length > 0) res.status(200).send(countryName);
            else{
                res.status(404).send ("Country not found")
            };
        }
        else{
            res.status(200).send(allCountries)
        }

    } catch (error) {
        res.status(400).send({error: error.message});
    };
});

//---------------------------GET BY ID---------------------------
countriesRouter.get("/:id", async (req, res)=>{
    const { id } = req.params;
    const allCountries = await savedCountries();

    try {
        if(id){
            let countryId = allCountries.find(country => country.id === id);
            countryId? res.status(200).send(countryId): res.status(404).send("ID not found") 
        }      
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = countriesRouter;