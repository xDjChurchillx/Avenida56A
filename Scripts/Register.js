function validarRegistro() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    let confirmarContrasena = document.getElementById("confirmar_contrasena").value;
    let telefono = document.getElementById("telefono").value;

    let nombreError = document.getElementById("nombreError");
    let correoError = document.getElementById("correoError");
    let contrasenaError = document.getElementById("contrasenaError");
    let confirmarContrasenaError = document.getElementById("confirmarContrasenaError");
    let telefonoError = document.getElementById("telefonoError");

    let isValid = true;

    nombreError.textContent = "";
    correoError.textContent = "";
    contrasenaError.textContent = "";
    confirmarContrasenaError.textContent = "";
    telefonoError.textContent = "";

    // Validaciones
    if (nombre.length > 20) {
        nombreError.textContent = "El nombre no puede tener m\u00E1s de 20 caracteres.";
        isValid = false;
    }

    if (correo.length > 100) {
        correoError.textContent = "El correo electr\u00D3nico no puede tener m\u00E1s de 100 caracteres.";
        isValid = false;
    }

    if (contrasena.length > 50) {
        contrasenaError.textContent = "La contrase\u00F1a no puede tener m\u00E1s de 50 caracteres.";
        isValid = false;
    }
    if (contrasena.length < 8) {
        contrasenaError.textContent = "La contrase\u00F1a no puede tener menos de 8 caracteres.";
        isValid = false;
    }

    if (contrasena !== confirmarContrasena) {
        contrasenaError.textContent = "Las contrase\u00F1as no coinciden.";
        confirmarContrasenaError.textContent = "Las contraseñas no coinciden.";
        isValid = false;
    }
    let telefonoPattern = /^(\(\+\d{1,3}(\-\d+)*\)|\+\d)\d+(\-\d+)*$/; // Formato: (+XX)XXX-XXX-XXXX
    if (!telefonoPattern.test(telefono)) {
        telefonoError.textContent = "El n\u00F4mero de teléfono debe tener el formato\n(+XXX)XXX-XXX-XXX.";

        isValid = false;
    }

    return isValid;
}
