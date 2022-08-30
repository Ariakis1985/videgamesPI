import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, getAllVideogames, getGenres, orderAlphabetics, orderByRating, filterByGenres, filterCreated, getvideogamesFromDB, setCurrentPage, resetPage } from "../../action/index"
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import SearchBar from "../searchBar/SearchBar";
import "../../components/home/styles/home.css";



export default function Videogame(){

    const dispatch = useDispatch()
    const allVideogames = useSelector((state)=>state.videogames)
    const allGenres = useSelector((state => state.genres))
    const isLoading = useSelector((state => state.isLoading))
    //console.log(isLoading)
    const currentPage = useSelector((state => state.currentPage))
   
    const [ order, setOrder ] = useState("")
    const [ videogamePerPage, setVideogamePerPage ] = useState(15)
    const indexOfLastVideogame = currentPage * videogamePerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamePerPage
    const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) 
    
    
    useEffect(()=>{
        dispatch(setIsLoading());
        dispatch(getAllVideogames());
        dispatch(getGenres());
        dispatch(getvideogamesFromDB());
    },[dispatch])
    
    
    function paginado (pageNumber) {
        //console.log(pageNumber)
        dispatch(setCurrentPage(pageNumber))
    };


    function handleClick(e){
        e.preventDefault()
        dispatch(getAllVideogames())
        dispatch(resetPage())
    }


    function sortByAlpha(e){
        e.preventDefault()
        dispatch(orderAlphabetics(e.target.value))
        dispatch(resetPage())
        setOrder(`Ordenado ${e.target.value}`)
    }


    function sortBYRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        dispatch(resetPage())
        setOrder(`Ordenado ${e.target.value}`)
    }


    function handleFilterByGenres(e){
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        dispatch(resetPage())
        setOrder(`Ordenado ${e.target.value}`)
    }


    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        dispatch(resetPage())
        setOrder(`Ordenado ${e.target.value}`)
    }




    return(
        
        <div className="home_container">

        <div className="home_title">
            <h1>My Videogames World </h1>
        </div>

        <div>
            <Link to="/videogames"><button className="button_videogame">Create You Videogame</button></Link>
        </div>
       

        <div>
            <button className="button_refresh" onClick={ handleClick }>Refresh All Videogames</button>
        </div>

          


            <div className="home_controller">
                
                <select className="button_1" onChange={ e => sortByAlpha(e) }>
                     <option value=""hidden>Filter Alphabetics</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>


                <select className="button_2" onChange={ e => sortBYRating(e) }>
                    <option value=""hidden>Filter By Rating</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>


                <select className="button_3" onChange={ e => handleFilterByGenres(e) }>
                    <option value=""hidden>Filter By Genres</option>
                    <option value="All Genres">All Genres</option>
                    { allGenres.map((e, id) => (<option key={id} value={e.name}>{e.name}</option>))}
                </select>


                <select className="button_4" onChange={ (e) => handleFilterCreated(e) }>
                    <option value=""hidden>Filter Created</option>
                    <option value="Created">Created</option>
                    <option value="From API">From API</option>
                </select>
              
             
                <SearchBar/>
                

            </div>
            


            <div>
                <Paginado
                videogamePerPage={videogamePerPage}
                allVideoGames={allVideogames.length}
                paginado={paginado}
                />
            </div>
              

            { !isLoading && <div className="home_cards">
            {
                currentVideogame?.map((e, id)=>{
                    return(
                       <div key={id}>
                           <Link to={ "/videogame/" + e.id }>
                            <Card 
                            name={e.name} 
                            background_image={e.background_image} 
                            genres={e.genres} 
                            rating={e.rating} 
                            released={e.released}
                       />   
                           </Link>
                       </div>
                    )
                })
            }
            </div>
            }
            { isLoading && <div className="spinner"></div> }

            
        </div>

         
    )
}