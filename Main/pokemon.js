async function displayPokemonInfo() {  
    const urlParams = new URLSearchParams(window.location.search);  
    const pokemonName = urlParams.get('id');  

    if (pokemonName) {  
        const pokemon = await getPokemonInfo(pokemonName);  
        document.getElementById('pokemonName').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);  
        document.getElementById('pokemonImage').src = pokemon.sprites.front_default;  
        document.getElementById('pokemonHeight').textContent = (pokemon.height / 10).toFixed(1);  
        document.getElementById('pokemonWeight').textContent = (pokemon.weight / 10).toFixed(1);  
        document.getElementById('pokemonBaseExp').textContent = pokemon.base_experience;  
        document.getElementById('pokemonId').textContent = pokemon.id;  

        const abilities = pokemon.abilities.map(ability => {  
            const abilityName = ability.ability.name;  
            const abilityElement = document.createElement('div');  
            abilityElement.textContent = abilityName;  
            abilityElement.classList.add('move');  
            abilityElement.onclick = () => showAbilityInfo(abilityName); // Attach event listener  
            return abilityElement;  
        });  

        abilities.forEach(abilityElement => {  
            document.getElementById('pokemonAbilities').appendChild(abilityElement);  
        });  

        const movesContainer = document.getElementById('pokemonMoves');  
        movesContainer.innerHTML = '';  
        const maxMoves = 5;  
        const movesToShow = pokemon.moves.slice(0, maxMoves);  
        movesToShow.forEach(move => {  
            const moveElement = document.createElement('div');  
            moveElement.classList.add('move');  
            moveElement.textContent = move.move.name;  
            movesContainer.appendChild(moveElement);  
        });  

        const types = pokemon.types.map(type => {  
            const typeImg = document.createElement('img');  
            typeImg.src = `path/to/type/icons/${type.type.name}.png`; // Replace with actual icon path  
            return typeImg;  
        });  

        types.forEach(typeImg => {  
            document.getElementById('pokemonTypes').appendChild(typeImg);  
        });  
    }  
}  

function showAbilityInfo(abilityName) {  
    // Fetch ability info and video link, then display in modal  
    const abilityDescription = 'Ability description will go here.'; // Replace with actual description fetching logic  
    const videoLink = 'https://www.youtube.com/embed/XXXXXXXXXXX'; // Replace with actual video link fetching logic  

    document.getElementById('abilityName').textContent = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);  
    document.getElementById('abilityDescription').textContent = abilityDescription;  
    document.getElementById('abilityVideo').src = videoLink;  

    const modal = document.getElementById('abilityModal');  
    modal.style.display = "block";  

    document.getElementsByClassName("close")[0].onclick = function() {  
        modal.style.display = "none";  
    }  
}  

// Close modal when clicking outside of it  
window.onclick = function(event) {  
    const modal = document.getElementById('abilityModal');  
    if (event.target === modal) {  
        modal.style.display = "none";  
    }  
}