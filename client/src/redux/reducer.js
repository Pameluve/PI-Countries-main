import { FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_BY_NAME, GET_DETAIL_BY_ID, ORDER_BY_COUNTRY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY } from "./actions";

const initialState ={
    countries:[],
    allCountries:[],
    detail:[],
    activities:[]
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
                countries:action.payload
            }
        case GET_DETAIL_BY_ID:
            return{
                ...state,
                detail: action.payload
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case POST_ACTIVITY:
            return{
                ...state,
            }
        case FILTER_BY_CONTINENT:
            const countriesInfo = state.allCountries
            const filterByContinent = countriesInfo.filter(country=> country.continent.includes(action.payload))
            return{
                ...state,
                countries: filterByContinent
            }
        case FILTER_BY_ACTIVITY:
            const allCountries = state.allCountries
            const filterByActivity = allCountries.filter(country=> country.activities.includes(action.payload))
            return{
                ...state,
                countries: filterByActivity
            }
        case ORDER_BY_COUNTRY_NAME:
            let sortedArray = action.payload === "asc"?
            state.countries.sort((a,b)=>{
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }) :
            state.countries.sort((a,b)=>{
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
            return{
                ...state,
                countries: sortedArray
            }
        case ORDER_BY_POPULATION:
            let populationdArray = action.payload === "PopulationASC"?
            state.countries.sort((a,b)=>{
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }) :
            state.countries.sort((a,b)=>{
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
            return{
                ...state,
                countries: populationdArray
            }
        default:
            return {...state};
    };
};

export default rootReducer;