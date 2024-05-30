<?php

require '../../Private/Credentials/DataBase/connection.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
        $correo = trim($correo);
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
