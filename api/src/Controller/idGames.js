const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame, Genres } = require('../db');


const getVideogamesById = async (id)=>{
    try{
        const idInfo = await axios.get(` https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const newObj = [{
            id: idInfo.data.id,
            name: idInfo.data.name, 
            background_image: idInfo.data.background_image,
            genres: idInfo.data.genres.map(e=>e.name),
            description: idInfo.data.description,
            released: idInfo.data.released,
            rating: idInfo.data.rating,
            platforms: idInfo.data.platforms.map(e=>e.platform.name)
        }]
        //console.log(newObj)
        return newObj;
    }catch(err){
        console.log(err)
    }
   
 };

 const getDbInfo = async()=>{
     //console.log('db call resuts')
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: [ "name" ],
            through: {
                attributes: [],
            }
        }
    }).then((rows) => {
        var newRows = rows.map(r => {
            var genres = r?.dataValues?.genres?.map(e => e.name);           
            return ({ id: r.dataValues.id, name: r.dataValues.name, platforms: r.dataValues.platforms, description: r.dataValues.description, released: r.dataValues.released, rating: r.dataValues.rating, background_image: r?.dataValues?.background_image ?? 'https://cdn.pixabay.com/photo/2016/10/30/23/05/controller-1784573__340.png' , genres: genres})
        });
       
        return newRows;
}); 
};

/* const getAllVideogamesId = async(id)=>{
    const apiId = await getVideogamesById(id);
    const gameDb = await getDbInfo(id);
    const totalId = apiId.concat(gameDb);
    console.log(apiId)
    return totalId;
}; */


 async function showVideogameById(req, res){
     const id = req.params.id;
     const idGame = await getVideogamesById(id);
     //console.log(idGame)
     const videogameDb = await getDbInfo(id)

     try{
         
        if(idGame){
            let idTotal = idGame.filter((e)=>e.id.toString() === id.toString());
            if(idTotal.length > 0)res.status(200).send(idTotal)
        }if(videogameDb){
            let idInfo = videogameDb.filter((e)=>e.id.toString() === id.toString());
            res.status(200).send(idInfo)
        }if(idGame || videogameDb === undefined){
            res.status(404).json({message: "Opss!!👀 No videogame with that ID"});
                
     }
    }catch(err){
         console.log(err)
     }
 }


module.exports = { showVideogameById }