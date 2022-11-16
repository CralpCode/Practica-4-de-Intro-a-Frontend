const pokesearch = document.getElementById("pokesearch");
const pokepvalue = document.getElementById("pokenames");
const poke_ht= document.getElementById("display-atk");
const poke_wth= document.getElementById("display-weight");

pokesearch.addEventListener("input",()=>{
    var pokeName = pokesearch.value;
    pokeName = pokeName.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeName;
    fetchPokemon(url);
    
})


const fetchPokemon = (url) => {
    
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./assets/Not-pokemon.png");
            pokepvalue.textContent = "";
        }
        else{
            return res.json();
        }
        
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            pokepvalue.textContent = data.species.name;
            poke_ht.innerHTML += "<p style =>"+data.height+"</p>";
            poke_wth.innerHTML +="<p>"+data.weight+"</p>";
            pokeImage(pokeImg);
        }
    });

}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

