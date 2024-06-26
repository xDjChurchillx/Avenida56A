let listasellers = document.querySelector('#listaBestSellers');
let listafavoritos = document.querySelector('#listaBestLikes');
let btn_sub = document.querySelector('#btn_Sub');


let css = '';


$(document).ready(function () {

    btn_sub.onclick = function () {
        event.preventDefault();
        var correosub = document.getElementById("correosub").value;
        let correoError = document.getElementById("correoError");
        var isValid = true;
        if (correosub.trim().length > 100) {
            correoError.textContent = "El correo electr\u00D3nico no puede tener m\u00E1s de 100 caracteres.";
            isValid = false;
        }
        let correoPattern = /^\w+@\w+.com$/; // Formato: aaa@aa.com
        if (!correoPattern.test(correosub.trim())) {
            correoError.textContent = "El correo es invalido.";

            isValid = false;
        }
        if (isValid) {
            correoError.textContent = "";
            $.ajax({
                url: 'Account/Proc_Suscribirse.php',
                type: 'GET',
                data: { correo: correosub },
                success: function (data) {
                    try {
                        console.log('succes sub');
                        console.log(data);

                    } catch (error) {
                        // Bloque de c�digo que se ejecuta si se lanza una excepci�n dentro del bloque try
                        console.log('Se ha producido un error:', error.message);
                    }


                },
                error: function (xhr, status, error) {
                    console.error(status + ': ' + error);
                }
            });
        }


    }
    $.ajax({
        url: '../Store/Proc_BestSellers.php',
        type: 'GET',
        success: function (data) {
            try {
                var products = JSON.parse(data);
                console.log('BestSellers');
                console.log(products);
                if (products.length !== 0) {
                    products.forEach(function (producto) {
                        var imgs = JSON.parse(producto.JsonImg);
                        console.log("Nombre: " + producto.Product);
                        var productli = document.createElement('li');
                        // Crear un elemento div con la clase 'product'
                        var productDiv = document.createElement('div');
                        productDiv.classList.add('product');

                        // Crear un elemento img con el src correspondiente al primer elemento del arreglo 'Imagenes'
                        var img = document.createElement('img');
                        var path = imgs.Imagenes[0];
                        var imgName = path.split('/')[3]; // Obtener la parte del path despu�s de la �ltima barra
                        img.alt = producto.Product;
                        img.src = imgs.Imagenes[0];
                        img.setAttribute('id', imgName);
                        /* img.src = imgs.Imagenes[0];*/
                        css += '#' + imgName + ':hover {content: url(\'' + imgs.Imagenes[1] + '\');}\n';

                        // Crear un elemento h3 con el nombre del producto
                        var h3 = document.createElement('h3');
                        h3.textContent = producto.Product;
                        h3.onclick = function () {
                            window.location.href = window.location.origin + "/Store/Store.html?filter=" + producto.Product;
                        };





                        // Crear un elemento p con la descripci�n del producto
                        var p = document.createElement('p');
                        p.textContent = producto.Price;

                        // A�adir la imagen, el h3, el p y el bot�n al div 'product'
                        productli.appendChild(img);
                        productli.appendChild(h3);
                        productli.appendChild(p);
                        /* productli.appendChild(productDiv);*/

                        var productliClone = productli.cloneNode(true);
                        // A�adir el div 'product' al contenedor principal
                        listasellers.appendChild(productli);
                        listafavoritos.appendChild(productliClone);
                    });
                    var style = document.createElement('style');
                    style.appendChild(document.createTextNode(css));
                    document.head.appendChild(style);
                    $('.slide').hiSlide({
                        speed: 1000,
                        interval: 2000,
                    });

                }

            } catch (error) {
                // Bloque de c�digo que se ejecuta si se lanza una excepci�n dentro del bloque try
                console.log('Se ha producido un error:', error.message);
            }


        },
        error: function (xhr, status, error) {
            console.error(status + ': ' + error);
        }
    });

});