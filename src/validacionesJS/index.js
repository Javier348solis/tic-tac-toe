const cuadricula = document.getElementsByClassName("cuadritos");
const botonI = document.getElementById("botoncito");
const celdasTabla = Array.from(document.querySelectorAll(".cuadritos"));
const opciones = document.getElementById("mostrarOpciones")


let primerJUga = true;
let seguJugador = false;

const simbolosJugador = (e) =>{
    const tablaJuga = e.target.innerHTML
    if (!tablaJuga) {
        e.target.innerHTML = primerJUga ? "❌" : "⭕";
        primerJUga = !primerJUga;
        posiblidadesJuego();
        if (!seguJugador) funciComputadora();
    }
    opciones.classList.toggle("js", e.target.innerHTML === "❌");
    opciones.classList.toggle("js2", e.target.innerHTML === "⭕");
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
