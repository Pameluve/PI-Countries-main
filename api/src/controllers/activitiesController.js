const { Country, Activity } = require("../db");


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

module.exports={
    postActivity
}