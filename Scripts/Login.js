let correoL = document.getElementById("correo").value;
let contrasenaL = document.getElementById("contrasena").value;
let correoErrorL = document.getElementById("correoError");
let contrasenaErrorL = document.getElementById("contrasenaError");
let contrasenaLink = document.getElementById("contrasenaLink");
let registroLink = document.getElementById("registroLink");
let popup = document.getElementById('popupContainer');
let popup2 = document.getElementById('popupContainer2');
let popupclose = document.getElementById('closePopup');
let popupclose2 = document.getElementById('closePopup2');
let btn_recuperar = document.getElementById('btn_Recuperar');
let btn_recuperar2 = document.getElementById('btn_Recuperar2');
var bloquearEnvio = false;
let filtro = extraerFiltroDeUrl(location.search);


function extraerFiltroDeUrl(url) {
  
    if (url.length > '?filter='.length) {
        var filt = url.substring('?filter='.length);
        return filt;
    } else {
        return null; 
    }
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
    if (filtro !== null) {
        console.log('filtro='+filtro);
        if (filtro === 'recovery') {
            popup.style.display = 'block';
            console.log('test1');
        }
        
        if (filtro.length > 3) {
            if (filtro.charAt(0) === '%') {
                filtro = filtro.substring(2);
                popup2.style.display = 'block';
                console.log(filtro);
            }
            
        }
        
    }
   
});
function recuperar() {
    if (!bloquearEnvio) { // Verificar si no se está bloqueando el envío
        bloquearEnvio = true; // Bloquear el envío de la solicitud
        btn_recuperar.disabled = true; // Desactivar el botón

        var correorec = document.getElementById("correorec").value;
        var correoError = document.getElementById("correoError");

        if (correorec === "") {
            correoError.textContent = "Por favor, ingresa tu correo electrónico.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else if (!/^\w+@\w+.com$/.test(correorec)) {
            correoError.textContent = "Por favor, ingresa un correo electrónico válido.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
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
                    habilitarEnvio(); // Habilitar el envío de la solicitud después de completar
                }
            });
        }
    }
}

function habilitarEnvio() {
    bloquearEnvio = false; // Permitir el envío de la solicitud
    btn_recuperar.disabled = false; // Habilitar el botón
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
