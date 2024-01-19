async function buscarTipo() {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const data = await response.json();

  return data.results;
}

async function selecionarTipo() {
  const types = await buscarTipo();
  types.forEach((type) => {
    const select = document.getElementById("select");
    select.innerHTML += `
    <option value="${type.url}">${type.name}</option>
    `;
  });
}

selecionarTipo();

async function filtrarPokemons() {
  const select = document.getElementById("select");

  const pai = document.getElementById("pai");
  pai.innerHTML = "";
  const pokemonList = document.createElement("div");
  pokemonList.id = "pokemonList";
  pai.appendChild(pokemonList);
  console.log(select.value);

  fetchPokemonData(select.value);
}
