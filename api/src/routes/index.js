const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const { showAllVideogames, getGameFromApi, gameFromDb } = require('../Controller/controller');
const { showVideogamesByGenres } = require('../Controller/genres');
const { showVideogameById } = require('../Controller/idGames');
const { postVideogame } = require('../Controller/postGame');
const { platformsGame } = require('../Controller/platforms');
const { getGenres } = require('../Controller/genres')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/gameDb', gameFromDb)
router.get('/apiGames', getGameFromApi)
router.get('/videogames', showAllVideogames);
router.get('/platforms', platformsGame);
router.get('/genres', showVideogamesByGenres);
router.get('/videogame/:id', showVideogameById);
router.get('/genresTotal', getGenres)
router.post('/videogame', postVideogame)


module.exports = router;
