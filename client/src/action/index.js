import axios from "axios";



export function getAllVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type:'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function setIsLoading(payload){
    return ({
        type:'IS_LOADING',
        payload: true
    })
}

//////////////////////////////////////////////////////////////////////////////

export function getvideogamesFromDB(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/gameDb');
        return dispatch({
            type: 'GET_INFO_DB',
            payload: info.data
        })
    }
}

////////////////////////////////////////////////////////////////////////////////

export function orderAlphabetics(payload){
    return{
        type: "FILTER_BY_ALPHA",
        payload
    }
}


////////////////////////////////////////////////////////////////////////////////

export function orderByRating(payload){
    return{
        type: "FILTER_BY_RATING",
        payload
    }
}

//////////////////////////////////////////////////////////////////////////////////

export function getGenres(){
    return async function(dispatch){
        let genresTotal = await axios.get('http://localhost:3001/genres',{})
        return dispatch({
            type: "GET_GENRES",
            payload: genresTotal.data
        })
    }
}

export function filterByGenres(payload){
    return {
        type: "FILTER_BY_GENRES",
        payload
    }
}

export function infoGenres(){
    return async function(dispatch){
        let getInfo = await axios.get('http://localhost:3001/genresTotal')
        return dispatch({
            type: "INFO_GENRES",
            payload: getInfo.data
        })
    }
}

/////////////////////////////////////////////////////////////////////////////////////

export function filterCreated(payload){
    //console.log(payload)
    return {
        type: "FILTER_CREATED",
        payload
    }
}

/////////////////////////////////////////////////////////////////////////////////////

export function getNameVideogame(name){
    return async function(dispatch){
        try{
            const infoName = await axios.get(`http://localhost:3001/videogames?name=${name}`).then(
                result => {
                    if(!result.data || result.data.lenght === 0){
                         alert("Opsss!!👀 Not Found Videogame with that Name")
                    }else{
                        //console.log(result.data)
                        return dispatch({
                            type: "GET_NAME_VIDEOGAME",
                            payload: result.data
                        })
                    }
                }

            ).catch(
                err => {
                    if(err.response.status === 400)
                    {
                        alert("Opsss!!👀 Not Found Videogame with that Name")
                    }
                }
            )  
       
        }catch(err){
            console.log(err)
        }
        
    }
}


///////////////////////////////////////////////////////////////////////////////////////

export function setCurrentPage(number){
    return {
        type: "SET_CURRENT_PAGE",
        payload: number
    }
}

export function resetPage(){
    return{
        type: "RESET_PAGE",
        payload: 1
    }
}

///////////////////////////////////////////////////////////////////////////////////

export function getVideogameDetail(id){
    console.log(id)
    return async function(dispatch){
        try{
            const gameDetails = await axios.get(`http://localhost:3001/videogame/${id}`)
            if(!gameDetails){
                alert("Opsss!!👀 Not Found Videogame with that ID")
            }else{
                return dispatch({
                    type: "GET_VIDEOGAME_DETAIL",
                    payload: gameDetails.data
                })
            }
        }catch(err){
            console.log(err)
        }
    }
}



///////////////////////////////////////////////////////////////////////////////////////////

export function getPlatformsGame(){
    return async function(dispatch){
        try{
            const platGame = await axios.get('http://localhost:3001/platforms');
            return dispatch({
                type: "GET_PLATFORMS_GAME",
                payload: platGame.data
            })

        }catch(err){
            console.log(err)
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

export function postNewVideogame(payload){
    return async function(dispatch){
        try{
            let postGame = await axios.post("http://localhost:3001/videogame",payload)
            console.log(payload)
            return dispatch({
                type: "POST_NEW_VIDEOGAME",
                payload: postGame.data
            })  
        }catch(err){
            console.log(err)
        }
     }
}


