let listaCompras = [];
$(document).ready(function () {
    
    if (sessionStorage.getItem('ComprasAvn') === null) {
          // El valor no existe en sessionStorage
        
    } else {
        // El valor existe en sessionStorage, entonces lo recuperamos
        var listaObjetosRecuperadaJSON = sessionStorage.getItem('ComprasAvn');
        listaCompras = JSON.parse(listaObjetosRecuperadaJSON);       
       
    }

});