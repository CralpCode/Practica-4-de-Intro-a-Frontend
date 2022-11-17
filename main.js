const pokesearch = document.getElementById("pokesearch");
const pokepvalue = document.getElementById("pokenames");
const poke_ht= document.getElementById("display-atk");
const poke_wth= document.getElementById("display-weight");
poke_ht.innerHTML += "<p id ='p-1'></p>";
poke_wth.innerHTML +="<p id ='p-2'></p>";

pokesearch.addEventListener("input",()=>{
    var pokeName = pokesearch.value;
    pokeName = pokeName.toLowerCase();
    document.getElementById("led-yellow").style.backgroundColor = "#ffee00";
    document.getElementById("led-yellow").style.border = "2px solid #eee34b";
    document.getElementById("circle-3").style.display = "block";
    document.getElementById("load").textContent = "Buscando..";
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeName;
    fetchPokemon(url);
    
})


const fetchPokemon = (url) => {
    
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./assets/Not-pokemon.png");
            document.getElementById("led-red").style.backgroundColor = "#e22e2b";
            document.getElementById("led-red").style.border = "2px solid #c00300";
            document.getElementById("circle-2").style.display = "block";
            document.getElementById("led-blue").style.backgroundColor = "#00bbff";
            document.getElementById("circle-1").style.display = "none";
            document.getElementById("led-green").style.backgroundColor = "#00ff2a";
            document.getElementById("led-green").style.border = "";
            document.getElementById("circle-3").style.display = "none";
            document.getElementById("btn-2").style.border= "3px solid #c00300";
            document.getElementById("btn-2").style.backgroundColor= "#e22e2b";
            document.getElementById("btn-1").style.border= "";
            document.getElementById("btn-1").style.backgroundColor= "#00bbff";
            pokepvalue.textContent = "";
        }
        else{
            return res.json();
        }
        
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            pokepvalue.textContent = data.name;
            document.getElementById("led-red").style.backgroundColor = "#c00300";
            document.getElementById("led-red").style.border = "";
            document.getElementById("circle-2").style.display = "none";
            document.getElementById("p-1").innerHTML = data.height + " M";
            document.getElementById("p-2").innerHTML = data.weight + " KG";
            document.getElementById("led-blue").style.backgroundColor = "#00bbff";
            document.getElementById("circle-1").style.display = "block";
            document.getElementById("led-green").style.backgroundColor = "#00ff2a";
            document.getElementById("led-green").style.border = "2px solid #1da033";
            document.getElementById("circle-3").style.display = "block";
            document.getElementById("led-yellow").style.backgroundColor = "#ffee00";
            document.getElementById("led-yellow").style.border = "";
            document.getElementById("circle-3").style.display = "none";
            document.getElementById("load").textContent = "Encontrado";
            document.getElementById("btn-1").style.border= "3px solid #00bbff";
            document.getElementById("btn-1").style.backgroundColor= "#1c85ac";
            document.getElementById("btn-2").style.border= "";
            document.getElementById("btn-2").style.backgroundColor= "#e22e2b";
            console.log(data.stats[0].stat.url);
            pokeImage(pokeImg);
        }
    });

}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

