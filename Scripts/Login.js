let correoL = document.getElementById("correo").value;
let contrasenaL = document.getElementById("contrasena").value;
let correoErrorL = document.getElementById("correoError");
let contrasenaErrorL = document.getElementById("contrasenaError");
let contrasenaLink = document.getElementById("contrasenaLink");
let registroLink = document.getElementById("registroLink");
let popup = document.getElementById('popupContainer');
let popupclose = document.getElementById('closePopup');
let btn_recuperar = document.getElementById('btn_Recuperar');
let bloq = true;
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
btn_recuperar.onclick = function () {
    if (bloq) {
        bloq = false;
        event.preventDefault();
        btn_recuperar.disabled = true;

        var correorec = document.getElementById("correorec").value;
        var correoError = document.getElementById("correoError");

        if (correorec === "") {
            correoError.textContent = "Por favor, ingresa tu correo electrónico.";
            return false;
        } else if (!/^\w+@\w+.com$/.test(correorec)) {
            correoError.textContent = "Por favor, ingresa un correo electrónico válido.";
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
                        // Bloque de código que se ejecuta si se lanza una excepción dentro del bloque try
                        console.log('Se ha producido un error:', error.message);
                    }


                },
                error: function (xhr, status, error) {
                    console.error(status + ': ' + error);
                }
            });






        }
        btn_recuperar.disabled = false;
        bloq = true;
    }
   


}
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
