const celdasTable = document.querySelectorAll(".cuadritos")
const texto = document.querySelector("#estadoT")
const boton = document.getElementById("botoncito")

    const posiblesGanar = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6],
    ]

let opcionesJuego = ["","","","","","","","",""]
let primerJugador = "❌"
let consola = false;

iniciarJuego();

function iniciarJuego() {
    celdasTable.forEach(cell => cell.addEventListener("click", validacionCeldas))
    boton.addEventListener("click", refrescarJuego)
    texto.textContent = `${primerJugador} turno`;
    consola = true;
}
function validacionCeldas() {
    const indexCeldas = this.getAttribute("cellIndex")
   if (opcionesJuego[indexCeldas] != "" || !consola) {
    
   }
   refrescar(this, indexCeldas);
   iniciarJuego();
   cambiarJugador();
}
function refrescar(celda, index) {
    opcionesJuego[index] = primerJugador;
    celda.textContent = primerJugador;
}
function cambiarJugador() {
    primerJugador =(primerJugador == "❌") ? "⭕" : "❌"
    texto.textContent = `${primerJugador} turno`;
    verGanador()
}
function refrescarJuego() {
    primerJugador = "❌"
    opcionesJuego = ["","","","","","","","",""];
    texto.textContent = `${primerJugador} turno`;
    celdasTable.forEach(cell => cell.textContent = "");
    consola = true;
}
let ganadorPartida = false;
function verGanador() {
    console.log("ENTRA");
    
    for (const combo of posiblesGanar) {
        let [a, b, c] = combo;
        if (celdasTable[a].innerHTML && celdasTable[a].innerHTML === celdasTable[b].innerHTML && 
            celdasTable[a].innerHTML === celdasTable[c].innerHTML) {
            ganadorPartida=true
            alert("¡Ganaste!");
        }
    }
}
function jugarAI(params) {
    let jugarCompu = Infinity;
    let jugarAI;

     for (let i = 0; i < 3; i++) {
     for (let h = 0; h < 3; h++) {
       if (celdasTable[i][h] = "") {
        celdasTable[i][h] = ai
        let resultado = minimax(celdasTable);
        celdasTable[i][h] = "";
        if (resultado > jugarCompu) {
            
        }
     }    
    }    
   }
  }




























// const cuadricula = document.getElementsByClassName("cuadritos");
// const botonI = document.getElementById("botoncito");
// const celdasTabla = Array.from(document.querySelectorAll(".cuadritos"));
// const opciones = document.getElementById("mostrarOpciones")

// const primerESP = document.getElementById("Espacio1")
// const segundoESP = document.getElementById("Espacio2")
// const tercerESP = document.getElementById("Espacio3")
// const cuartoESP = document.getElementById("Espacio4")
// const quintoESP = document.getElementById("Espacio5")
// const sexoESP = document.getElementById("Espacio6")
// const septimoESP = document.getElementById("Espacio7")
// const octavoESP = document.getElementById("Espacio8")
// const novenoESP = document.getElementById("Espacio9")


// const arregloCasillas= [primerESP,segundoESP,tercerESP,cuartoESP,quintoESP,sexoESP,septimoESP,octavoESP,novenoESP]

// let primerJUga = true;
// let seguJugador = false;

// const simbolosJugador = (e) =>{
//     arregloCasillas.forEach((casilla)=>casilla.addEventListener("click",()=>{
//         casilla.innerHTML="❌"
//     }))

//     // const tablaJuga = e.target.innerHTML
//     // if (!tablaJuga) {
//     //     e.target.innerHTML = primerJUga ? "❌" : "⭕";
//     //     primerJUga = !primerJUga;
//     //     posiblidadesJuego();
//     //     if (!seguJugador) funciComputadora();
//     // }
//     // opciones.classList.toggle("js", e.target.innerHTML === "❌");
//     // opciones.classList.toggle("js2", e.target.innerHTML === "⭕");
// };
// const funciComputadora = () => {
//     const casillasVacias = celdasTabla.filter((celda) => !celda.innerHTML);
//     if (casillasVacias.length > 0) {
//         const alea = Math.floor(Math.random() * casillasVacias.length);
//         casillasVacias[alea].innerHTML = "⭕";
//         primerJUga = true; 
//         posiblidadesJuego();
//     }     
// };




 // for (let i = 0; i < posiblesGanar.length; i++) {
    //    const condicionJuego = posiblesGanar[i];
    //    const celdaSA = opcionesJuego[condicionJuego[0]];
    //    const celdaSB = opcionesJuego[condicionJuego[1]];
    //    const celdaSC = opcionesJuego[condicionJuego[2]];
    //    if (celdaSA == "" || celdaSB == "" || celdaSC == "") {
    //         continue;
    //    }
    //    if (celdaSA == celdaSB && celdaSB == celdaSC) {
    //     ganadorPartida = true
    //     break;
    //    }
    //    if (ganadorPartida) {
    //     texto.textContent = `${primerJugador} Gano`;
    //     consola = false;
    //    }else if (!opcionesJuego.includes("")){
    //     texto.textContent = `Empate`;
    //     consola = false;
    //    }else{
    //     cambiarJugador();
    //    }
    // }