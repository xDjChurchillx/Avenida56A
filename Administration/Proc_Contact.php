<?php
// Importa la clase PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../Private/Credentials/DataBase/connection.php';
require '../../Private/Credentials/encriptCred.php';
require '../../Private/Credentials/mailCred.php';
require '../../Private/Encripter/encripter.php';
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {    

    try {
        // Instancia un nuevo objeto PHPMailer
        $mail = new PHPMailer(true);
          // Instancia del encriptador
        $encriptador = new Encriptador();


        // Recibir y limpiar los datos del formulario
        $nombre = htmlspecialchars($_POST["nombre"]);
        $correo = htmlspecialchars($_POST["correo"]);
        $asunto = htmlspecialchars($_POST["asunto"]);
        $mensaje = htmlspecialchars($_POST["mensaje"]);
        $responder = isset($_POST["responder"]) ? "SI" : "NO";
       

        $nombre = trim($nombre);
        $correo = trim($correo);
        $asunto = trim($asunto);

          // Configura el servidor SMTP
            $mail->isSMTP();
            $mail->Host       = 'smtp.hostinger.com';  // Cambia esto por tu servidor SMTP
            $mail->SMTPAuth   = true;
            $mail->Username   = $mail2; // Cambia esto por tu nombre de usuario SMTP
            $mail->Password   = $Pmail2; // Cambia esto por tu contraseña SMTP
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            // Configura el remitente y el destinatario
            $mail->setFrom($mail2 , 'User Message');
            $mail->addAddress($mail2, '');

            // Configura el asunto y el cuerpo del correo
            $mail->Subject = "User Message: $asunto";
            $mail->Body = 
"Usuario: $correo
Mensaje: $mensaje

El usuario $responder quiere recibir una respuesta
";

            // Envía el correo
            $mail->send();
           echo "<script>alert('" . $responder . "');</script>";
      

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Contact.html';</script>";
        exit();
    }


}



?>
