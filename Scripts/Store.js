let container = document.querySelector('.container');
let filtro = obtenerParametroURL('filter');
let Filtroelemnt = document.querySelector("#Filtro");
let loginFrame = document.getElementById("loginframe");
let popup = document.getElementById('popupContainer');
let popupclose = document.getElementById('closePopup');
let cat = '-1';
let sexo = '-1';
let listaCompras = [];
let css = '';
//userinfo
let correoU = null;
let nombreU = null;
let contraU = null;
let Avn56UserU = null;

function obtenerParametroURL(nombre) {
    nombre = nombre.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + nombre + '=([^&#]*)');
    var resultados = regex.exec(location.search);
    return resultados === null ? '' : decodeURIComponent(resultados[1].replace(/\+/g, ' '));
}

popupclose.onclick = function () {
    popup.style.display = 'none';
};
loginFrame.onload = function () {
    const myframe = loginFrame.contentDocument;
    myframe.querySelector('header').remove();  
};
$(document).ready(function () {

    if (filtro === '') {
        /* FILTRO VACIO ENSE;A TODO*/
        filtro = '-1';
        cat = '-1';
        sexo = '-1';
    } else {
        if (isNaN(filtro.charAt(0))) {
            /* FILTRO NO TRAE ID*/
            cat = '-1';
            sexo = '-1';
            /* IMPRIMIR EN LA BARRA EL FILTRO*/
            Filtroelemnt.value = filtro;
        } else {
            if (filtro.charAt(0) === "0") {
                /* FILTRO HOMBRE*/
                sexo = 'Hombre';
                /* QUITAR NUMERO*/
                filtro = filtro.substring(1, filtro.length)
                /* IMPRIMIR EN LA BARRA EL FILTRO*/
                Filtroelemnt.value = filtro;
            } else {
                if (filtro.charAt(0) === "5") {
                    /* QUITAR NUMERO*/
                    filtro = filtro.substring(1, filtro.length)
                    /* IMPRIMIR EN LA BARRA EL FILTRO*/
                    Filtroelemnt.value = filtro;
                    /* FILTRO ACESSORIO*/
                    filtro = '-1';
                    cat = 'Accesorio';
                    sexo = '-1';
                } else {
                    /* FILTRO MUJER*/
                    sexo = 'Mujer';
                    /* QUITAR NUMERO*/
                    filtro = filtro.substring(1, filtro.length)
                    /* IMPRIMIR EN LA BARRA EL FILTRO*/
                    Filtroelemnt.value = filtro;
                }
            }

        }

    }

    var usuarioGuardado = sessionStorage.getItem('Avn56User');
    if (usuarioGuardado) {
        // Convertir los datos de JSON a objeto
        Avn56UserU = JSON.parse(usuarioGuardado);

        correoU = Avn56User[0].correo;
        nombreU = Avn56User[0].nombre;
        contraU = Avn56User[0].pswrd;

    } else {
        var Avn56UserString = localStorage.getItem('Avn56User');
        if (Avn56UserString !== null) {
            sessionStorage.setItem('Avn56User', Avn56UserString);
            Avn56UserU = JSON.parse(Avn56UserString);
            correoU = Avn56User[0].correo;
            nombreU = Avn56User[0].nombre;
            contraU = Avn56User[0].pswrd;

        }
    }
    $.ajax({
        url: 'Proc_Productos.php',
        type: 'GET',
        data: { filtro: filtro, cat: cat, sexo: sexo, correo: correoU },
        success: function (data) {
            try {
                var products = JSON.parse(data);
                console.log(products);
                if (products.length !== 0) {
                    document.getElementById('sin-productos').style.display = 'none';
                    products.forEach(function (producto) {
                        var imgs = JSON.parse(producto.JsonImg);
                        console.log("Nombre: " + producto.Product);
                        // Crear un elemento div con la clase 'product'
                        var productDiv = document.createElement('div');
                        productDiv.classList.add('product');

                        // Crear un elemento img con el src correspondiente al primer elemento del arreglo 'Imagenes'
                        var img = document.createElement('img');
                        var path = imgs.Imagenes[0];
                        var imgName = path.split('/')[3]; // Obtener la parte del path después de la última barra
                        img.alt = producto.Product;
                        img.src = imgs.Imagenes[0];
                        img.setAttribute('id', imgName);
                        /* img.src = imgs.Imagenes[0];*/
                        css += '#' + imgName + ':hover {content: url(\'' + imgs.Imagenes[1] + '\');}\n';

                        // Crear un elemento h3 con el nombre del producto
                        var h3 = document.createElement('h3');
                        h3.textContent = producto.Product;

                        // Crear un elemento p con la descripción del producto
                        var p = document.createElement('p');
                        p.textContent = producto.Price;

                        // Crear un botón para cada producto
                        var button = document.createElement('button');
                        button.innerHTML = '';
                        button.setAttribute('id', 'btn-' + imgName);
                        if (producto.Favorito === true) {
                            button.classList.toggle("button-active");
                        }
                        button.onclick = function () {
                            agregarAFavoritos(producto);
                        };

                        // Añadir la imagen, el h3, el p y el botón al div 'product'
                        productDiv.appendChild(img);
                        productDiv.appendChild(h3);
                        productDiv.appendChild(p);
                        productDiv.appendChild(button);

                        // Añadir el div 'product' al contenedor principal
                        container.appendChild(productDiv);
                    });
                    var style = document.createElement('style');
                    style.appendChild(document.createTextNode(css));
                    document.head.appendChild(style);
                }

            } catch (error) {
                // Bloque de código que se ejecuta si se lanza una excepción dentro del bloque try
                console.log('Se ha producido un error:', error.message);
            }
            const productos = document.querySelectorAll('.product');

            productos.forEach(product => {
                product.addEventListener('mouseenter', () => {
                    container.classList.add('containerhover');
                });
                product.addEventListener('mouseleave', () => {
                    container.classList.remove('containerhover');
                });
            });

        },
        error: function (xhr, status, error) {
            console.error(status + ': ' + error);
        }
    });


});
// Método para manejar el clic en el botón
function agregarAlCarrito(producto) {
    var listaproductosJSON;
    if (sessionStorage.getItem('ComprasAvn') === null) {

        listaCompras.push(producto);
        // Convertimos la lista de objetos a una cadena JSON
        listaproductosJSON = JSON.stringify(listaCompras);

        // Guardamos la cadena JSON en sessionStorage
        sessionStorage.setItem('ComprasAvn', listaproductosJSON);
        console.log("La lista de objetos no existe en sessionStorage:" + listaCompras);
    } else {
        // El valor existe en sessionStorage, entonces lo recuperamos
        var listaObjetosRecuperadaJSON = sessionStorage.getItem('ComprasAvn');
        listaCompras = JSON.parse(listaObjetosRecuperadaJSON);

        listaCompras.push(producto);

        // Convertimos la lista de objetos a una cadena JSON
        listaproductosJSON = JSON.stringify(listaCompras);

        // Guardamos la cadena JSON en sessionStorage
        sessionStorage.setItem('ComprasAvn', listaproductosJSON);
        console.log("La lista de objetos existe en sessionStorage:" + listaCompras);
    }
}
function agregarAFavoritos(producto) {
    //Agregar prducto a favoritos
    var usuarioGuardado = sessionStorage.getItem('Avn56User');
    if (usuarioGuardado) {
        // Convertir los datos de JSON a objeto
        Avn56UserU = JSON.parse(usuarioGuardado);

        correoU = Avn56User[0].correo;
        nombreU = Avn56User[0].nombre;
        contraU = Avn56User[0].pswrd;
        var imgs = JSON.parse(producto.JsonImg);
        var path = imgs.Imagenes[0];
        var imgName = path.split('/')[3];

        $.ajax({
            url: 'Proc_Favoritos.php',
            type: 'GET',
            data: { correo: correoU, producto: producto.ID },
            success: function (data) {
                try {
                    var currentbutton = document.querySelector('#btn-' + imgName);
                    console.log(data);
                    if (data.trim() === "1") {
                        currentbutton.classList.add("button-active");
                    } else {
                        currentbutton.classList.remove("button-active");
                    }

                } catch (error) {
                    // Bloque de código que se ejecuta si se lanza una excepción dentro del bloque try
                    console.log('Se ha producido un error:', error.message);
                }

            },
            error: function (xhr, status, error) {
                console.error(status + ': ' + error);
            }
        });

    } else {
        loginFrame.src = '../Account/Login.html';        
        popup.style.display = 'block';
    }


}



