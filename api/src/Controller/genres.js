const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame, Genres } = require('../db')


const genresGames = async()=>{

    try{
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresInfo = genresApi.data.results.map(e=>e.name)
              genresInfo.forEach(e=>{
                  if(e){
                      Genres.findOrCreate({
                          where: { name: e }
                      })
                  }
              });
        const allGenres = await Genres.findAll();
        //console.log(allGenres)
        return allGenres;
    }catch(err){
        console.log(err)
    }
    
};





async function showVideogamesByGenres(req, res){
    const genres = req.query.name
    const genresInfo = await genresGames();
    //console.log(genresInfo)
    
    try{
        if(genres){
            const totalGenres = await genresInfo.filter(e=>e.name.toLowerCase() === genres.toLowerCase());
            totalGenres?
            res.status(200).send(totalGenres) : res.status(404).send({menssage: " Not Videogames with that Genres"})
        }else res.status(200).send(genresInfo)
    }catch(err){
        console.log(err)
    }

   
};


async function getGenres(req, res){
    let genreInfo = [];
    try{
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(res=>res.data.results.map(e => genreInfo.push(e.name)))

        let totalGenres = [];
     
        genreInfo.map(e => {
        if(e !== undefined){
            let info = e.split(",")
            info.map(e => totalGenres.push(e))
        }
    })

    const information = [...new Set(totalGenres)] 
        //console.log(information)
        res.send(information)
        return information;

    }catch(err){
        console.log(err)
    }
}



module.exports = { showVideogamesByGenres, getGenres };