let ronda = 0;
let $coloresMaquina = [];//variable global
let $coloresUsuario = [];//variable global
const rondasParaGanar = 10;

const $comenzar = document.querySelector('button[type=button]');

$comenzar.onclick = function (evento) {
    iniciarPartida()
    turnoMaquina();
    turnoUsuario();
    evento.preventDefault();
}
function iniciarPartida() {
    bloquearUsuario();
    $coloresMaquina = [];
    ronda = 0;
    $coloresUsuario = [];
    encenderTablero()
}

function encenderTablero() {
    let $zonas = document.querySelectorAll('.zona');
    $zonas.forEach(function ($zona) {
        $zona.style.border = 'blue 2px solid';
        $zona.style.boxShadow = "10px 20px 30px blue"
    });

    let $columnasEstado = document.querySelectorAll('.col-sm-1');
    $columnasEstado.forEach(function ($columna) {
        $columna.style.borderColor = "#3674FA"
        $columna.style.boxShadow = "10px 20px 30px #3674FA";
    });
}

function turnoMaquina() {
    bloquearUsuario();
    ronda = ronda + 1;
    actualizarRonda();
    document.querySelector('.estado-juego').innerHTML = '';
    actualizarEstado('Turno PC')
    
    let $nuevoColor = obtenerColor();
    $coloresMaquina.push($nuevoColor);
    //para que la maquina resalte los colores uno por uno y que nos de tiempo a ver ese cambio
    // le decimos resalta los colores pero tomate un segundo para resaltar cada uno
    
    $coloresMaquina.forEach(function ($color, i) {//i es el indice del foreach
        //calculo el tiempo de espera maquina porque si no resalta los colores demasiado rápido y no se los alcanza a ver
        const tiempoDeEsperaMaquina = (i + 1) * 1000
        setTimeout(function () {
            resaltarColores($color);
        }, tiempoDeEsperaMaquina);

    });

    $coloresUsuario = [];
}

function actualizarEstado(estado) {
    document.querySelector('.indicador-turno').textContent = estado;
}

function actualizarRonda() {
    document.querySelector('.nro-ronda').textContent = 'Ronda: ' + ronda;
}

function bloquearUsuario() {
    //document.querySelector('.panel-de-juego').onclick = function(){
    
    //}

    //OTRA MANERA DE HACER ESTO SI NO TENEMOS LA CLASE panel-de-juego seria:
    document.querySelectorAll('.zona').forEach(function($zona) {
        $zona.onclick = function () {
            //funcion que no hace nada
        }

    });
}

function obtenerColor() {
    const $zonas = document.querySelectorAll('.zona');
    const indiceAleatorio = Math.floor(Math.random() * $zonas.length);//genera un nro aleatorio entre 0 y y la cant de zonas que haya menos 1;
   
    return $zonas[indiceAleatorio];
}

function resaltarColores($color) {
    $color.style.opacity = 1
    //con la linea de arriba le cambio la opacity a 1 para que haga el efecto de resalte
    //y con la funcion setTimeOut le digo que 1000ms despues la vuelva a poner en 0.5
    setTimeout(function () {
        $color.style.opacity = 0.5;
    }, 500);

}

function turnoUsuario() {
    const esperaUsuario = ($coloresMaquina.length + 1) * 1000 // calcula cada cuanto tiempo va a jugar el usuario
    
    setTimeout(function () {
        desbloquearUsuario();
        actualizarEstado('Tu Turno');
        
    }, esperaUsuario);
}

function desbloquearUsuario() {
    document.querySelectorAll('.zona').forEach($zona => {
        $zona.onclick = manejarTurnoUsuario;
    });
}

function manejarTurnoUsuario(e) { //e es un event que se obtiene gracias al navegador cuando se ejecuta la funcion onclick
    $colorElegidoPorUsuario = e.target;
    resaltarColores($colorElegidoPorUsuario);
    $coloresUsuario.push($colorElegidoPorUsuario);
   
    if ($colorElegidoPorUsuario.id != $coloresMaquina[$coloresUsuario.length - 1].id) {
        
        perder();
        return
    }
  
    if ($coloresUsuario.length === $coloresMaquina.length) {
        
        if ($coloresMaquina.length === rondasParaGanar) {
            ganar();
            return
        }

        felicitarUsuario();
        setTimeout( function () {
            turnoMaquina();
            turnoUsuario();
        },2000)
        
    }
}

function ganar(){
    bloquearUsuario();
    actualizarEstado('Ganaste')
    $zonas = document.querySelectorAll('.zona');
    $zonas.forEach( function($zona) {
           $zona.style.opacity = 1;
           });
    
    return;
}

function felicitarUsuario(){
    
   document.querySelector('.estado-juego').innerHTML = '<h2>Bien!</h2>';
   
}

function perder() {
    bloquearUsuario();
    actualizarEstado('Perdiste!');
    apagarTablero();

    return
}

function apagarTablero() {

    let $zonas = document.querySelectorAll('.zona');
    $zonas.forEach(function ($zona) {
        $zona.style.border = 'black 2px solid';
        $zona.style.boxShadow = "0px 0px 0px black"
    });

    let $columnasEstado = document.querySelectorAll('.col-sm-1');
    $columnasEstado.forEach(function ($columna) {
            $columna.style.borderColor = "gray"
            $columna.style.boxShadow = "0px 0px 0px";

        });

}
