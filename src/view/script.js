/* Variables Globales */
let vistaPS = "";
let vistaPP = "";

let datosPS = "";
let ANS = "";

/* Comandos especiales */
btnShift();
btnAlpha();
btnModo();
btnBase();

function btnShift() {
  const shift = document.querySelector("#shift");
  const check_shift = document.querySelector("#check_shift");
  const shift_view = document.querySelector(".s");

  shift.addEventListener("click", () => {
    if (check_shift.checked) {
      check_shift.checked = false;
      shift_view.classList.add("transparente");
    } else {
      check_shift.checked = true;
      shift_view.classList.remove("transparente");
    }
  });
}

function btnAlpha() {
  const alpha = document.querySelector("#alpha");
  const check_alpha = document.querySelector("#check_alpha");
  const alpha_view = document.querySelector(".a");

  alpha.addEventListener("click", () => {
    if (check_alpha.checked) {
      check_alpha.checked = false;
      alpha_view.classList.add("transparente");
    } else {
      check_alpha.checked = true;
      alpha_view.classList.remove("transparente");
    }
  });
}

function btnModo() {
  const modo = document.querySelector("#modo");
  const check_modo = document.querySelector("#check_modo");

  modo.addEventListener("click", () => {
    if (check_modo.checked) {
      check_modo.checked = false;
    } else {
      check_modo.checked = true;
    }
  });
}

function btnBase() {
  const base = document.querySelector("#base");
  let index = 1;
  base.addEventListener("click", () => {
    if (index > 0 && index < 4) {
      console.log("Estamos en la version normal");
      cambiarCheckYBaseView(index, true);
      cambiarCheckYBaseView(index - 1, false);
      console.log(index);
    } else if (index == 4) {
      console.log("Estamos en la version 4");
      cambiarCheckYBaseView(index - 1, false);
      index = 0;
      cambiarCheckYBaseView(index, true);
    }
    index++;
  });
}

function cambiarCheckYBaseView(index, estado) {
  const check_base = document.querySelectorAll(".check_base");
  check_base[index].checked = estado;
  cabiarBaseView(check_base[index].name, estado);
}

function cabiarBaseView(base, estado) {
  const base_view = document.querySelector(`#${base}`);
  if (estado) {
    base_view.classList.remove("transparente");
  } else {
    base_view.classList.add("transparente");
  }
}

accionBtns();

function accionBtns() {
  accionNumeros();
  accionOperadores();
  accionOperadoresEspeciales();
}

function accionNumeros() {
  document.querySelectorAll(".btn-numeros").forEach((numero) => {
    numero.addEventListener("click", () => {
      mostrarEnPantallaSecundaria(numero.innerHTML);
      agregarDatoParaOperacion(numero.innerHTML);
    });
  });
}

function accionOperadores() {
  document.querySelectorAll(".btn-operaciones-basicas").forEach((operador) => {
    operador.addEventListener("click", () => {
      cargarAccionOperador(operador.innerHTML);
      otrasOperacionesBasicas(operador.innerHTML.trim());
      igual(operador.innerHTML.trim());
    });
  });
}

function cargarAccionOperador(operador) {
  if (!exclusionDePantalla(operador)) {
    mostrarEnPantallaSecundaria(operador);
    agregarDatoParaOperacion(operador);
  }
}

function otrasOperacionesBasicas(operador) {
  if (operador == "DEL") {
    borrarUno();
  } else if (operador == "AC") {
    borrarTodo();
  }
}

function igual(operador) {
  if (operador == "=") {
    realizarOperacion();
  }
}

function accionOperadoresEspeciales() {
  document.querySelectorAll(".btn-especiales").forEach((operadorEspecial) => {
    operadorEspecial.addEventListener("click", () => {
      mostrarEnPantallaSecundaria(operadorEspecial.innerHTML);
      agregarDatoParaOperacion(operadorEspecial.innerHTML);
    });
  });
}

function mostrarEnPantallaSecundaria(dato) {
  if (
    dato == "." &&
    (vistaPS == "" || "+-*/".includes(vistaPS[vistaPS.length - 1]))
  )
    vistaPS += "0";
  vistaPS += dato;
  document.querySelector(".p-secundaria").innerHTML = vistaPS;
}
function agregarDatoParaOperacion(dato) {
  datosPS +=
    agregarNumeros(dato) || agregarOperacionesBasicas(dato) || agregarANS();

}

function agregarNumeros(numero) {
  return "0123456789.".includes(numero) ? numero : null;
}

function agregarANS() {
  return ANS;
}

function agregarOperacionesBasicas(operacion) {
  return "+-*/".includes(operacion) ? operacion : null;
}

function exclusionDePantalla(datoAComaparar) {
  return (
    datoAComaparar.trim() == "DEL" ||
    datoAComaparar.trim() == "AC" ||
    datoAComaparar.trim() == "="
  );
}

function borrarUno() {
  vistaPS = vistaPS.substring(0, vistaPS.length - 1);
  datosPS = datosPS.substring(0, datosPS.length - 1);
  document.querySelector(".p-secundaria").innerHTML = vistaPS;
}

function borrarTodo() {
  vistaPS = "";
  datosPS = "";
  vistaPP = "0";
  mostrarEnPantallaSecundaria(vistaPS);
  mostrarEnPantallaPrincipal(vistaPP);
}

function realizarOperacion() {
  vistaPS = "";
  let resultado = eval(datosPS);
  if (resultado == undefined) resultado = "Syntax ERROR";
  mostrarEnPantallaPrincipal(resultado);
}

function mostrarEnPantallaPrincipal(dato) {
  vistaPP = dato;
  ANS = dato;
  datosPS = "";
  document.querySelector(".p-principal").innerHTML = vistaPP;
}
