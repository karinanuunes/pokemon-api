async function capturarPokemon() {
  const pokemonResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit="
  );
  const pokemonInformacao = await pokemonResponse.json();
  const pokemonSelecionado = pokemonInformacao.results;

  pokemonSelecionado.forEach(async (pokemon) => {
    const pokemonDataResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonDataResponse.json();
    galeria(pokemonData);
  });
}

// acho que o erro acontece aqui
function galeria(pokemon) {
  const divPokemons = document.querySelectorAll(".imgPokemon");
  const frontDefault = pokemon.sprites.front_default;
  const backDefault = pokemon.sprites.back_default;
  const frontShiny = pokemon.sprites.front_shiny;
  const backShiny = pokemon.sprites.back_shiny;

  divPokemons.forEach((divPokemon) => {
    divPokemon.setAttribute("data-image-index", 0);
    divPokemon.setAttribute("data-front-default", frontDefault);
    divPokemon.setAttribute("data-back-default", backDefault);
    divPokemon.setAttribute("data-front-shiny", frontShiny);
    divPokemon.setAttribute("data-back-shiny", backShiny);
  });
}

function trocarImagem(posicao, id) {
  const cardSelecionado = document.getElementById(id);
  const cardSelecionadoInicio = Number(
    cardSelecionado.getAttribute("data-image-index")
  );

  const images = [
    cardSelecionado.getAttribute("data-front-default"),
    cardSelecionado.getAttribute("data-back-default"),
    cardSelecionado.getAttribute("data-front-shiny"),
    cardSelecionado.getAttribute("data-back-shiny"),
  ];

  let proxIndex = cardSelecionadoInicio + posicao;

  // não está entrando no IF
  if (proxIndex < 0) {
    proxIndex = images.length - 1;
  } else if (proxIndex >= images.length) {
    proxIndex = 0;
  }
  console.log(proxIndex);

  cardSelecionado.setAttribute("data-image-index", proxIndex); // está dando undefined
  const pokemonImage = cardSelecionado.querySelector(".imgPokemon");
  console.log(pokemonImage);
  pokemonImage.src = images[proxIndex]; // está dando null
}

capturarPokemon();
