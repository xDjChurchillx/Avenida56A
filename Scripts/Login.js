let correoL = document.getElementById("correo").value;
let contrasenaL = document.getElementById("contrasena").value;
let correoErrorL = document.getElementById("correoError");
let contrasenaErrorL = document.getElementById("contrasenaError");
let contrasenaLink = document.getElementById("contrasenaLink");
let registroLink = document.getElementById("registroLink");
let recuperarLink = document.getElementById("recuperarLink");
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
recuperarLink.addEventListener("click", recuperarclik)
registroLink.addEventListener("click", registroclik);
btn_recuperar.addEventListener("click", recuperar);
$(document).ready(function () {
    if (filtro !== null) {
        console.log('filtro='+filtro);
        if (filtro === 'recovery') {
            popup.style.display = 'block';
            console.log(filtro);
        }
        
        if (filtro.length > 3) {
            if (filtro.charAt(0) === '%') {
                filtro = filtro.substring(2);
                popup2.style.display = 'block';
                console.log(filtro);
                var UserString = localStorage.getItem('Avn56User');
                if (UserString !== null) {                   
                    Avn56User = JSON.parse(UserString);
                   var correorecL = Avn56User[0].correo;
                    if (!isNullOrEmpty(correorecL)) {
                        var correorec2 = document.getElementById("correorec2");
                        correorec2.value = correorecL;
                    }
                }


            }
            
        }
        
    }
   
});
function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
function recuperar() {
    if (!bloquearEnvio) { // Verificar si no se está bloqueando el envío
        bloquearEnvio = true; // Bloquear el envío de la solicitud
        btn_recuperar.disabled = true; // Desactivar el botón

        var correorec = document.getElementById("correorec").value;
        var correoError2 = document.getElementById("correoError2");

        if (correorec === "") {
            correoError2.textContent = "Por favor, ingresa un correo electr\u00F3nico v\u00E1lido.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else if (!/^\w+@\w+.com$/.test(correorec)) {
            correoError2.textContent = "Por favor, ingresa un correo electr\u00F3nico v\u00E1lido.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else {
            correoError2.textContent = "";

            $.ajax({
                url: 'Proc_Recuperar.php',
                type: 'GET',
                data: { correo: correorec },
                success: function (data) {
                    try {
                        data = data.trim();
                        console.log(data);
                        alert(data);
                        if (data === 'Correo de recuperacion enviado, porfavor revisa tu correo') {
                            var newAvn56User = [
                                {
                                    correo: correorec,
                                    nombre: '',
                                    pswrd: ''
                                }
                            ];
                            console.log(newAvn56User)
                            localStorage.setItem('Avn56User', JSON.stringify(newAvn56User));
                           
                        }
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
function recuperarclik() {
    if (window.self !== window.top) {
        window.parent.location.href = '../Account/Login.html?filter=recovery';

    } else {
        window.location.href = 'Login.html?filter=recovery';
    }
}

function validarFormulario() {
    correoL = document.getElementById("correo").value;
    contrasenaL = document.getElementById("contrasena").value;
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
    let correoPattern = /^\w+@\w+.com$/; // Formato: email
    if (!correoPattern.test(correoL)) {
        correoError.textContent = "Por favor, ingresa un correo electr\u00F3nico v\u00E1lido.";

        isValid = false;
    }
   
    return isValid;
}
