// variables que actualizan
let xp = 0;
let salud = 100;
let oro = 50;
let indceArmasActual = 0; //las armas solo se podran escoger en orden.
let pelea;
let saludMonster;
let inventario = ["pala"];

//para vincular elementos html a js
const xpText = document.querySelector("#xpText");
const saludText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const boton1 = document.querySelector("#button1"); //querySelection puede seleccionar la classe y se llama(call) al igual que en CSS
const boton2 = document.querySelector("#button2");
const boton3 = document.querySelector("#button3");

const monsterStats = document.querySelector("#monsterStats");
const nombreMounstro = document.querySelector("#monsterName");
const saludMonsterTexto = document.querySelector("#monsterHealth");

const text = document.querySelector("#text");

// Botones para desplazar entre ventanas, primer hipervinculo deacurdo a lo puesto en html, despues se actualizan las variables en update
boton1.onclick = aTienda;
boton2.onclick = aMasmorra;
boton3.onclick = peleaDragon;

// Directorio de armas
const dirArmas = [
  { name: 'Pala', power: 5 },
  { name: 'Daga', power: 30 },
  { name: 'Espada', power: 50 },
  { name: 'Pistola', power: 100 }
];

//directorio de Mounstros, meter otros mounstros
const dirMounstros = [
  {
    name: "Slime",
    nivel: 2,
    salud: 15
  },
  {
    name: "Oso",
    nivel: 8,
    salud: 60
  },
  {
    name: "Dragon",
    nivel: 20,
    salud: 300
  }
]

// directorio de locaciones en objeto. en vez de crear 3 funciones con lo mismo solo se hace un object.array y se actualiza una funcion
const dirLocaciones  = [ 
  {
    name: "ciudad",
    "texto boton": ["Ir a la tienda", "Ir a la masmorra", "Pelear contra el dragón"],
    "boton funciones": [aTienda,aMasmorra, peleaDragon],
    text: "Estás en la plaza del pueblo. Ves un cartel que dice \"Tienda\"."
  },
  {
    name: "tienda",
    "texto boton": ["Comprar 10 de salud (10 de oro)", "Comprar arma (30 de oro)", "Ir a la ciudad"],
    "boton funciones": [ComprarSalud, ComprarArma, aCiudad],
    text: "Ahora estas en la tienda!." // hacer una conversacion (bienvenido que te ofrecemos....)
  },
  {
    name: "masmorra",
    "texto boton": ["Luchar contra Slime", "Luchar contra monstruos", "Ir a la ciudad"],
    "boton funciones": [peleaSlime, peleaBestia, aCiudad],
    text: "Entras en la cueva. Ves algunos monstruos."
  },
  {
    name: "pelea",
    "texto boton": ["Atacar", "esquivar", "Ruuun bitch!"],
    "boton funciones": [atacar, esquivar, aCiudad],
    text: "Estás en un combate!"
  },
  {
    name: "Muere el mounstruo",
    "texto boton": ["Regresar a la ciudad", "Regresar a la ciudad", "Regresar a la ciudad"],
    "boton funciones": [aCiudad, aCiudad, oculto],
    text: "Parece que el Mounstro no se mueve... haz ganado. \n \nRecibiras oro y experiencia."
  },
  {
    name: "perdiste",
    "texto boton": ["Volver a jugar???", "Volver a jugar??", "Volver a jugar?"],
    "boton funciones": [restart, restart, restart],
    text: "Eres bien malillo y moriste."
  },
  {
    name: "ganaste",
    "texto boton": ["Volver a jugar???", "Volver a jugar??", "Volver a jugar?"],
    "boton funciones": [restart, restart, restart],
    text: "Haz vencido al Dragon!!!!\n \nSalvaste a toda la aldea. \n \nGanaste el JUEGO!!!!"
  },{
    name: "Easter egg",
    "texto boton": ["2", "8", "Regresar a la ciudad"],
    "boton dunciones": [escogerDos, escogerOcho, aCiudad],
    text: "Encontraste un juego secreto.\n Elige un número de los que aparecen arriba. Se elegirán al azar diez números entre 0 y 10. Si el número que elijiste coincide con uno de los números aleatorios, ¡ganarás!"
  }
];

//funcion que se actualiza para cambiar el display, solo llamamos al directorio
function update(locacion){
  monsterStats.style.display = "none"; // para que se quite la barra de sangre del mounstro
  boton1.innerText = locacion["texto boton"][0]; // actualiza el array por el numero de caja
  boton2.innerText = locacion["texto boton"][1];
  boton3.innerText = locacion["texto boton"][2];
  boton1.onclick = locacion["boton funciones"][0];
  boton2.onclick = locacion["boton funciones"][1];
  boton3.onclick = locacion["boton funciones"][2];
  text.innerText = locacion.text
}

