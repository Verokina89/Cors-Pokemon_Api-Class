//crear servidor
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const PORT = 3001;

//Middleware cors para que todas nuestras rutas pasen por este crosOrigin y permitan la entrada
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Servidor funcionando');
// });

//acceder a la API
app.get('/pokemon/:pokemonName', async (req, res) => {        //ruta para obtener datos(pokemon)
    const pokemonName = req.params.pokemonName;       //Recoge ese parametro que devuelve pokemonName para trabajar con el luego
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;   //se añade lo que se guarda en la variable (pokemonName); es lo se pasara luego para dinamizar l pag web ir a la pag unica
    
    try {
        const response = await axios.get(url);       //peticion con la libreria axios ( Metemos url); la recoge y la obtiene de esa url con axios.Funciona como un fetch. 

        // Aquí registras la respuesta completa en la terminal
        console.log('Respuesta completa de la API:', response.data);

        //Ver ciertas partes, nombre o las estadísticas
        const {name, sprites: {front_default}, height, weight} = response.data;      //trae los datos solicitados solo las partes necesarias.
        
        // Registras los datos específicos que interesan
        console.log('Datos filtrados:', { name, front_default, height, weight });

        res.json({name, sprites: {front_default}, height, weight}); ///nos traemos las variables destructuradas
    } catch (ERROR) {
        console.log('Error al obtener datos del Pokémon:', ERROR);
        res.status(404).json({error: 'Pokemon no encontrado/Pokemon no existe'}); //el error se pasa como objeto pq es un json
    }

})  //Se genera la asincronia; espera la respusta que da la API para poder adquirir datos y trabajarlo luego. Para el control de rrores se utiliza el TRY y el  CATCH

app.listen(PORT, () => {
    console.log(`express esta en el puerto http://localhost:${PORT}/pokemon/pikachu`);
    
}) 