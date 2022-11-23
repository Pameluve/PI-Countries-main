const { Country, Activity } = require("../db");

//------------GET ACTIVITIES-----------
const getActivities = async ()=>{
    const activities = await Activity.findAll({
        attributes:["id","name", "difficulty", "duration", "season"],
        order:[["name", "ASC"]],
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

//------------POST ACTIVITIES-----------
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

// //--------------------PUT ACTIVITIES----------------------
const putActivity = async (name, difficulty, duration, season, country)=>{
    let modifyActivity = await Activity.update({
        name,
        difficulty,
        duration,
        season
    });
    let dbCountry = await Country.findAll({
        where: { name: country}
    });
    await modifyActivity.addCountry(dbCountry);
    await modifyActivity.save()
};

module.exports={
    getActivities,
    postActivity
}