<?php

require '../Private/Credentials/DataBase/connection.php';
require '../Private/Credentials/encriptCred.php';
require '../Private/Credentials/mailCred.php';
require '../Private/Encripter/encripter.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Instancia un nuevo objeto PHPMailer
        $mail = new PHPMailer(true);
          // Instancia del encriptador
        $encriptador = new Encriptador();

    try {
     
           echo "<script>alert('hh');</script>";
      

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Contact.html';</script>";
        exit();
    }


}



?>
