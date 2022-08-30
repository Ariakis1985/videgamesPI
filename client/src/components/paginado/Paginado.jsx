import React, { useState } from "react";
import "../paginado/styles/paginado.css"


export default function Paginado({ videogamePerPage, allVideoGames, paginado }){

    //const [ number, setNumber ] = useState([])


    const pageNumber = [];
    //console.log(pageNumber)

    for ( let i=1; i <= Math.ceil(allVideoGames/videogamePerPage); i++){
        pageNumber.push(i)
    }
    
    return(

        <div>
            <ul className="paginado">
                {   
                    pageNumber && pageNumber.map((number, id) => (
                        <li className="number" key={id}>
                            <a className="paginado_number" onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}