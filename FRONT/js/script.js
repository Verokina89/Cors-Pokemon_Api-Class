//utilizaremos Fetch para traernos todos los datos creados en el back

function getPokemonInfo() {
    const pokemonNameInput = document.getElementById('pokemonName') //capturamos pr el id
    const pokemonInfo = document.getElementById('pokemonInfo')

    //Se pasan los pokemon tolowecase para evitar errores(todos estan en minuscula)
    const pokemonName = pokemonNameInput.value.toLocaleLowerCase();

    //Utilizamos Fetch para pasa la url cn el id pokemonName
    fetch (`http://localhost:3002/pokemon/${pokemonName}`)
        .then(response => response.json())   //la respuesta en json para pasar luego los datos
        .then(data => {  //Pasan los datos de la misma manera que el   destructuring del back.
            const {name, sprites: {front_default}, height, weight} = data;
            //template para mostrar en la web.
            pokemonInfo.innerHTML = `
            <h2>${name}</h2>
            <img src="${front_default}" alt="${name}"/>
            <p>${height}</p>
            <p>${weight}</p>
            `
        }) 
        .catch(error => pokemonInfo.innerHTML = `<p>⚠️Imposible acceder al Pokemón</p>`)
        
}