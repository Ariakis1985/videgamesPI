import React from "react";
import "../../components/card/styles/card.css";;


export default function Card({name, background_image, genres, rating, released}){


    return(
        <div className="card">

       <div className="card_info">
            <h5 className="info"><span className="card_name">Name: </span>{ name }</h5>
            <h5 className="info"><span className="card_name">Genres: </span>{ genres && genres.length ? genres.map(e=>e + " - " ) : "Not Available"}</h5>
            <h5 className="info"><span className="card_name"></span>{ rating ? rating + ("⭐"): "Not Available"}</h5>
            <h5 className="info"><span className="card_name"></span>{released }</h5>
        </div>
           
            <img className="image" src= {background_image} alt="Img Not Found" />
        </div>
    )
}