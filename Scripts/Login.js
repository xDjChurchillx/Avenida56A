let correoL = document.getElementById("correo").value;
let contrasenaL = document.getElementById("contrasena").value;
let correoErrorL = document.getElementById("correoError");
let contrasenaErrorL = document.getElementById("contrasenaError");
let contrasenaLink = document.getElementById("contrasenaLink");
let registroLink = document.getElementById("registroLink");
let popup = document.getElementById('popupContainer');
let popup2 = document.getElementById('popupContainer');
let popupclose = document.getElementById('closePopup');
let popupclose2 = document.getElementById('closePopup2');
let btn_recuperar = document.getElementById('btn_Recuperar');
let btn_recuperar2 = document.getElementById('btn_Recuperar2');
var bloquearEnvio = false;
let filtro = obtenerParametroURL('filter');

function obtenerParametroURL(nombre) {
    console.log(nombre);
    nombre = nombre.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    console.log(nombre);
    var regex = new RegExp('[\\?&]' + nombre + '=([^&#]*)');
    var resultados = regex.exec(location.search);
    return resultados === null ? '' : decodeURIComponent(resultados[1].replace(/\+/g, ' '));
}


popupclose.onclick = function () {
    popup.style.display = 'none';
};
popupclose2.onclick = function () {
    popup2.style.display = 'none';
};
registroLink.addEventListener("click", registroclik);
btn_recuperar.addEventListener("click", recuperar);
$(document).ready(function () {
    if (filtro === 'recovery') {
        popup.style.display = 'block';
    }
    if (filtro.charAt(0) === '%') {
        filtro = filtro.substring(1);
        popup2.style.display = 'block';
    }
});
function recuperar() {
    if (!bloquearEnvio) { // Verificar si no se est� bloqueando el env�o
        bloquearEnvio = true; // Bloquear el env�o de la solicitud
        btn_recuperar.disabled = true; // Desactivar el bot�n

        var correorec = document.getElementById("correorec").value;
        var correoError = document.getElementById("correoError");

        if (correorec === "") {
            correoError.textContent = "Por favor, ingresa tu correo electr�nico.";
            habilitarEnvio(); // Habilitar el env�o de la solicitud
            return false;
        } else if (!/^\w+@\w+.com$/.test(correorec)) {
            correoError.textContent = "Por favor, ingresa un correo electr�nico v�lido.";
            habilitarEnvio(); // Habilitar el env�o de la solicitud
            return false;
        } else {
            correoError.textContent = "";

            $.ajax({
                url: 'Proc_Recuperar.php',
                type: 'GET',
                data: { correo: correorec },
                success: function (data) {
                    try {
                        data = data.trim();
                        console.log(data);
                        alert(data);
                    } catch (error) {
                        console.log('Se ha producido un error:', error.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.error(status + ': ' + error);
                },
                complete: function () {
                    habilitarEnvio(); // Habilitar el env�o de la solicitud despu�s de completar
                }
            });
        }
    }
}

function habilitarEnvio() {
    bloquearEnvio = false; // Permitir el env�o de la solicitud
    btn_recuperar.disabled = false; // Habilitar el bot�n
}
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
