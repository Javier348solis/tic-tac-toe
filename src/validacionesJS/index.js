const celdasTable = document.querySelectorAll(".cuadritos");
const texto = document.querySelector("#estadoT");
const boton = document.getElementById("botoncito");
const contador = document.getElementById("mainConta"); 

const posiblesGanar = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6],
];

let opcionesJuego = ["", "", "", "", "", "", "", "", ""];
let primerJugador = "❌";
let consola = false;
let juegoTerminado = false;
let contadorX = 0;
let contadorO = 0;

iniciarJuego();

function actualizarInputContador() {
    
    const totalVictorias = contadorX + contadorO;
    contador.value = totalVictorias; 
}


function iniciarJuego() {
    celdasTable.forEach(cell => cell.addEventListener("click", validacionCeldas));
    boton.addEventListener("click", refrescarJuego);
    texto.textContent = `${primerJugador} turno`;
    consola = true;

    // Recuperar contadores del localStorage
    const storedX = localStorage.getItem('contadorX');
    const storedO = localStorage.getItem('contadorO');
    contadorX = storedX ? parseInt(storedX) : 0;
    contadorO = storedO ? parseInt(storedO) : 0;
    actualizarContador();
    actualizarInputContador(); 
}

function validacionCeldas() {
    const indexCeldas = this.getAttribute("cellIndex");
    
    if (opcionesJuego[indexCeldas] !== "" || !consola || juegoTerminado) {
        return;
    }
    
    refrescar(this, indexCeldas);
    
    if (!juegoTerminado) {
        cambiarJugador();
        juegoPc();
    }
}

function refrescar(celda, index) {
    opcionesJuego[index] = primerJugador;
    celda.textContent = primerJugador;
}

function cambiarJugador() {
    primerJugador = (primerJugador === "❌") ? "⭕" : "❌";
    texto.textContent = `${primerJugador} turno`;
    verGanador();
}

function refrescarJuego() {
    primerJugador = "❌";
    opcionesJuego = ["", "", "", "", "", "", "", "", ""];
    texto.textContent = `${primerJugador} turno`;
    celdasTable.forEach(cell => cell.textContent = "");
    consola = true;
    juegoTerminado = false;
}

function verGanador() {
    for (const combo of posiblesGanar) {
        let [a, b, c] = combo;
        if (celdasTable[a].innerHTML && celdasTable[a].innerHTML === celdasTable[b].innerHTML && 
            celdasTable[a].innerHTML === celdasTable[c].innerHTML) {
            juegoTerminado = true;
            if (celdasTable[a].innerHTML === "❌") {
                contadorX++;
                alert("¡X gana!");
            } else {
                contadorO++;
                alert("¡O gana!");
            }
            actualizarContador();
            actualizarInputContador(); 
            guardarContadores();
            return;
        }
    }
}

function actualizarContador() {
    contador.textContent = `X: ${contadorX} - O: ${contadorO}`;
}

function guardarContadores() {
    localStorage.setItem('contadorX', contadorX);
    localStorage.setItem('contadorO', contadorO);
 
}


function juegoPc() {
    if (!juegoTerminado) {
        setTimeout(() => {
            let arregloConvertido = Array.from(celdasTable);
            let arregloVacios = arregloConvertido.filter(celda => celda.innerHTML === "");
            if (arregloVacios.length === 0) return; 
            let numAleatorio = Math.floor(Math.random() * arregloVacios.length);
            let segundoJugador = primerJugador === "❌" ? "⭕" : "❌";
            refrescar(arregloVacios[numAleatorio], arregloVacios[numAleatorio].getAttribute("cellIndex"));
            cambiarJugador();
        }, 500);
    }
}
