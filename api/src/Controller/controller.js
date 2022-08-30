const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame, Genres } = require('../db');


const getApiInfo = async(req, res)=>{
    try{
        
        let apiUrl1 = await axios.get(`https://api.rawg.io/api/games?key=b125929e0cc341e78a758dc63bee3b2c`);
        let apiUrl2 = await axios.get(`https://api.rawg.io/api/games?key=b125929e0cc341e78a758dc63bee3b2c&page=2`);
        let apiUrl3 = await axios.get(`https://api.rawg.io/api/games?key=b125929e0cc341e78a758dc63bee3b2c&page=3`);
        let apiUrl4 = await axios.get(`https://api.rawg.io/api/games?key=b125929e0cc341e78a758dc63bee3b2c&page=4`);
        let apiUrl5 = await axios.get(`https://api.rawg.io/api/games?key=b125929e0cc341e78a758dc63bee3b2c&page=5`);
        
        let prom = await Promise.all([apiUrl1, apiUrl2, apiUrl3, apiUrl4, apiUrl5])
        apiUrl1 = prom[0].data.results;
        apiUrl2 = prom[1].data.results;
        apiUrl3 = prom[2].data.results;
        apiUrl4 = prom[3].data.results;
        apiUrl5 = prom[4].data.results;
        let apiInfo = apiUrl1.concat(apiUrl2).concat(apiUrl3).concat(apiUrl4).concat(apiUrl5);
        const gameInfo = apiInfo.map(e=>{
            return{
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                genres: e.genres.map(e=>e.name),
                rating: e.rating,
                released: e.released
            }
        })
        
        //console.log(gameInfo)
        return gameInfo;
    }catch(err){
        console.log(err)
    }
};



const getInfoDb = async()=>{
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
            return ({ id: r.dataValues.id, name: r.dataValues.name, rating: r.dataValues.rating, background_image: r?.dataValues?.background_image ?? 'https://cdn.pixabay.com/photo/2016/10/30/23/05/controller-1784573__340.png' , genres: genres})
        });
       
        return newRows;
}); 
};


const getGameFromApi = async(req, res)=>{
    const infoFromApi = await getApiInfo()
    res.status(200).send(infoFromApi)
    return infoFromApi;
};

const gameFromDb = async(req, res)=>{
    const gameCreate = await getInfoDb();
    //console.log(gameCreate)
    res.status(200).send(gameCreate)
    return gameCreate;
};




const getAllVideogames = async()=>{
    const apiGame = await getApiInfo();
    const dbGame = await getInfoDb();
    //console.log(apiGame);
    console.log(dbGame)
    const totalGame = apiGame.concat(dbGame);
   // console.log(totalGame)
    return totalGame;
};




async function showAllVideogames(req, res){
    const name = req.query.name;
    const info = await getAllVideogames();

    try{
        if(name){
            let gameInfo = await info.filter((e)=>e.name.toLowerCase().includes(name.toLowerCase()))
            gameInfo.length?
            res.status(200).send(gameInfo) : res.status(400).send({message: `⚠ Ops!!! name not found.Enter valido name`})
        }else res.status(200).send(info)

    }catch(err){
        console.log(err)
    }
};





module.exports = { showAllVideogames, getGameFromApi, gameFromDb }