const { Router } = require("express");
const { postActivity } = require("../controllers/activitiesController");

const activitiesRouter = Router();

//---------------------------POST-------------------------------
activitiesRouter.post("/", async(req, res)=>{
    try {
        let { name, difficulty, duration, season, country } = req.body;
        
        if(!name || !difficulty || !duration || !season || !country){
            throw Error ("Information missing");
        }
       
        await postActivity(name, difficulty, duration, season, country)
        res.status(200).send ("Activity created successfully")
    } 
    catch (error) {
        res.status(404).send ({error: error.message});
    }
})

module.exports = activitiesRouter;