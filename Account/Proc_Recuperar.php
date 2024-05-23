<?php

require '../../Private/Credentials/DataBase/connection.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';

       
            $queryListar = "CALL Cte_ListCorreos('$correo')";
            $result = mysqli_query($conn8, $queryListar);
            if ($result === false) {
               
            } else {
                $email_exists = false;
                while ($row = mysqli_fetch_assoc($result)) {
                    // Verificar si el correo actual es igual al recibido en el formulario
                    if ($row['Correo'] == $correo) {
                        $email_exists = true;
                        break; // Salir del bucle ya que hemos encontrado una coincidencia
                    }
                }
       
      
           
                 echo '-1';    
    } catch (Exception $ex) {
        
    }
    ?>
