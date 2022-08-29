// console.log("Pokemons..................");

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const pokeCache = {};

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;

  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    // name: result.name,
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
    // apiURL: result.url,
  }));
  displayPokemon(pokemon);
};

fetchPokemon();

const displayPokemon = (pokemon) => {
  //   console.log(pokemon);

  const pokemonString = pokemon
    .map(
      (pokeman) => `
  
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src='${pokeman.image}' alt="A wild pokemon will appear soon...!" />
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>    

    </li>
  
  `
    )
    .join(" ");

  pokedex.innerHTML = pokemonString;
};

const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman;

    displayPopup(pokeman);
  }
  displayPopup(pokeCache[id]);
};

const displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(", ");

  const image = pokeman.sprites["front_default"];

  const htmlString = `
    
  <div class="popup">
    <button id="closeBtn" onclick="closePopup()">Close</button>

    <div class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src='${image}' alt="A wild pokemon will appear soon...!" />
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>   
        <p><small>Height: </small> ${pokeman.height} | <small>Weight: </small> ${pokeman.weight} | <small>Type: </small> ${type}  </p> 
    </div>

    </div>
  
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};
//Tried data fetching for types
/*
      //   pokemon["name"] = data.name;
        //   pokemon["id"] = data.id;
        //   pokemon["image"] = data.sprites["front_default"];

        //   pokemon["type"] = data.types.map((type) => type.type.name).join(",");

        //   data.types.forEach((type) => {
        //     pokemon["type"] = pokemon["type"] + ", " + type.type.name;
        //   });
*/
