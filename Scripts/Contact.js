function validarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let asunto = document.getElementById("asunto").value;
   

    let nombreError = document.getElementById("nombreError");
    let correoError = document.getElementById("correoError");
    let asuntoError = document.getElementById("asuntoError");
  

    let isValid = true;

    nombreError.textContent = "";
    correoError.textContent = "";
    asuntoError.textContent = "";

    // Validaciones
    if (nombre.length > 20) {
        nombreError.textContent = "El nombre no puede tener m\u00E1s de 20 caracteres.";
        isValid = false;
    }
    if (nombre.length < 4) {
        nombreError.textContent = "El nombre no puede tener menos de 4 caracteres.";
        isValid = false;
    }
    if (correo.length > 100) {
        correoError.textContent = "El correo electr\u00D3nico no puede tener m\u00E1s de 100 caracteres.";
        isValid = false;
    }

    if (asunto.length > 50) {
        asuntoError.textContent = "EL asunto no puede tener m\u00E1s de 50 caracteres.";
        isValid = false;
    }
   
    
    let correoPattern = /^\w+@\w+.com$/; // Formato:  email
    if (!correoPattern.test(correo)) {
        correoError.textContent = "Por favor, ingresa un correo electr\u00F3nico v\u00E1lido.";

        isValid = false;
    }
    return isValid;
}
