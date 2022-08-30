import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogameDetail, setIsLoading } from "../../action/index";
import "../../components/details/styles/details.css"


export default function Details(){

    const dispatch = useDispatch();
    const params = useParams();

    const isLoading = useSelector((state) => state.isLoading)
    console.log(isLoading)

    useEffect(()=>{
        dispatch(getVideogameDetail(params.id))
        dispatch(setIsLoading())
    }, [dispatch, params.id])

    const myGame = useSelector((state)=>state.details)

    return(

       <div className="details_container">
       { !isLoading && <div>
            {
                myGame.length > 0 ? 

                <div>

                     <div className="games">
                        <img className="details_image" src={myGame[0].background_image} alt="Image Not Found" width="250px" height="250px"/>
                    </div>
                   
                   <div className="details">
                    <h1><span className="details_info">Videogame: </span>{myGame[0].name}</h1>
                    <h2><span className="details_info">Genres: </span>{myGame[0].genres.map(e=>e + " _ ")}</h2>
                    <h2><span className="details_info">Released: </span>{myGame[0].released}</h2>
                    <h2><span className="details_info">Rating: </span>{myGame[0].rating}</h2>
                    <h2><span className="details_info">Platforms: </span>{myGame[0].platforms.map(e=>e + " _ ")}</h2>
                    <h3><span className="details_info">Description: </span>{myGame[0].description}</h3>
                   </div>
                   
                </div> : <a>Loading...</a>
                   
            }

            </div>
       }
       { isLoading && <div className="spinner"></div> }

            <Link to="/home">
                <button className="details_button">Back to Home</button>
            </Link>
        </div>
      
    )
}
