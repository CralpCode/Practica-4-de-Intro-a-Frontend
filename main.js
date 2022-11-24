const pokesearch = document.getElementById("pokesearch");
const pokepvalue = document.getElementById("pokenames");
const poke_ht = document.getElementById("display-atk");
const poke_wth = document.getElementById("display-weight");
const poketype = document.getElementById("pokeType");
const stats = document.getElementById("primary-stats");
const pokemoves = document.getElementById("moves");
const reinicio = document.getElementById("mini-btn");

poke_ht.innerHTML += "<p id ='p-1'></p>";
poke_wth.innerHTML += "<p id ='p-2'></p>";

pokesearch.addEventListener("input", () => {
    var pokeName = pokesearch.value;
    pokeName = pokeName.toLowerCase();
    rst();
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeName;
    if (url != "https://pokeapi.co/api/v2/pokemon/") {
        fetchPokemon(url);
    }
});


const fetchPokemon = (url) => {

    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./assets/Not-pokemon.png");
            pokepvalue.textContent = "";
            ledsoff(false);
        }
        else {
            return res.json();
        }

    }).then((data) => {
        if (data) {

            if (data.name == undefined) {
                dataname = "";
            }
            else {
                dataname = data.name;
            }
            pokeInfotype(data.types);

            let pokeinformation = data.stats;

            let modifiedArr = pokeinformation.map(function (element) {
                valuebase = element.base_stat;
                valuename = element.stat.name;

                stats.innerHTML += `<div id = "valor-${data.id}">
                        <p id="valor" >${valuebase}</p>
                        <p>${valuename}</p>
                    </div>`
            });

            modifiedArr;

            pokepvalue.textContent = dataname;

            let pokeImg = data.sprites.front_default;

            document.getElementById("p-1").innerHTML = data.height + " M";
            document.getElementById("p-2").innerHTML = data.weight + " KG";
            document.getElementById("load").textContent = "Encontrado";

            pokeMoves(data.moves);
            ledsoff(true);
            ledson();
            pokeImage(pokeImg);
        }
    });

}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const ledson = () => {
    document.getElementById("led-green").style.backgroundColor = "#00ff2a";
    document.getElementById("circle-3").style.display = "none";
    document.getElementById("btn-1").style.backgroundColor = "#07bdff";
    document.getElementById("btn-2").style.backgroundColor = "#e22e2b";
}

const ledsoff = (valor) => {

    if (valor === true) {
        document.getElementById("led-red").style.backgroundColor = "#c00300";
        document.getElementById("led-yellow").style.backgroundColor = "#ffee00";
        document.getElementById("circle-2").style.display = "none";
        document.getElementById("led-blue").style.backgroundColor = "#00bbff";
        document.getElementById("circle-1").style.display = "block";
        document.getElementById("led-rl").style.backgroundColor = "#c4b924";
    }

    if (valor === false) {
        document.getElementById("led-red").style.backgroundColor = "#e22e2b";
        document.getElementById("circle-2").style.display = "block";
        document.getElementById("led-blue").style.backgroundColor = "#00bbff";
        document.getElementById("circle-1").style.display = "none";
        document.getElementById("led-green").style.backgroundColor = "#00ff2a";
        document.getElementById("circle-3").style.display = "none";
        document.getElementById("btn-2").style.backgroundColor = "#f1706e";
        document.getElementById("btn-1").style.backgroundColor = "#34829e";
    }

}

const pokeInfotype = (pokevalor) => {

    if (pokevalor == undefined) {
        pokevalor = "";
    }

    let alltypes = "";


    let pokearray = pokevalor.map(
        function (element) {
            alltypes = alltypes + element.type.name;
            if (pokevalor.length > 1 && element.slot != pokevalor.length) {
                alltypes = alltypes + ", ";
            }
        }
    )

    pokearray;

    poketype.textContent = "Tipo : " + alltypes;

}

const pokeMoves = (moves) =>{

    
    let alltypes = "";

    let pokearray = moves.map(
        function (element) {
            alltypes = alltypes + element.move.name;
            if (moves.length > 1 && element.slot != moves.length) {
                alltypes = alltypes + ", ";
            }
        }
    )

    pokearray;

    pokemoves.textContent = "Movimientos : " + alltypes;
}

const rst = (valor) => {

    if (valor == true) {
        pokesearch.value = "";
    }

    poketype.textContent = "";
    pokepvalue.textContent = "";
    stats.innerHTML = "";
    pokemoves.textContent = "";
    document.getElementById("p-1").innerHTML = " M";
    document.getElementById("p-2").innerHTML = " KG";
    document.getElementById("led-yellow").style.backgroundColor = "#ffee00";
    document.getElementById("circle-3").style.display = "block";
    pokeImage("./assets/Not-pokemon.png");
    document.getElementById("load").textContent = "Buscando..";
    ledsoff(false);
}

const arrowsClick = (direction) => {
    if (direction == 'left') {
        valor = pokesearch.value;
        if (Number(valor)>0) {
            pokesearch.value = Number(valor) - 1;
            document.getElementById("led-rl").style.backgroundColor = "#ffee00";
            rst();
            const url = "https://pokeapi.co/api/v2/pokemon/" + pokesearch.value ;
            if (url != "https://pokeapi.co/api/v2/pokemon/") {
                fetchPokemon(url);
             }
        } 
    } 
    if (direction == 'rigth') {
        valor = pokesearch.value;
        if (Number(valor)>=0) {
            pokesearch.value = Number(valor) + 1;
            rst();
            document.getElementById("led-rl").style.backgroundColor = "#ffee00";
            const url = "https://pokeapi.co/api/v2/pokemon/" + pokesearch.value ;
            if (url != "https://pokeapi.co/api/v2/pokemon/") {
                fetchPokemon(url);
             }
        } 
        else{
            pokesearch.value = 0;
            arrowsClick('rigth')
        }
    } 
}