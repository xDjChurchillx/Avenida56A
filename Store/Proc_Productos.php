<?php
require '../../Private/Credentials/DataBase/connection.php';

$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : '';
$categoria = isset($_GET['cat']) ? $_GET['cat'] : '';
$sexo = isset($_GET['sexo']) ? $_GET['sexo'] : '';
$correo = isset($_GET['correo']) ? $_GET['correo'] : '';

if ($filtro == '') {
    $filtro = '-1';
}
if ($categoria == '') {
    $categoria = '-1';
}
if ($sexo == '') {
    $sexo = '-1';
}

if ($conn3->connect_error) {
    die("Conexión fallida: " . $conn3->connect_error);
}

$queryListar = "CALL Inv_ListProducts('$filtro', '$categoria','$sexo')";
$queryFavoritos = "CALL Cte_GetFavoritos('$correo')";
$result = mysqli_query($conn3, $queryListar);
$resultfav = mysqli_query($conn4, $queryFavoritos);
// Crear un arreglo para almacenar las filas de $resultfav
$favoritos = array();
while ($rowf = mysqli_fetch_assoc($resultfav)) {
    $favoritos[$rowf['ID']] = true;
}

// Luego, recorre las filas de $result
$productos = array();
while ($row = mysqli_fetch_assoc($result)) {
    // Verifica si este producto está marcado como favorito
    $row['Favorito'] = isset($favoritos[$row['ID']]) ? $favoritos[$row['ID']] : false;
    // Agrega la fila al arreglo de productos
    $productos[] = $row;
}

// Convertir el array a formato JSON
echo json_encode($productos);

?>