const { Videogame, Genres } = require("../db");
const axios = require('axios');
//const {API_KEY} = process.env;


async function postVideogame(req, res){
    try{
        let{
            name,
            description,
            released,
            rating,
            platforms,
            like,
            createInDB,
            genres
        } = req.body;
    
        let newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            like,
            createInDB,
        })
    
    
        let genresDb = await Genres.findAll({
            where: { name : genres }
        })
        newVideogame.addGenres(genresDb);
        res.send(" Videogame Created 😁 ")
    }catch(err){
        console.log(err)
    }
    
};



module.exports = { postVideogame }