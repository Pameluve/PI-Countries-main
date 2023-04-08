const { Router } = require("express");
const { Activity, Country } = require("../db");
const { postActivity, getActivities, getActivity} = require("../controllers/activitiesController");
const activitiesRouter = Router();

//---------------------------GET ALL ACTIVITIES-------------------------------
activitiesRouter.get("/", async(req, res)=>{
        const allActivities = await getActivities();
    try {
        allActivities? res.status(200).send(allActivities): res.status(404).send("No Activities Found")
    } catch (error) {
        res.status(400).send ({error: error.message});
    }
});


//---------------------------GET ACTIVITY BY ID-------------------------------
activitiesRouter.get("/:id", async (req, res)=>{
    const { id } = req.params;
    const activityFinder = await getActivity(id);
    try {
        activityFinder? res.status(200).send(activityFinder): res.status(404).send("Activity not Found")        
    } catch (error) {
        res.status(404).send ({error: error.message});
    }
});


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
});


//---------------------------DELETE BY ID---------------------------
activitiesRouter.delete("/:id", async (req, res)=>{
    const { id } = req.params;
    try {
        const activityFinder = await Activity.findOne({
            where:{ id:id }
        });
        if(!activityFinder)res.status(404).send("Activity not found");
        else {
            await activityFinder.destroy();
            res.status(200).send("Activity deleted succesfully")
        }
    }
    catch (error) {
        res.status(404).send ({error: error.message});
    }
});

//---------------------------UPDATE BY ID---------------------------
activitiesRouter.put("/:id", async (req, res)=>{
    const { id } = req.params;
    let { name, difficulty, duration, season, country } = req.body;

    try {
        const activityFinder = await Activity.findOne({
            where:{ id:id }
        });
        if(!activityFinder)res.status(404).send("Activity not found");
        else {
            await activityFinder.update({name, difficulty, duration, season, country});
            let dbCountry = await Country.findAll({
                where: { name: country}
            });
            await activityFinder.addCountry(dbCountry)
            await activityFinder.save();
            res.status(200).send("Activity updated")
        }
    }
    catch (error) {
        res.status(404).send ({error: error.message});
    }
});

module.exports = activitiesRouter;
