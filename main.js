// Obtener los elementos del DOM
const pokedexContainer = document.getElementById('pokedex');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const searchInput = document.getElementById('search');


// Función para mostrar los detalles del pokémon en el documento HTML
function showDetailsInHTML(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemon-details');
    pokemonDetailsContainer.innerHTML = `
      <h2>${pokemon.name}</h2>
      <p><strong>Tipo:</strong> ${pokemon.type}</p>
      <p><strong>Peso:</strong> ${pokemon.weight}</p>
      <p><strong>Movimientos:</strong></p>
      <ul>
        ${pokemon.moves.map(move => `<li>${move}</li>`).join('')}
      </ul>
    `;
}





// Obtener los datos del archivo JSON mediante una consulta GET al enlace proporcionado
fetch('https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json')
  .then((response) => response.json())
  .then((data) => {
    const pokemons = data.pokemons;
    showPokemon(pokemons);

    // Filtrar los pokémon por nombre al hacer clic en el botón de búsqueda
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
      showPokemon(filteredPokemons);
    });

    // Filtrar los pokémon por nombre al escribir en el campo de búsqueda y presionar Enter
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemons = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm)
        );
        showPokemon(filteredPokemons);
      }
    });

    // Mostrar detalles del pokémon al hacer clic en la tarjeta
    pokedexContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('card')) {
        const pokemonName = event.target.textContent.split(' - ')[0];
        const selectedPokemon = pokemons.find(pokemon => pokemon.name === pokemonName);
        showDetailsInHTML(selectedPokemon);
      }
    });
  })
  .catch((error) => console.error('Error fetching data:', error));
 