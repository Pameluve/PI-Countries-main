const { Country, Activity } = require("../db");

//------------GET ACTIVITIES-----------
const getActivities = async ()=>{
    const activities = await Activity.findAll({
        attributes:["id","name", "difficulty", "duration", "season"],
        // order:[["name", "ASC"]],
        order:[["id", "ASC"]],
        include:[{
            model: Country,
            attributes: ["name"],
            through: { attributes:[] }
        }]
    })

    const allActivities = activities.map(act=>{
        return{
            id: act.id,
            name: act.name,
            difficulty: act.difficulty,
            duration: act.duration,
            season: act.season,
            countries: act.countries.map(ele=>ele.name)
        }
    })
    return allActivities;
}

//------------GET ACTIVITY-----------
const getActivity = async (id)=>{
    const activity = await Activity.findOne({
        where:{ id:id },
        attributes:["id","name", "difficulty", "duration", "season"],
        include:[{
            model: Country,
            attributes: ["name"],
            through: { attributes:[] }
        }]
    })
    
    const theActivity = {
            id: activity.id,
            name: activity.name,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season,
            countries: activity.countries.map(ele=>ele.name)
    }
    return theActivity;
};

//----------------------POST ACTIVITIES-----------
const postActivity = async (name, difficulty, duration, season, country)=>{
    let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
    })
    let dbCountry = await Country.findAll({
        where: { name: country}
    });
    await newActivity.addCountry(dbCountry);
};

module.exports={
    getActivities,
    getActivity,
    postActivity
}