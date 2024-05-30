<?php

require '../../Private/Credentials/DataBase/connection.php';
require '../../Private/Credentials/encriptCred.php';
require '../../Private/Credentials/mailCred.php';
require '../../Private/Encripter/encripter.php';
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  

    try {
        // Recibir y limpiar los datos del formulario
        $nombre = htmlspecialchars($_POST["nombre"]);
        $correo = htmlspecialchars($_POST["correo"]);
        $asunto = htmlspecialchars($_POST["asunto"]);
        $mensaje = htmlspecialchars($_POST["mensaje"]);
        $responder = isset($_POST["responder"]) ? "True" : "False";
       

        $nombre = trim($nombre);
        $correo = trim($correo);
        $asunto = trim($asunto);

        
           
           echo "<script>alert('" . $responder . "');</script>";
      

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Contact.html';</script>";
        exit();
    }


}



?>