//Menu principal. 3 de ida y uno de regreso.
function aCiudad() {
  update(dirLocaciones[0]);
  boton2.style.backgroundImage = "linear-gradient(#452528, #763139)";
  boton2.style.color = "#c2acac";
}

function aTienda(){
  update(dirLocaciones[1]);
}

function aMasmorra() {
  update(dirLocaciones[2]);
}

function aPelear() {
  update(dirLocaciones[3]);
}

//funciones de tienda
function ComprarSalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    goldText.innerText = oro;
    healthText.innerText = salud;
    actualizarBarraSalud(salud)
    text.innerText = "Vendedor: -Compra más para no morir!";
  } else {
    text.innerText = "Vendedor: -Altooooo! \n \nEstas menso o que? \nTe falta oro precioso! \n \nAhora vete! \nNo soporto ver pobres.\n \nVuelve cuando tengas oro.";
    //cambiar el color del fondo del texto.
  }
}

function ComprarArma() { 
  if( indceArmasActual < dirArmas.length-1){ // tope de compra de armas

    if( oro > 30){
      // movimiento oro
      oro -= 30;
      goldText.innerText = oro; // actualizacion de la pantalla a lo que tienes

      //Actualizacion arma
      indceArmasActual++ //el indice incia en 0 y aumenta el indice conforme compras un arma ( en ves de sumar i = i + i usas el incremento i++)

      //Actualizacion inventario, texto...
      let nuevaArma = dirArmas[indceArmasActual].name; // ponemos a una variable el nombre del arma actual, solo llamamos al array actual.
      inventario.push(nuevaArma); // agregamos la nueva arma a nuestro inventario

      text.innerText = "Vendedor: -Sigue comprando y me haré millonario.\n \n"
      text.innerText += "Vendedor: -Ahora tienes una: " + nuevaArma + ".\n \n"      
      text.innerText += "Personaje: -Ahora tengo:  " + inventario + "\n \n"

      }else{
      text.innerText = "Vendedor: -Altooooo! \n \nQué te pása nene? \nTe falta pal' fierro! \n \nAhora vete! \nNo te quiero ver.\n \nVuelve cuando tengas oro.";
      
    }
  }else{
    text.innerText = "Vendedor: -No tengo mas dirArmas para vender \n \n Vendedor: -Tienes la mejor arma que puede haber! \n \n Vendedor: -Es una " +  dirArmas[indceArmasActual].name + " !!! \n \nVendedor: -Me vendes una de tus dirArmas por 15 de oro?"
    boton2.innerText = "Vender arma (15 de oro)";
    boton2.onclick = venderArma;
    boton2.style.backgroundImage = "linear-gradient(#e5e5e5, #ffffff)"
    boton2.style.color = "black"

  }
}

function venderArma(){
  if(inventario.length > 1){
    oro += 15;
    goldText.innerText = oro;
    let armaActual = inventario.shift();
    text.innerText = "Vendedor: -He comprado una: " + armaActual + ".\n \nVendedor: - Quieres vender otra arma? \n \n"
    text.innerText += "Personaje: -Mmm.. tal vez pueda vender:  " + inventario
  }else{
    text.innerText = "Personaje: (piensa) -No debería vender mi única arma, como me defendería de los mounstros."
  }
}


// seleccionamos al mounstro
function peleaSlime(){
  pelea = 0;
  aPelear();
}

function peleaBestia(){
  pelea = 1;
  aPelear();
}

function peleaDragon(){
  pelea = 2;
  aPelear();
}


//funciones de pelea (seleccionamos al mounstro, con su nombre y salud.)
function aPelear(){
update(dirLocaciones[3]); // update de etiquetas de pelea
saludMonster = dirMounstros[pelea].salud; // Salud del monstruo+

monsterStats.style.display = "block";   // BARRA SALUD MONSTER QUE HABIAMOS OCULTADO.
nombreMounstro.innerText = dirMounstros[pelea].name; // cambiamos el nombre del mounstro linea roja
saludMonsterTexto.innerText = saludMonster; // actualizamos la salud del mounstro en la pantalla
}

