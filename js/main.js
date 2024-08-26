const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let esResultado = false;

botones.forEach((boton) => {
  boton.addEventListener("click", btnPresionado);
});

document.addEventListener("keydown", teclaPresionada);

function btnPresionado(event) {
  const presionado = event.target.textContent;
  switch (presionado) {
    case "C":
      limpiar();
      break;
    case "←":
      if (pantalla.textContent === "Math Error!" || esResultado) {
        limpiar();
        break;
      }
      pantalla.textContent = pantalla.textContent.slice(0, -1);
      break;
    case "=":
      if (pantalla.textContent === "") {
        break;
      } else if (pantalla.textContent === "Math Error!") {
        limpiar();
        break;
      }
      resultado(pantalla);
      break;
    default:
      escribirPantalla(presionado);
      break;
  }
}

function teclaPresionada(event) {
  const key = event.key;
  if (
    (key >= "0" && key <= "9") ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "."
  ) {
    escribirPantalla(key);
  } else if (key === "Enter" || key === "=") {
    if (pantalla.textContent === "") {
      return;
    } else if (pantalla.textContent === "Math Error!") {
      limpiar();
      return;
    }
    resultado(pantalla);
  } else if (key === "Backspace") {
    if (pantalla.textContent === "Math Error!" || esResultado) {
      limpiar();
      return;
    }
    pantalla.textContent = pantalla.textContent.slice(0, -1);
  } else if (key === "Escape" || key === "c") {
    limpiar();
  }
}

function resultado(element) {
  try {
    let resultado = eval(element.textContent);
    if (Number.isInteger(resultado)) {
      element.textContent = resultado;
      esResultado = true;
    } else {
      element.textContent = parseFloat(resultado.toFixed(7));
      esResultado = true;
    }
  } catch (error) {
    element.textContent = "Math Error!";
  }
}

function escribirPantalla(boton) {
  if (
    pantalla.textContent === "Math Error!" ||
    (esResultado && !["+", "*", "-", "/"].includes(boton))
  ) {
    limpiar();
  }
  pantalla.textContent += boton;
  esResultado = false;
}

function limpiar() {
  pantalla.textContent = "";
  esResultado = false;
}
