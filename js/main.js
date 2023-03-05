const cards = document.querySelector(".cards");
const found = document.querySelector(".found");

let datos = [];
let datosAux = [];

//Events
document.getElementById("submit")
    .addEventListener("click", function(event) {
        charactersNotFound("none");
        compararCharacter();
        document.getElementById("name").value= ""; //limpiar campo de texto
        event.preventDefault();
    });
//
function getCharacters() {
    fetch("https://rickandmortyapi.com/api/character")
        .then(res => res.json())
        .then(characters => {
            datos = characters.results;
            renderCharacters(datos);
        })
        .catch(error => console.log("Error al cargar los datos", error));
}

getCharacters();

function renderCharacters(characters) {
    cards.innerHTML = characters.map(createHTMLCharacter).join('');
}

function createHTMLCharacter(character) {
    return `
        <div class = "card" ">
            <div class="img-card">
                <img src="${character.image}" alt="">
            </div>
            <div class="name-card">${character.name}</div>
            <div class="specie-card">${character.species}</div>
            <button class="button-eliminar" onclick="deleteCharacter(${character.id})">Eliminar</button>
        </div>       
    `;
}

function compararCharacter() {
    let characterInsert = document.getElementById("name").value;

    if (characterInsert === "") {
        getCharacters();
    } else {
        datosAux = datos.filter(character => filterCharacters(character, characterInsert));
        let characterHTML = datosAux
            .map(createHTMLCharacter) // esto es igual a character => createHTMLCharacter(character)
            .join('');  //convertir a string

        cards.innerHTML = characterHTML;
        if (characterHTML === '') {
            charactersNotFound("block");
        }
    }
}

function charactersNotFound(state, message = "Character not found") {
    document.getElementById('main-found').style.display = state;
    found.innerHTML = message;
}

function filterCharacters(character, characterInsert) {
    return character.name.toLowerCase().includes(characterInsert.toLowerCase())
}

function deleteCharacter(id) {
    let characters = datosAux.length > 0 ? datosAux : datos;  
    let index = characters.findIndex(character => character.id === id);
    if (index !== -1) characters.splice(index, 1);

    if (characters.length == 0) charactersNotFound("block", "No characters to display");

    cards.innerHTML= characters
    .map(createHTMLCharacter) //character => createHTMLCharacter(character)
    .join('');
        
}

