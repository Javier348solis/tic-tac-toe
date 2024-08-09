//Se llaman las variables, ya sea con el ID, class, etc. Esto para darle la funcion a cada una de las celdas, botones, contador, etc.
const celdasTable = document.querySelectorAll(".cuadritos");
const texto = document.querySelector("#estadoT");
const boton = document.getElementById("botoncito");
const contador = document.getElementById("mainConta"); 
const contadorCirculo = document.getElementById("contaO")

//Se hace una constante donde se define cada uno de los espacios de las casillas ganadoras, filas verticales, horizontales o posibilidades ganadoras horizontales 
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
//Este es un arreglo que contiene cada espacio de cada uno de los espacios de la tabla de juego. Tambien se coloca la variable que contiene al primer jugador, en este caso seria primer jugador.
let opcionesJuego = ["", "", "", "", "", "", "", "", ""];
let primerJugador = "❌";
let consola = false;
let juegoTerminado = false;
let contadorX = 0;
let contadorO = 0;

iniciarJuego();
//La funcion para inciaar el juego, darle la validacion a cada una de las casillas con el onclick para que cada una sea marcada de manera correcta, se le hace un foreach para que itere cada una de las celdas.
function iniciarJuego() {
    celdasTable.forEach(cell => cell.addEventListener("click", validacionCeldas));
    boton.addEventListener("click", refrescarJuego);
    texto.textContent = `${primerJugador} turno`;
    consola = true;

//Se recupera los datos del localstoragfe para los contadores de x y o
    const contadoresX = localStorage.getItem('contadorX') || 0;
    const contadoresO = localStorage.getItem('contadorO')|| 0;
    contadorX = contadoresX ? parseInt(contadoresX) : 0;
    contadorO = contadoresO ? parseInt(contadoresO) : 0;
    actualizarContador();
}
//Se hace la validacion de celdas vaciaas, si estan vacias que sean marcadas, si no, que no haya doble marcacion. Tambien que cumpla el cambio de jugador.
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
//Se utiliza para hacer el cambio de roles en este caso de x y o, cuando una ya marca su casilla correspondiente, que se cumpla el cambio hacia el otro jugador, en este caso seria computadora o humano.
function cambiarJugador() {
    primerJugador = (primerJugador === "❌") ? "⭕" : "❌";
    texto.textContent = `${primerJugador} turno`;
    verGanador();
}
//Funcion ara que el juego una vez que se haya terminado se le de la orden de refrescar e iniciar una nueva partida 
function refrescarJuego() {
    primerJugador = "❌";
    opcionesJuego = ["", "", "", "", "", "", "", "", ""];
    texto.textContent = `${primerJugador} turno`;
    celdasTable.forEach(cell => cell.textContent = "");
    consola = true;
    juegoTerminado = false;
}
//Esta funcion te va a mostrar el jugador ganador, en etse casos seria el jugador X (Humano) y O (Computadora)
function verGanador() {
    for (const combo of posiblesGanar) {
        let [a, b, c] = combo;
        if (celdasTable[a].innerHTML && celdasTable[a].innerHTML === celdasTable[b].innerHTML && 
            celdasTable[a].innerHTML === celdasTable[c].innerHTML) {
            juegoTerminado = true;
            if (celdasTable[a].innerHTML === "❌") {
                contadorX++;
            //Si gana X, se mostrara una alerta    
                Swal.fire({
                    title: '¡Felicidades!',
                    text: ('¡X gana!'),
                    icon: 'success',
                    timer: 3000
                })
                //Si gana O se mostrara otra alerta 
            } else {
                contadorO++;
                // alert("¡O gana!");
                Swal.fire({
                    title: '¡OHHHHH NO, PERDISTE!',
                    text: ('¡O gana!'),
                    icon: 'error',
                    timer: 3000,
                   
                })
            }
            actualizarContador();
            guardarContadores();
            return;
        }
    }
    verificarEmpate();
}
//Funcion encargada de verificar los empates de cada una de las partidas 
function verificarEmpate() {
    if (!juegoTerminado && opcionesJuego.every(celda => celda !== "")) {
        juegoTerminado = true;
        // alert("¡Empate!");
        Swal.fire({
            title: '¡OHHHHH NO!',
            text: ('¡Empate!'),
            icon: 'question',
            timer: 3000,
        })
        actualizarContador();
        guardarContadores();
    }
}
//Funciion para actualizar el contador cada vez que se termina una partida, bien sea X o O el ganador 
function actualizarContador() {
    contador.value = contadorX;
    contadorCirculo.value = contadorO;
}
//Esta funcion te guardara los datos en el localstorage de ambos contadores 
function guardarContadores() {
    localStorage.setItem('contadorX', contadorX);
    localStorage.setItem('contadorO', contadorO);
}
//En este funcion se encuentra casi que toda laa funcion de la tabla, esta te permite verificar si las celdas estan vacias, si no lo estan te permite seleccionar una al azar bien sea al humano o computadora
//Tambien le da la funcion a la computadora de jugar por si sola y recorrer cada unos de los espacios vacios.
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
