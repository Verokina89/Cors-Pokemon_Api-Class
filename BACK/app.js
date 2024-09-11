//crear servidor
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const PORT = 3002;

//Middleware cors para que todas nuestras rutas pasen por este crosOrigin y permitan la entrada
app.use(cors());

//acceder a la API
app.get('/pokemon/:pokemonName', async (req, res) => {        //ruta para obtener datos(pokemon)
    const pokemonName = req.params.pokemonName;       //Recoge ese parametro que devuelve pokemonName para trabajar con el luego
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;   //se añade lo que se guarda en la variable (pokemonName); es lo se pasara luego para dinamizar l pag web ir a la pag unica
    try {
        const response = await axios.get(url);       //peticion con la libreria axios ( Metemos url); la recoge y la obtiene de esa url con xios.Funciona como un fetch. 
        const {name, sprites: {front_default}, height, weight} = response.data;      //trae los datos solicitados solo las partes necesarias.

        res.json({name, sprites: {front_default}, height, weight}) ///nos traemos las variables destructuradas
    } catch (ERROR) {
        res.status(404).json({error: 'Pokemon no encontrado'}) //el error se pasa como objeto pq es un json

    }

})  //Se genera la asincronia; espera la respusta que da la API para poder adquirir datos y trabajarlo luego. Para el control de rrores se utiliza el TRY y el  CATCH

app.listen(PORT, () => {
    console.log(`express esta en el puerto http://localhost:${PORT}`);
    
}) 