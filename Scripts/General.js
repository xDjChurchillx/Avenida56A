let menu_icon_box = document.querySelector(".menu-icon");
let menu_box = document.querySelector(".menu-box");
let menu2 = document.querySelectorAll(".menu2");
let back = document.querySelectorAll(".back");
let back2 = document.querySelectorAll(".back2");
let Logout = document.querySelector("#CerrarSes");
let Login = document.querySelector("#alogin");
let Perfil = document.querySelector("#Perfil");
let Tienda = document.querySelector("#Tienda");
let Idioma = document.querySelector("#Idioma");
//busqueda
let Filtro = document.querySelector("#Filtro");
let Lupa = document.querySelector("#Lupa");
let SearchBox = document.querySelector("#searchBox");
let OpenSearch = false;
let OpenSearchinput = false;
let timeclose;
//userinfo
let correo = null;
let nombre = null;
let contra = null;
let Avn56User = null;

document.addEventListener("DOMContentLoaded", function () {
    ReadandSetUser();
});

function ReadandSetUser() {
    Logout.classList.toggle("desactivar");
    var usuarioGuardado = localStorage.getItem('Avn56User');
    if (usuarioGuardado) {
        // Convertir los datos de JSON a objeto
        Avn56User = JSON.parse(usuarioGuardado);

        correo = Avn56User[0].correo;
        nombre = Avn56User[0].nombre;
        contra = Avn56User[0].pswrd;
        sessionStorage.setItem('Avn56User', usuarioGuardado);
    } else {
        var Avn56UserString = sessionStorage.getItem('Avn56User');
        if (Avn56UserString !== null) {

            Avn56User = JSON.parse(Avn56UserString);
            correo = Avn56User[0].correo;
            nombre = Avn56User[0].nombre;
            contra = Avn56User[0].pswrd;

        }
    }
    if (!isNullOrEmpty(correo) && !isNullOrEmpty(contra)) {

        Login.textContent = "Cuenta";
        let href = Login.getAttribute("href");
        var newHref = href.replace("Login.html", "MyAccount.html")
        // Cambiar el href del elemento a "cuenta.html"
        Login.setAttribute("href", newHref);
        Logout.classList.toggle("desactivar");
    }
    console.log('User:');
    console.log(Avn56User);

}
function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
if (menu_icon_box !== null) {
    menu_icon_box.onclick = function () {
        menu_icon_box.classList.toggle("active");
        menu_box.classList.toggle("active_menu-box");
        Perfil.classList.remove("active");
        Tienda.classList.remove("active");
        Idioma.classList.remove("active2");
    }
}
if (Logout !== null) {
    Logout.onclick = function () {
        localStorage.removeItem('Avn56User');
        sessionStorage.removeItem('Avn56User');
        location.reload(); // Esto recargará la página
    }
}
if (document !== null ) {
    document.onclick = function (e) {
        if (!menu_icon_box.contains(e.target) && !menu_box.contains(e.target)) {
            menu_icon_box.classList.remove("active");
            menu_box.classList.remove("active_menu-box");
            Perfil.classList.remove("active");
            Tienda.classList.remove("active");
            Idioma.classList.remove("active2");
        }
    }
}
if (Lupa !== null) {
    Lupa.onclick = function (e) {
        clearTimeout(timeclose);
        if (Lupa.classList.contains("btn-search-Active")) {
            if (Filtro.value === "") {
               //DESActivar busqueda
                OpenSearch = false;
                closeSearch();
            } else {
                   //busqueda
                window.location.href = window.location.origin + "/Store/Store.html?filter=" + Filtro.value;
            }
        } else {
           //Activar busqueda
            OpenSearch = true;
            Lupa.classList.add("btn-search-Active");
            Filtro.classList.add("input-search-Active");
        }  
    }
}
if (Filtro !== null) {
    Filtro.addEventListener('input', async () => {
        //escriben busqueda
        if (Filtro.value === "") {
            OpenSearchinput = false;
            timeclose = setTimeout(closeSearch, 10000);
        } else {
            clearTimeout(timeclose);
            OpenSearchinput = true;
        }
    });
    Filtro.addEventListener('mousedown', async () => {
        //click busqueda
            clearTimeout(timeclose);
            OpenSearchinput = true;  

    });
    Filtro.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            //busqueda
            window.location.href = window.location.origin + "/Store/Store.html?filter=" + Filtro.value;
        }
    });
}
if (SearchBox !== null) {

    SearchBox.addEventListener('mouseleave', async () => {
        //mouse sale busqueda
        if (!OpenSearchinput) {
            if (OpenSearch) {
                clearTimeout(timeclose);
                timeclose = setTimeout(closeSearch, 5000);
            }
        } 
    });
    SearchBox.addEventListener('mouseenter', async () => {
       //mouse entra busqueda
        clearTimeout(timeclose);
    });
}

function closeSearch() {
     //DESActivar busqueda
    if (!OpenSearchinput) {
        Lupa.classList.remove("btn-search-Active");
        Filtro.classList.remove("input-search-Active");
    }
                  
    
}


if (Perfil !== null) {
    Perfil.onclick = function (e) {
        Perfil.classList.toggle("active");
    }
}
if (Tienda !== null) {
    Tienda.onclick = function (e) {
        Tienda.classList.toggle("active");
    }
}
if (Idioma !== null) {
    Idioma.onclick = function (e) {
        Idioma.classList.toggle("active2");
    }
}
if (back !== null) {
    back.forEach(elemento => {
        elemento.onclick = volverMenu;
    });
}
if (back2 !== null) {
    back2.forEach(elemento => {
        elemento.onclick = volverMenu2;
    });
}

function volverMenu() {
    menu_box.classList.remove("active");
}
function volverMenu2() {
   
    menu2.forEach(elemento => {
        elemento.classList.remove("active2");
    });
}