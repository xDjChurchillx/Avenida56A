<?php
require '../../Private/Credentials/DataBase/connection.php';

if ($conn6->connect_error) {
    die("Conexión fallida: " . $conn6->connect_error);
}

$queryListar = "CALL Inv_GetSellers()";
$result = mysqli_query($conn6, $queryListar);
$productos = array();
while ($row = mysqli_fetch_assoc($result)) {   
    // Agrega la fila al arreglo de productos
    $productos[] = $row;
}

// Convertir el array a formato JSON
echo json_encode($productos);
?>