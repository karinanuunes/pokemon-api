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

  const pokemonContainer = document.getElementById("pokemonContainer");
  pokemonContainer.innerHTML = "";
  await timeOut();
  const pokemonList = document.createElement("div");
  pokemonList.id = "pokemonList";
  pokemonContainer.appendChild(pokemonList);
  // console.log(select.value);

  fetchPokemonData(select.value);
}

async function showLoadingText(dots) {
  const loadingText = document.createElement("div");
  loadingText.textContent = `Carregando${".".repeat(dots)}`;
  document.getElementById("pokemonContainer").appendChild(loadingText);

  return new Promise((resolve) => {
    setTimeout(() => {
      loadingText.remove();
      resolve();
    }, 800);
  });
}

async function timeOut() {
  await showLoadingText(1);
  await showLoadingText(2);
  await showLoadingText(3);
}

document.addEventListener("DOMContentLoaded", function () {
  timeOut();
});
