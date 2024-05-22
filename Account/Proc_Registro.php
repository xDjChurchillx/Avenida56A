<?php

require '../../Private/Credentials/DataBase/connection.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Recibir y limpiar los datos del formulario
        $nombre = htmlspecialchars($_POST["nombre"]);
        $correo = htmlspecialchars($_POST["correo"]);
        $contrasena = htmlspecialchars($_POST["contrasena"]);        
        $telefono = htmlspecialchars($_POST["telefono"]);
        $recibir_noticias = isset($_POST["recibir_noticias"]) ? "True" : "False"; // Verificar si se ha marcado la casilla de recibir noticias
        $recordar = isset($_POST["recordar"]) ? "True" : "False"; // Verificar si se guarda el usuario
        $contrasena_encriptada = password_hash($contrasena, PASSWORD_DEFAULT);

            if ($conn->connect_error || $conn === null) {
                echo "<script>alert('La base de datos ha fallado');
                 window.location.href = '../index.html';</script>";            
                exit();
            }
            if ($conn2->connect_error || $conn2 === null) {
                echo "<script>alert('La base de datos ha fallado');
                 window.location.href = '../index.html';</script>";
                exit();
            }
             $queryListar = "CALL Cte_ListCorreos('$correo')";
            $result = mysqli_query($conn, $queryListar);
            if ($result === false) {
              //  echo "<script>alert('La base de datos ha fallado');
               //  window.location.href = '../index.html';</script>";
                exit();
            } else {
                $email_exists = false;
                while ($row = mysqli_fetch_assoc($result)) {
                    // Verificar si el correo actual es igual al recibido en el formulario
                    if ($row['Cte_Correo'] == $correo) {
                        $email_exists = true;
                        echo "<script>alert('test');</script>";
                        break; // Salir del bucle ya que hemos encontrado una coincidencia
                    }
                }               
            }

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Register.html';</script>";
        exit();
    }


}



?>

