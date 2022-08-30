import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameVideogame, resetPage, setIsLoading } from "../../action/index";
import "../../components/searchBar/styles/searchbar.css"


export default function SearchBar(){

    const dispatch = useDispatch()
    const [ name, setName ] = useState("")
   

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSumbit(e){
        e.preventDefault()
        dispatch(resetPage())
        dispatch(getNameVideogame(name))
        setName("")
    }



    return (
        <div className="searchbar" >
        
       <div>

            <input className="name_search"
            type= "text"
            placeholder= "Name videogame..."
            onChange= { (e) => handleInputChange(e) }/>

        <button 
        className="button_search" 
        type="sumbit"  
        onClick={(e) => handleSumbit(e) }>Search</button>
    

        </div>
        
      
        </div>
    )
}
