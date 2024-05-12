let listasellers = document.querySelector('#listaBestSellers');
let listafavoritos = document.querySelector('#listaBestLikes');
let css = '';


$(document).ready(function () {

    $.ajax({
        url: 'Store/Proc_BestSellers.php',
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

                        // Añadir la imagen, el h3, el p y el botón al div 'product'
                        productli.appendChild(img);
                        productli.appendChild(h3);
                        productli.appendChild(p);

                        var productliClone = productli.cloneNode(true);
                        // Añadir el div 'product' al contenedor principal
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
                // Bloque de código que se ejecuta si se lanza una excepción dentro del bloque try
                console.log('Se ha producido un error:', error.message);
            }


        },
        error: function (xhr, status, error) {
            console.error(status + ': ' + error);
        }
    });

});