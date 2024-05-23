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
let btn_cambiar = document.getElementById('btn_Cambiar');
var bloquearEnvio = false;
let filtro = extraerFiltroDeUrl(location.search);



$(document).ready(function () {
    if (filtro !== null) {
        console.log('filtro=' + filtro);
        if (filtro === 'recovery') {
            popup.style.display = 'block';
            console.log(filtro);
        }

        if (filtro.length > 3) {
            if (filtro.charAt(0) === '%') {
                filtro = filtro.substring(1);
                popup2.style.display = 'block';
                console.log(filtro);
                var UserString = localStorage.getItem('Avn56User');
                if (UserString !== null) {
                    Avn56User = JSON.parse(UserString);
                    console.log(Avn56User);
                    var correorecL = Avn56User[0].correo;
                    var nombrelog = Avn56User[0].nombre;
                    if (!isNullOrEmpty(correorecL)) {
                        if (nombrelog === '-1') {
                            var correorec2 = document.getElementById("correoFinal");
                            correorec2.value = correorecL;
                            correorec2.readOnly = true;
                            var lbl_correo = document.getElementById("lbl_correo");
                            lbl_correo.classList.add("active-label");
                        }

                    }
                }


            }

        }

    }

});

function extraerFiltroDeUrl(url) {
  
    if (url.length > '?filter='.length) {
        var filt = url.substring('?filter='.length);
        return filt;
    } else {
        return null; 
    }
}

recuperarLink.addEventListener("click", recuperarclik)
registroLink.addEventListener("click", registroclik);
btn_recuperar.addEventListener("click", recuperar);
btn_cambiar.addEventListener("click", cambiar)

popupclose.onclick = function () {
    popup.style.display = 'none';
};
popupclose2.onclick = function () {
    popup2.style.display = 'none';
};
function cambiar() {
    event.preventDefault();
    if (!bloquearEnvio) { // Verificar si no se está bloqueando el envío
        bloquearEnvio = true; // Bloquear el envío de la solicitud
        btn_cambiar.classList.add("active-button");
        btn_cambiar.disabled = true; // Desactivar el botón

        var correoFinal = document.getElementById("correoFinal").value;
        var correoError3 = document.getElementById("correoError3");

        var contraFinal = document.getElementById("contraFinal").value;
        var pswrdError = document.getElementById("pswrdError");

        if (correoFinal === "") {
            correoError3.textContent = "Por favor, ingresa un correo electr\u00F3nico v\u00E1lido.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else if (!/^\w+@\w+.com$/.test(correoFinal)) {
            correoError3.textContent = "Por favor, ingresa un correo electr\u00F3nico v\u00E1lido.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else if (contraFinal === "") {
            pswrdError.textContent = "Por favor, ingresa una contrase\u00F1a v\u00E1lida.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else if (contraFinal.length > 50) {
            pswrdError.textContent = "La contrase\u00F1a no puede tener m\u00E1s de 50 caracteres.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else if (contraFinal.length < 8) {
            pswrdError.textContent = "La contrase\u00F1a no puede tener menos de 8 caracteres.";
            habilitarEnvio(); // Habilitar el envío de la solicitud
            return false;
        } else {
            correoError3.textContent = "";
            pswrdError.textContent = "";
            $.ajax({
                url: 'Proc_Actualizar.php',
                type: 'GET',
                data: { correo: correoFinal, contra: contraFinal , codigo: filtro},
                success: function (data) {
                    try {
                        console.log(data);
                        var res = JSON.parse(data);
                        if (res.estado == "0") {
                            var newAvn56User = [
                                {
                                    correo: res.correo,
                                    nombre: res.nombre,
                                    pswrd: res.encontra
                                }
                            ];
                            localStorage.clear();
                            localStorage.setItem('Avn56User', JSON.stringify(newAvn56User));
                            sessionStorage.clear();
                            sessionStorage.setItem('Avn56User', JSON.stringify(newAvn56User));
                            console.log(localStorage.getItem('Avn56User'));
                            alert('Perfil Actualizado');
                           // Redireccionar a la página principal
                              window.location.href = window.location.origin + "/";
                        } else {
                            console.log(res.estado);
                            alert(res.estado);
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
function recuperar() {
    event.preventDefault();
    if (!bloquearEnvio) { // Verificar si no se está bloqueando el envío
        bloquearEnvio = true; // Bloquear el envío de la solicitud
        btn_recuperar.classList.add("active-button");
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
                        if (data === 'Correo de recuperacion enviado, porfavor revisa tu correo') {
                            var newAvn56User = [
                                {
                                    correo: correorec,
                                    nombre: '-1',
                                    pswrd: ''
                                }
                            ];
                             localStorage.setItem('Avn56User', JSON.stringify(newAvn56User));                           
                        }

                        alert(data);
                        popup.style.display = 'none';
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
function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
function habilitarEnvio() {
    bloquearEnvio = false; // Permitir el envío de la solicitud
    btn_recuperar.disabled = false; // Habilitar el botón
    btn_cambiar.disabled = false;
    btn_recuperar.classList.remove("active-button");
    btn_cambiar.classList.remove("active-button");
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
