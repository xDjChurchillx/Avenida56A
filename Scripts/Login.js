let correoL = document.getElementById("correo").value;
let contrasenaL = document.getElementById("contrasena").value;
let correoErrorL = document.getElementById("correoError");
let contrasenaErrorL = document.getElementById("contrasenaError");
let contrasenaLink = document.getElementById("contrasenaLink");
let registroLink = document.getElementById("registroLink");
let popup = document.getElementById('popupContainer');
let popupclose = document.getElementById('closePopup');
let filtro = obtenerParametroURL('filter');

function obtenerParametroURL(nombre) {
    nombre = nombre.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + nombre + '=([^&#]*)');
    var resultados = regex.exec(location.search);
    return resultados === null ? '' : decodeURIComponent(resultados[1].replace(/\+/g, ' '));
}

if (filtro === 'recovery') {
    popup.style.display = 'block';
}
popupclose.onclick = function () {
    popup.style.display = 'none';
};

registroLink.addEventListener("click", registroclik);

function registroclik(){
    if (window.self !== window.top) {
        window.parent.location.href = '../Account/Register.html';
      
    } else {
        window.location.href = 'Register.html';
    }
}

function validarFormulario() {

   
    let isValid = true;

    correoErrorL.textContent = ""; // Limpiar mensaje de error
    contrasenaErrorL.textContent = ""; // Limpiar mensaje de error

    if (correoL.length > 100) {
        correoErrorL.textContent = "El correo electr\u00D3nico no puede tener m\u00E1s de 100 caracteres.";
        isValid = false;
    }

    if (contrasenaL.length > 50) {
        contrasenaErrorL.textContent = "La contrase\u00F1a no puede tener m\u00E1s de 50 caracteres.";
        isValid = false;
    }
    let correoPattern = /^\w+@\w+.com$/; // Formato: (+XX)XXX-XXX-XXXX
    if (!correoPattern.test(correoL)) {
        correoError.textContent = "El correo es invalido.";

        isValid = false;
    }
   
    return isValid;
}
