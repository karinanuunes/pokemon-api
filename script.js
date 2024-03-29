async function fetchPokemonData(url = "https://pokeapi.co/api/v2/type/1/") {
  const response = await fetch(url);
  const data = await response.json();
  // Como é essa função que exibe então ela utiliza o forEach para criar consumir a api
  if (data.pokemon.length == 0) {
    alert("Não existe pokemon desse tipo");
    return;
  }
  data.pokemon.forEach(async (pokemon) => {
    const pokemonResponse = await fetch(pokemon.pokemon.url);
    const pokemonData = await pokemonResponse.json();
    // Exibe os dados na tela
    informacoesPokemons(pokemonData);
  });
}

function informacoesPokemons(pokemonData) {
  const pokemonList = document.getElementById("pokemonList");
  const pokemon = document.createElement("div");
  pokemon.classList.add("pokemon");
  pokemon.classList.add(pokemonData.name);
  // pokemon.id = pokemonData.id;

  const types = pokemonData.types.map((type) => type.type.name);
  const abilities = pokemonData.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  pokemon.innerHTML = `
  <div class="pokeTitle">
  <h2>${pokemonData.name}</h2>
  <span>ID: ${pokemonData.id}</span>
  </div>
  <div class="pokeImages">
  <button id="voltBotao" onclick="trocarImagem(-1, ${
    pokemonData.id
  })"><</button>
  <img src="${pokemonData.sprites.front_default}" alt="${
    pokemonData.name
  }" class="imgPokemon"  id=${pokemonData.id}>
  <button id="proxBotao" onclick="trocarImagem(1, ${pokemonData.id})">></button>
  </div>
  <div class="pokeInfo">
  <p><b>Type:</b> ${types.join(", ")}</p>
  <p><b>Ability:</b> ${abilities}</p>
  </div>
  `;

  pokemonList.appendChild(pokemon);
}

fetchPokemonData();
