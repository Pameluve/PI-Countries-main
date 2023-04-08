import { CLEAN_PAGE, DELETE_ACTIVITY, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_BY_NAME, GET_DETAIL_BY_ID, ORDER_BY_COUNTRY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY, PUT_ACTIVITY } from "./actions";

const initialState ={
    countries:[],
    allCountries:[],
    detail:[],
    activities:[],
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
        case PUT_ACTIVITY:
            return{
                ...state,
                activities: action.payload,
            }   
        case DELETE_ACTIVITY:
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
            const filterByActivity = allCountries.filter(country=> country.activities.map(ele=>ele.name).includes(action.payload));
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
            let populationdArray = action.payload === "PopulationDESC"?
            state.countries.sort((a,b)=>{
                if(a.population > b.population) return 1;
                if(a.population < b.population) return -1;
                return 0;
            }) :
            state.countries.sort((a,b)=>{
                if(a.population > b.population) return -1;
                if(a.population < b.population) return 1;
                return 0;
            })
            return{
                ...state,
                countries: populationdArray
            }
        case CLEAN_PAGE:
            return{
               ...state,
               detail:[]
            }
        default:
            return {...state};
    };
};

export default rootReducer;