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
  await timeOut();
  const pokemonList = document.createElement("div");
  pokemonList.id = "pokemonList";
  pai.appendChild(pokemonList);
  console.log(select.value);

  fetchPokemonData(select.value);
}

async function showLoadingText(dots) {
  const loadingText = document.createElement("div");
  loadingText.textContent = `Carregando${".".repeat(dots)}`;
  document.getElementById("pai").appendChild(loadingText);

  return new Promise((resolve) => {
    setTimeout(() => {
      loadingText.remove();
      resolve();
    }, 1000);
  });
}

async function timeOut() {
  await showLoadingText(1);
  await showLoadingText(2);
  await showLoadingText(3);
}

async function galeriaImagens() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await response.json();

  data.results.forEach(async (element) => {
    const resp = await fetch(element.url);
    const poke = await resp.json();

    const image = document.getElementById("image");
    const url = image.getAttribute("data-front-default");

    const images = [
      image.getAttribute("data-front-default"),
      image.getAttribute("data-back-default"),
      image.getAttribute("data-front-shiny"),
      image.getAttribute("data-back-shiny"),
    ];
  });
}
