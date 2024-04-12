var MyEquipo = new Pila(); // Representa el equipo del jugador
var EquipoRocket = new Cola(); // Representa el equipo del Equipo Rocket

// Función principal que configura los eventos de los botones
function Show() {
    // Agrega un evento al botón "Buscar" para agregar un Pokémon al equipo del jugador
    document.getElementById("Buscar").addEventListener("click", function() {
        obtenerPokemonEquipo(document.getElementById("BuscarPokemon").value);
    });

    // Agrega un evento al botón "agregarRival" para agregar un Pokémon aleatorio al equipo del Equipo Rocket
    document.getElementById("agregarRival").addEventListener("click", obtenerPokemonAleatorio);
    
    // Agrega un evento al botón "pelea" para iniciar una pelea entre los equipos
    document.getElementById("pelea").addEventListener("click", pelea);
}

// URL base de la API de Pokémon
const URL = "https://pokeapi.co/api/v2/pokemon/";

// Método para buscar un Pokémon por su nombre en la API
async function buscaPokemon(nombrePokemon) {
    const response = await fetch(URL + nombrePokemon.toLowerCase());
    const informacion = await response.json();

    // Extrae la información relevante del Pokémon
    var pokemon = {
        nombre: informacion.name,
        imagen: informacion.sprites.front_default,
        danio: informacion.stats.find(stat => stat.stat.name === 'attack').base_stat
    };

    return pokemon;
}

// Método para agregar un Pokémon al equipo del jugador
async function obtenerPokemonEquipo(nombrePokemon) {
    if (MyEquipo.Size() < 5) {
        let pokemon = await buscaPokemon(nombrePokemon);
        MyEquipo.Stack(pokemon);
        mostrarPokemonEnMyEquipo(pokemon);
    } else {
        alert("No hagas trampa, solo se pueden tener 5 Pokémon en el equipo.");
    }
}

// Método para mostrar un Pokémon en la interfaz del equipo del jugador
function mostrarPokemonEnMyEquipo(pokemon) {
    var MisPokemones = document.getElementById("miEquipo");

    let template = document.getElementById('PokemonTemp');
    let pokemonDiv = document.importNode(template.content, true);

    pokemonDiv.querySelector('img').src = pokemon.imagen;
    pokemonDiv.querySelector('img').alt = pokemon.nombre;
    pokemonDiv.querySelector('.titulo').textContent = pokemon.nombre.toUpperCase();
    pokemonDiv.querySelector('.pie').textContent = "Daño:" + pokemon.danio;

    MisPokemones.appendChild(pokemonDiv);
}

// Método para agregar un Pokémon aleatorio al equipo del Equipo Rocket
async function obtenerPokemonAleatorio() {
    if (EquipoRocket.Size() < 5) {
        const response = await fetch(URL);
        const data = await response.json();
        const totalPokemon = data.count;

        const idAleatorio = Math.floor(Math.random() * totalPokemon) + 1;

        var pokemon = await buscaPokemon(idAleatorio.toString());
        EquipoRocket.Enqueue(pokemon);
        mostrarPokemonEnEquipoRocket(pokemon);
    } else {
        alert("Están haciendo trampa, quieren usar demasiados Pokémon.");
    }
}

// Método para mostrar un Pokémon en la interfaz del equipo del Equipo Rocket
function mostrarPokemonEnEquipoRocket(pokemon) {
    var PokemonesRival = document.getElementById("equipoRival");

    let template = document.getElementById('PokemonTemp');
    let pokemonDiv = document.importNode(template.content, true);

    pokemonDiv.querySelector('img').src = pokemon.imagen;
    pokemonDiv.querySelector('img').alt = pokemon.nombre;
    pokemonDiv.querySelector('.titulo').textContent = pokemon.nombre.toUpperCase();
    pokemonDiv.querySelector('.pie').textContent = "Daño:" + pokemon.danio;

    PokemonesRival.appendChild(pokemonDiv);
}

// Método para simular una pelea entre los equipos
function pelea() {
    var danioMyEquipo = 0;
    var danioEquipoRocket = 0;

    // Calcula el total de daño de los Pokémon en el equipo del jugador
    for (let i = 0; i < MyEquipo.Size(); i++) {
        danioMyEquipo += MyEquipo.Peek(i).danio;
    }

    // Calcula el total de daño de los Pokémon en el equipo del Equipo Rocket
    for (let i = 0; i < EquipoRocket.Size(); i++) {
        danioEquipoRocket += EquipoRocket.Peek(i).danio;
    }

    // Compara los totales de daño para determinar el resultado de la pelea
    if (danioMyEquipo > danioEquipoRocket) {
        alert("Mi equipo ganó la batalla.");
    } else if (danioMyEquipo < danioEquipoRocket) {
        alert("El Equipo Rocket ha ganado.");
    } else {
        alert("Empate.");
    }
}
