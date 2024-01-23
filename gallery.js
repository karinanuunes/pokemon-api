async function galeriaImagens() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=");
  const data = await response.json();

  const imgPokemonClass = document.getElementsByClassName("imgPokemon");

  data.results.forEach(async (pokemon, index) => {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();

    const frontDefault = pokemonData.sprites.front_default;
    const backDefault = pokemonData.sprites.back_default;
    const frontShiny = pokemonData.sprites.front_shiny;
    const backShiny = pokemonData.sprites.back_shiny;

    const images = [frontDefault, backDefault, frontShiny, backShiny];

    const imgPokemon = imgPokemonClass[index];
    imgPokemon.setAttribute("data-front-default", frontDefault);
    imgPokemon.setAttribute("data-back-default", backDefault);
    imgPokemon.setAttribute("data-front-shiny", frontShiny);
    imgPokemon.setAttribute("data-back-shiny", backShiny);

    const voltBotao = document.getElementById(`voltBotao`);
    voltBotao.addEventListener("click", () => {
      imgPokemon.src = images[index - 1];
    });

    const proxBotao = document.getElementById(`proxBotao`);
    proxBotao.addEventListener("click", () => {
      imgPokemon.src = images[index + 1];
    });
  });
}

galeriaImagens();
