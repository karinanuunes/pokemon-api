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
  console.log(select.value);

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

  const imgPokemonClass = document.getElementsByClassName("imgPokemon");

  data.results.forEach(async (pokemon, index) => {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();

    const frontDefault = pokemonData.sprites.front_default;
    const backDefault = pokemonData.sprites.back_default;
    const frontShiny = pokemonData.sprites.front_shiny;
    const backShiny = pokemonData.sprites.back_shiny;

    const images = [];
    images.push(frontDefault, backDefault, frontShiny, backShiny);

    const imgPokemon = imgPokemonClass[index];
    imgPokemon.setAttribute("data-front-default", frontDefault);
    imgPokemon.setAttribute("data-back-default", backDefault);
    imgPokemon.setAttribute("data-front-shiny", frontShiny);
    imgPokemon.setAttribute("data-back-shiny", backShiny);
    // imgPokemon.src = backDefault; // Teste OK

    const pokemonClass = document.getElementsByClassName("pokemon")[index];
    const voltBotao = document.createElement("button");
    voltBotao.classList.add("voltBotao");
    voltBotao.textContent = "<";
    pokemonClass.appendChild(voltBotao);

    voltBotao.addEventListener("click", () => {
      imgPokemon.src = backDefault;
    });

    const proxBotao = document.createElement("button");
    proxBotao.classList.add("proxBotao");
    proxBotao.textContent = ">";
    pokemonClass.appendChild(proxBotao);

    proxBotao.addEventListener("click", () => {
      imgPokemon.src = frontShiny;
    });
  });
}

galeriaImagens();
