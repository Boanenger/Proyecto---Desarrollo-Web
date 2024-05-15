const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  apellido: /^[a-zA-ZÁ-ÿ\s]{1,40}$/, // Letras y espacios,, acentos
  nombre: /^[a-zA-ZÁ-ÿ\s]{1,40}$/, // Letras y espacios,, acentos
  direccion: /^[a-zA-Z0-9\_.\-\s]{4,16}$/, // Letras, numeros,espacios, punto, guion y guion_bajo
  loacalidad: /^[a-zA-Z0-9Á-ÿ\s]{1,40}$/, // Letras y espacios,numeros, acentos
  provincia: /^[a-zA-Z0-9Á-ÿ\s]{1,40}$/, // Letras y espacios,numeros, acentos
  telefono: /^\d{7,14}$/, //7 a 14 numeros
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // correo
};

const campos = {
  apellido: false,
  nombre: false,
  direccion: false,
  localidad: false,
  provincia: false,
  telefono: false,
  email: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'apellido');
      break;
    case "direccion":
      validarCampo(expresiones.direccion, e.target, 'direccion');
      break;
    case "localidad":
      validarCampo(expresiones.loacalidad, e.target, 'localidad');
      break;
    case "provincia":
      validarCampo(expresiones.provincia, e.target, 'provincia');
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, 'telefono');
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, 'email');
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`${campo}`).classList.remove("incorrecto");
    document.getElementById(`${campo}`).classList.add("correcto");
    document.querySelector(`#${campo} i`).classList.remove("fa-times-circle");
    document.querySelector(`#${campo} i`).classList.add("fa-circle-check");
    document.querySelector(`#${campo} .formulario__input-erro`).classList.remove("formulario__input-erro-activo");
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).classList.add("incorrecto");
    document.getElementById(`${campo}`).classList.remove("correcto");
    document.querySelector(`#${campo} i`).classList.add("fa-times-circle");
    document.querySelector(`#${campo} i`).classList.remove("fa-circle-check");
    document.querySelector(`#${campo} .formulario__input-erro`).classList.add("formulario__input-erro-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("acepto");
  if (campos.apellido && campos.nombre && campos.direccion && campos.localidad && campos.provincia && campos.telefono && campos.email && terminos.checked ) {
    formulario.reset();

    document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document.querySelectorAll(".correcto").forEach((icono) => {
      icono.classList.remove("correcto");
    });
  } else {
    document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    setTimeout(() => {
      document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
    }, 5000);
  }
});
