<?php

require '../../Private/Credentials/DataBase/connection.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
        $recibir_noticias = isset($_POST["recibir_noticias"]) ? "True" : "False"; // Verificar si se ha marcado la casilla de recibir noticias
       
      

            if ($conn->connect_error || $conn === null) {
                echo "<script>alert('La base de datos ha fallado');
                 window.location.href = '../index.html';</script>";            
                exit();
            }
           
             $querySub = "CALL Cte_Subscribe('$correo')";
            $result = mysqli_query($conn, $querySub);
           echo $result;  
           

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Register.html';</script>";
        exit();
    }
    ?>
