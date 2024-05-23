<?php

require '../../Private/Credentials/DataBase/connection.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';

        if ($conn8->connect_error || $conn8 === null) {
                 echo $correo;
            }else {
	           echo $correo;
             }        
         
         
           

    } catch (Exception $ex) {
        echo $correo;
    }
    ?>
