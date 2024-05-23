<?php

require '../../Private/Credentials/DataBase/connection.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';

        if ($conn8->connect_error || $conn8 === null) {
                 echo "-1";
            }
         
            $queryListar = "CALL Cte_ListCorreos('$correo')";
            $result = mysqli_query($conn8, $queryListar);
            if ($result === false) {
                echo "-1";
            } else {
                $email_exists = false;
                while ($row = mysqli_fetch_assoc($result)) {
                    // Verificar si el correo actual es igual al recibido en el formulario
                    if ($row['Correo'] == $correo) {
                        $email_exists = true;
                        break; // Salir del bucle ya que hemos encontrado una coincidencia
                    }
                }
       
         // Mostrar mensaje dependiendo de si se encontró el correo o no
                if ($email_exists) {
                  echo "1";  
                } else {
                   echo "-1";                            
                }
           

    } catch (Exception $ex) {
         echo "-1";
    }
    ?>
