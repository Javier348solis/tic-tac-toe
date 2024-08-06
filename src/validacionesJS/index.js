const cuadricula = document.getElementsByClassName("cuadritos");
const botonI = document.getElementById("botoncito");
const celdasTabla = Array.from(document.querySelectorAll(".cuadritos"));
const opciones = document.getElementById("mostrarOpciones")

const primerESP = document.getElementById("Espacio1")
const segundoESP = document.getElementById("Espacio1")
const tercerESP = document.getElementById("Espacio1")
const cuartoESP = document.getElementById("Espacio1")
const quintoESP = document.getElementById("Espacio1")
const sexoESP = document.getElementById("Espacio1")
const septimoESP = document.getElementById("Espacio1")
const octavoESP = document.getElementById("Espacio1")
const novenoESP = document.getElementById("Espacio1")


const arregloCasillas= [primerESP,segundoESP,tercerESP,cuartoESP,quintoESP,sexoESP,septimoESP,octavoESP,novenoESP]

let primerJUga = true;
let seguJugador = false;

const simbolosJugador = (e) =>{
    arregloCasillas.forEach((casilla)=>casilla.addEventListener("click",()=>{
        casilla.innerHTML="x"
    }))

    // const tablaJuga = e.target.innerHTML
    // if (!tablaJuga) {
    //     e.target.innerHTML = primerJUga ? "❌" : "⭕";
    //     primerJUga = !primerJUga;
    //     posiblidadesJuego();
    //     if (!seguJugador) funciComputadora();
    // }
    // opciones.classList.toggle("js", e.target.innerHTML === "❌");
    // opciones.classList.toggle("js2", e.target.innerHTML === "⭕");
};
const funciComputadora = () => {
    const casillasVacias = celdasTabla.filter((celda) => !celda.innerHTML);
    if (casillasVacias.length > 0) {
        const alea = Math.floor(Math.random() * casillasVacias.length);
        casillasVacias[alea].innerHTML = "⭕";
        primerJUga = true; 
        posiblidadesJuego();
    }     
};

const posiblidadesJuego = () => {
    const winningCombos = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6],
    ];
}
simbolosJugador()
