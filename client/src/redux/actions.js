import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const PUT_ACTIVITY = "PUT_ACTIVITY";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_COUNTRY_NAME = "ORDER_BY_COUNTRY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const CLEAN_PAGE = "CLEAN_PAGE";

//---------------------------GET-------------------------------
export const getCountries = ()=>{
    return async (dispatch)=>{
        const json = await axios.get("http://localhost:3001/countries");
        return dispatch ({type: GET_COUNTRIES, payload: json.data});
    }
};

// export const getCountries = ()=>{
//     return(dispatch)=>{
//         axios.get("http://localhost:3001/countries")
//        .then((response)=>{
//         return dispatch ({type: GET_COUNTRIES, payload: response.data})})
//        .catch((error)=>console.log("todo salio mal", error));
//         }
//     };

export const getCountryByName = (name)=>{
    return async (dispatch)=>{
        try {
            const json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({type: GET_COUNTRY_BY_NAME, payload: json.data});
        } catch (error) {
            return alert("Country not found");
        }
    }
};

export const getDetailbyId = (id)=>{
    return async (dispatch)=>{
        try {
            const json = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch ({type: GET_DETAIL_BY_ID, payload: json.data});
        } catch (error) {
            console.log(error);
        }
    }
};

export const getActivities = ()=>{
    return async (dispatch)=>{
        const json = await axios.get("http://localhost:3001/activities");
        return dispatch ({type: GET_ACTIVITIES, payload: json.data});
    }
};

//---------------------------POST-------------------------------
export const postActivity = (payload)=> async (dispatch)=>{
    try {
        console.log(payload)
        await axios.post("http://localhost:3001/activities", payload);
        return dispatch ({type: POST_ACTIVITY});
    } catch (error) {
        return alert("not posted");
    }
};

//---------------------------PUT-------------------------------
export const putActivity = (id, payload)=> async(dispatch)=>{
    try {
        await axios.put(`http://localhost:3001/activities/${id}`, payload);
        return dispatch ({type: PUT_ACTIVITY});
    } catch (error) {
        console.log(error);
        return alert("Not updated");
    }
};

//---------------------------DELETE-------------------------------
export const deleteActivity = (id)=>{
    return async (dispatch)=>{
        try {
            await axios.delete(`http://localhost:3001/activities/${id}`);
            return dispatch ({type: DELETE_ACTIVITY});
        } catch (error) {
            console.log(error);
        }
    }
};

//---------------------------FILTERS-------------------------------
export const filterByContinent = (payload)=>{
    return {type: FILTER_BY_CONTINENT, payload:payload}
};

export const filterByActivity = (payload)=>{
    return {type: FILTER_BY_ACTIVITY, payload:payload}
};

//---------------------------ORDER-------------------------------
export const orderByCountryName = (payload)=>{
    return {type: ORDER_BY_COUNTRY_NAME, payload:payload}
};

export const orderByPopulation = (payload)=>{
    return {type: ORDER_BY_POPULATION, payload:payload}
};

export const cleanPage =()=>{
    return {type: CLEAN_PAGE}
}