function atacar(){
  //texto batalla
  text.innerText = "El " + dirMounstros[pelea].name + " te ataca!\n \n ";
  text.innerText +=  "Tu contraatacas con la: " + dirArmas[indceArmasActual].name + ". \n \n";

  // actualizacion de salud de los dos
  salud -= calcularAtaqueMonster(dirMounstros[pelea].nivel); //Salud que te baja Dinamico (sencillo sin function)

  let random = Math.floor(Math.random() * xp) + 1; //numero random de 1 al total de de xp

  let danoTotal = dirArmas[indceArmasActual].power + random; // daño random mas poder del arma

  if (isMonsterHit()){  //pegas o te esquiva...
    saludMonster -= dirArmas[indceArmasActual].power + random ; // La salud del mounstro baja por el poder del arma mas un numero random del total de tu experiencia o 1
    text.innerText += "Has bajado este daño: " + danoTotal;
  }else{
    text.innerText += "Fallaste!!\n \nEse niño fue muy tonto, se parece a su papá.\n \n";
  }

  // actualizar contadores
  saludMonsterTexto.innerText = saludMonster;
  actualizBarraSaludMonster(saludMonster);
  saludText.innerText = salud;
  actualizarBarraSalud(salud);

  //Mueres o ganas?
  if (salud <= 0){
    perdiste()

    }else if (saludMonster <= 0){  // Si ganas -muere monstr o muere dragon.
      if (pelea === 2){
        ganaste();
      }else{
      muereMounstro();
      }
  }

  // Se rompera tu arma? 
  if (Math.random() <= .1 && inventario.length !== 1 ) { // probabilidad True = 1 de 10 Y si el conteo de inventario es diferente a 1 (no se destruya tu unica arma)
    text.innerText = "Personaje: -Oh no!! \n se ha roto la: " + inventario.pop();
    indceArmasActual-- //baja un arma de la lista
  }
}

function calcularAtaqueMonster(nivel){
  const hit = (nivel * 4) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0; 
}

function isMonsterHit(){ //num aleatorio entre 0 y 1 (true > 1) (probabilidad 80% true. 8 de 10)
  return Math.random() > .1 || salud < 20;  // true si es mayor a uno o si la salud es menor a 20
}

function esquivar(){
  text.innerText = "Esquivaste el ataque de " + dirMounstros[pelea].name;
}


//funciones de ganar o morir
function ganaste(){
  update(dirLocaciones[6]);
}

function perdiste(){
  update(dirLocaciones[5]);
}

function muereMounstro (){
  let oroMon = Math.floor((dirMounstros[pelea].nivel) * 6.7); // Ganancias de oro
  oro += oroMon;
  goldText.innerText = oro;

  let xpMon = dirMounstros[pelea].nivel; //Ganancias de xp
  xp += xpMon
  xpText.innerText = xp;

  update(dirLocaciones[4]);
  text.innerText += "Ganaste: " + oroMon + " de oro y " + xpMon + " de experiencia."
}

function restart(){
  xp = 0;
  salud = 100;
  oro = 50;
  indceArmasActual = 0;
  inventario = ["pala"];
  xpText.innerText = xp;
  saludText.innerText = salud
  actualizarBarraSalud(salud)
  goldText.innerText = oro;
  aCiudad()
}

//EasterEgg, al elegir un numero entre 2 y 8, se generaran numeros aleatorios y se compara si esta el numero elegido y ganas o pierdes.

function oculto(){
  update(dirLocaciones[7]);
  text.innerText = "Entras en una cueva secreta y ves a un señor a lo lejos.... \n-Señor: escoge un numero y tienta a tu suerte..."
}

function escogerDos(){
  escoger(2)
}

function escogerOcho(){
  escoger(8)
}

function escoger(adivina){ //adivina = numero de la funcion elegida (2 y 8)
  let numero = [];
  while (numero.length < 10){
    numero.push(Math.floor(Math.random() * 11))
  }

  text.innerText = " Elegiste el número: " + adivina + ". Estos son los números aleatorios:\n";

  for (let i = 0; i < 10 ; i++){
    text.innerText += numero[i] + "\n";
  }

  if (numero.includes(adivina)){
    text.innerText += "Corrrectooo!!!! Haz ganado 20 monedas de oro!!";
    oro += 20;
    goldText.innerText = oro;
  }else{
    if (salud <= 0){
      perdiste();
    }else{
      text.innerText += "Noooo Queeee pasaaaa Dr. Gracía, este muchacho acaba de perder 10 de vida!!";
      salud -= 10;
      healthText.innerText = salud;
      actualizarBarraSalud(salud)
    }
  }
}

//Funciones para barra de Salud Dinamico
function actualizarBarraSalud(salud) {
  const barraSalud = document.getElementById("#stats");
  stats.style.background = `linear-gradient(90deg,
    rgb(115, 233, 115),
    rgb(115, 233, 115) ${salud}%,
    white ${salud}%,
    white 100%
  )`;
}

function actualizBarraSaludMonster(saludMonster) {
  monsterStats.style.background = `linear-gradient(90deg,
  #924146,
  #924146 ${saludMonster}%,
    white ${saludMonster}%,
    white 100%
  )`;
}