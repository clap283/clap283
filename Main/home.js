let offset = 0;
const limit = 10;

async function getListPokemon(limit, offset) {
    let listPokemon = [];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    data.results.forEach(item => {
        listPokemon.push(item.name);
    });
    return listPokemon;
}

async function getPokemonInfo(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return await response.json();
}

function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

async function getInformationHome(_id, newPokemonList) {
    const lst = document.getElementById(_id);
    
    for (let pokemonName of newPokemonList) {
        const pokemon = await getPokemonInfo(pokemonName);
        
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        
        itemElement.innerHTML = `
            <a href="pokemon.html?id=${pokemonName}">
                <img src="${pokemon.sprites.front_default}"   
                     data-back="${pokemon.sprites.back_default}"   
                     class="pokemon-img">  
            </a>
            <h3>${pokemon.name}</h3>  
        `;
        
        lst.appendChild(itemElement);
        preloadImages([pokemon.sprites.back_default]);
        
        const imgElement = itemElement.querySelector('.pokemon-img');
        imgElement.addEventListener('mouseenter', () => {
            imgElement.src = imgElement.dataset.back;
        });
        imgElement.addEventListener('mouseleave', () => {
            imgElement.src = pokemon.sprites.front_default;
        });
    }
}

document.getElementById("loadMoreBtn").addEventListener("click", async function() {
    let newPokemonList = await getListPokemon(limit, offset);
    getInformationHome("list", newPokemonList);
    offset += limit;
});

// Load Pokémon ban đầu
(async function init() {
    let initialPokemonList = await getListPokemon(limit, offset);
    getInformationHome("list", initialPokemonList);
    offset += limit;
})();