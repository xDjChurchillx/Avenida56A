<?php

require '../../Private/Credentials/DataBase/connection.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';

        echo $correo;
           

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Register.html';</script>";
        exit();
    }
    ?>
