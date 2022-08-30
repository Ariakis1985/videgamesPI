import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewVideogame, getGenres, getPlatformsGame, infoGenres, setIsLoading } from "../../action/index";
import "../../components/gameCreator/styles/videogameCreator.css"


function validate(input){
    let err = {};

    if(!input.name.length){
        err.name = "⚠ Name is required"
    }
    else if(!input.released.length){
        err.released = "⚠ Released is required"
    }
    else if(input.rating <= 0 || input.rating > 5){
        err.rating = "⚠ Rating must be a number between 1 and 5"
    }
    else if(!input.platforms.length){
        err.platforms = "⚠ Select only the existing Platforms"
    }
    else if(!input.description.length){
        err.description = "⚠ Description is required"
    }
    else if(!input.genres.length){
        err.genres = "⚠ Select only the existing Genres"
    }
    return err;
};


export default function GameCreator(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genresTotal = useSelector((state)=>state.genresData)
    //console.log(genresTotal)
    const platformsComplete = useSelector((state)=>state.platforms)
    const isLoading = useSelector((state) => state.isLoading)
    
    const [ err, setErr ] = useState("");
    
    const [ input, setInput ] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: [],
    })

    useEffect(()=>{
        dispatch(getGenres());
        dispatch(getPlatformsGame());
        dispatch(infoGenres());
        dispatch(postNewVideogame())
        dispatch(setIsLoading())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErr(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect1(e){
        if(input.genres.includes(e.target.value)) return
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErr(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
    }

    function handleSelect(e){
        if(input.platforms.includes(e.target.value)) return
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErr(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
    }

    function handleDelete1(e){
        const newArray = input.genres.filter(platform => platform !== e)
        setInput({
            ...input,
            genres: newArray
        })
        setErr(validate({
            ...input,
            genres: newArray
        }))
    }

    function handleDelete(e){
        const newArray = input.platforms.filter(platform => platform !== e)
        setInput({
            ...input,
            platforms: newArray
        })
        setErr(validate({
            ...input,
            platforms: newArray
        }))
    }
    

    function handleSumbit(e){
        e.preventDefault();
        if(Object.keys(err).length || !input.name ){
            return alert("Must enter valid data")
        }else{
            dispatch(postNewVideogame(input))
            alert("Videogame Created !!")
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                platforms: [],
                genres: [],
            })
            
            navigate("/home")
        }
    }
    


    return(
       <div className="game_container">

       
        <div>
            <h1 className="game_creator">Create Your Videogame</h1>
        </div>


            <div>
                <Link to="/home">
                     <div>
                         <button className="button">Back To Home</button>
                     </div>
               </Link>
            </div>

            { isLoading && <div>  
           <form onSubmit={(e) => handleSumbit(e)}>
           
           
               <div>
                   <label className="game_creators">Videogame Name: </label>
                   <input className="game_input" 
                   type="text"
                   value={input.name}
                   name="name"
                   onChange={(e) => handleChange(e)}/>
                   {err.name && <p className="err_created">{err.name}</p>}
               </div>
               

               <div>
                   <label className="game_creators">Released: </label>
                   <input className="game_input" 
                   type="date"
                   value={input.released}
                   name="released"
                   onChange={(e) => handleChange(e)}/>
                   {err.released && <p className="err_created">{err.released}</p>}
               </div>

               <div>
                   <label className="game_creators">Rating: </label>
                   <input className="game_input" 
                   type="number"
                   value={input.rating}
                   name="rating"
                   onChange={(e) => handleChange(e)}/>
                   {err.rating && <p className="err_created">{err.rating}</p>}
               </div>

               <div>
                   <label className="game_creators">Platforms: </label>
                  <select className="game_input" 
                  onChange={(e) => handleSelect(e)}>
                      <option value=""hidden>
                          Select Platforms</option>
                          {platformsComplete.map((plat, id) => (<option key={id} value={plat}>{plat}</option>))}
                  </select>
                  {err.platforms && <p className="err_created">{err.platforms}</p>}
                  {input.platforms.map((el =>(
                       <div key={el}><p>{el}</p>
                       <button onClick={()=>handleDelete(el)}>X</button>
                       </div>
                   )))}


               </div>

               <div>
                   <label className="game_creators">Description: </label>
                   <input className="game_input" 
                   type="text"
                   value={input.description}
                   name="description"
                   onChange={(e) => handleChange(e)}/>
               </div>
               {err.description && <p className="err_created">{err.description}</p>}

               <div>
               <label className="game_creators">Genres: </label>
                   <select className="game_input" 
                   onChange={(e) => handleSelect1(e)}>
                       <option className="game_input" value=""hidden>
                       Select Genres</option>
                       {genresTotal.map((gen, id) => (<option key={id} value={gen}>{gen}</option>))}
                   </select>
                   {err.genres && <p className="err_created">{err.genres}</p>}

                   {input.genres.map((el =>(
                       <div  key={el}><p>{el}</p>
                       <button onClick={()=>handleDelete1(el)}>X</button>
                       </div>
                   )))}
               </div>  
              

               <div>
                   <button className="button_creator" type="sumbit" disabled={Object.keys(err).length} >
                       Create Videogame
                   </button>
               </div>
           </form>
       </div> }
    { !isLoading && <div className="spinner"></div> }

        </div>
    )

}