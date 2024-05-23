<?php
require '../../Private/Credentials/DataBase/connection.php';

try {

    $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
     $contra = isset($_GET['contra']) ? $_GET['contra'] : '';
    $producto = isset($_GET['producto']) ? $_GET['producto'] : '';

    // Llama al procedimiento almacenado para la autenticación
    $queryListar = "CALL Cte_Favorito('$correo', '$producto')";
    $result = mysqli_query($conn5, $queryListar);

    if ($result === false) {
        echo "0";
        exit();
    } else {
        if ($row = mysqli_fetch_assoc($result)) {

            echo $row['result'];
        } else {
            echo "0";
        }
    }
} catch (Exception $ex) {
    echo "0";
    exit();
}


?> 