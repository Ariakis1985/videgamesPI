const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    genresData: [],
    createdInDb: [],
    details: [],
    platforms: [],
    isLoading:false,
    currentPage: 1
};


function rootReducer( state = initialState, action ){
    //console.log(initialState)
    switch(action.type){

        case 'IS_LOADING':
            return{
                ...state,
                isLoading: action.payload,
            }

///////////////////////////////////////////////////////////////////////////////////////////

        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
                isLoading: false,
            }

///////////////////////////////////////////////////////////////////////////////////////////

        case "GET_INFO_DB":
            return{
                ...state,
                createdInDb: action.payload
            }
            
//////////////////////////////////////////////////////////////////////////////////////////

        case "FILTER_BY_ALPHA":
            
        let alpha = action.payload === "A-Z" ? state.videogames.sort(function(a, b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            return 0;
        }) : state.videogames.sort(function(a, b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1;
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1;
            }
            return 0;
        })
        return {
            ...state,
            videogames: alpha
        }

///////////////////////////////////////////////////////////////////////////////////////////////////

        case"FILTER_BY_RATING":
        const ratingInfo = action.payload === "asc" ? state.videogames.sort(function(a, b){
            if(a.rating > b.rating) return 1;
            if(a.rating < b.rating) return -1;
            return 0;
        }) : state.videogames.sort(function(a, b){
            if(a.rating > b.rating) return -1;
            if(a.rating < b.rating) return 1;
            return 0
        })
        return {
            ...state,
            videogames: ratingInfo
        } 
        
//////////////////////////////////////////////////////////////////////////////////////////


        case"GET_GENRES":
        return {
            ...state,
            genres: action.payload
        }

        case"FILTER_BY_GENRES":
            const genresInfo = state.allVideogames;
            const genresTotal = action.payload === "All Genres" ? genresInfo : genresInfo.filter(e => e.genres.includes(action.payload))
            if(genresTotal.length=== 0){
                alert("⚠ Genres Not found")
                return state;
            }else{
                return {
                    ...state,
                    videogames: genresTotal
                }
            }
            
            
            case"INFO_GENRES":
            console.log(action.payload)
        return{
            ...state,
            genresData: action.payload,
        }

///////////////////////////////////////////////////////////////////////////////////////////

        case"FILTER_CREATED":
        //console.log(action.payload)
        const api = state.allVideogames
        const dbCreated = state.createdInDb
        const filterCreated = action.payload === "From API" ? api : dbCreated.filter(e => e)
        console.log(filterCreated)
        if(filterCreated.length === 0){
            alert("⚠ No Videogame Created yet")
            return state;
        }else{
            return {
                ...state,
                videogames: filterCreated,
            }
        }
            
        
        

////////////////////////////////////////////////////////////////////////////////////////////////

        case"GET_NAME_VIDEOGAME":
        //console.log(action.payload)
        return{
            ...state,
            videogames: action.payload,
            isLoading: false
        }


        case"SET_CURRENT_PAGE":
        //console.log(action.payload)
        return{
            ...state,
            currentPage: action.payload
        }

        case"RESET_PAGE":
        return{
            ...state,
            currentPage: action.payload
        }

///////////////////////////////////////////////////////////////////////////////////////////////

       case"GET_VIDEOGAME_DETAIL":
       return{
           ...state,
           details: action.payload,
           isLoading: false
       }

////////////////////////////////////////////////////////////////////////////////////////////

      case"GET_PLATFORMS_GAME":
      return{
          ...state,
          platforms: action.payload
      }

/////////////////////////////////////////////////////////////////////////////////////////////      

       case"POST_NEW_VIDEOGAME":
       return{
        ...state,
    }

//////////////////////////////////////////////////////////////////////////////////////////

    default: return state
                
    } 
}

export default rootReducer;