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

function galeria(pokemon) {
  const divPokemon = document.querySelector(".pokeImages");
  const frontDefault = pokemon.sprites.front_default;
  const backDefault = pokemon.sprites.back_default;
  const frontShiny = pokemon.sprites.front_shiny;
  const backShiny = pokemon.sprites.back_shiny;

  divPokemon.setAttribute("data-image-index", 0);
  divPokemon.setAttribute("data-front-default", frontDefault);
  divPokemon.setAttribute("data-back-default", backDefault);
  divPokemon.setAttribute("data-front-shiny", frontShiny);
  divPokemon.setAttribute("data-back-shiny", backShiny);
}

function trocarImagem(posicao, id) {
  debugger;
  const cardSelecionado = document.getElementById(id);
  const cardSelecionadoInicio = Number(
    cardSelecionado.getAttribute("data-image-index")
  );

  // Ele não está conseguindo selecionar a imagem aqui
  const images = [
    cardSelecionado.getAttribute("data-front-default"),
    cardSelecionado.getAttribute("data-back-default"),
    cardSelecionado.getAttribute("data-front-shiny"),
    cardSelecionado.getAttribute("data-back-shiny"),
  ];

  let proximo = cardSelecionadoInicio + posicao;

  if (proximo < 0) {
    proximo = images.length - 1;
  } else if (proximo >= images.length) {
    proximo = 0;
  }

  debugger;
  cardSelecionado.setAttribute("data-image-index", proximo);
  const pokemonImage = cardSelecionado.querySelector(".imgPokemon");
  pokemonImage.src = images[proximo];
  debugger;
}

capturarPokemon();
