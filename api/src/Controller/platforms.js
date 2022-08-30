const axios = require("axios");
const {API_KEY} = process.env;


const platformsGame = async(req, res)=>{
    let result = [];
    try{
        const platformsInfo = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(res=>res.data.results.map(e=>result.push(e.platforms.map(e=>e.platform.name))))
        
    let totalPlatforms = [];
     
    result.map(e => {
        if(e !== undefined){
            let info = e
            info.map(e => totalPlatforms.push(e))
        }
    })
    
    const total = [...new Set(totalPlatforms)] 
    //console.log(total) 
    res.send(total) 
    return total;
          
    }catch(err){
        console.log(err)
    }
}




module.exports = { platformsGame };
