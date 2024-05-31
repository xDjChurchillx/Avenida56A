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

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
        $correo = trim($correo);
        $nombre = '';
        $codigo = '';
        // Instancia un nuevo objeto PHPMailer
        $mail = new PHPMailer(true);
          // Instancia del encriptador
        $encriptador = new Encriptador();

        if ($conn8->connect_error || $conn8 === null) {
                 echo '-1';
                    exit();
            }     
         
            $queryListar = "CALL Cte_ListCorreos('$correo')";
            $result = mysqli_query($conn8, $queryListar);
            if ($result === false) {
                echo 'Error al recuperar cuenta';
            } else {
                $email_exists = false;
                while ($row = mysqli_fetch_assoc($result)) {
                    // Verificar si el correo actual es igual al recibido en el formulario
                    if ($row['Correo'] == $correo) {
                        $email_exists = true;
                        $nombre = $row['Nombre'];
                        break; // Salir del bucle ya que hemos encontrado una coincidencia
                    }
                }
       
                 // Mostrar mensaje dependiendo de si se encontró el correo o no
                if ($email_exists) {

                            try {
                                $codigo =   $encriptador->encriptar($nombre, $clave, $iv);
                                $codigo = substr($codigo, 0, 10);
                                $nombreDia = date("d/m/Y");
                                $nombreDia =  $encriptador->encriptar($nombreDia, $clave, $iv);
                                $nombreDia = substr($nombreDia, 0, 10);
                                $codigo = $codigo ."&". $nombreDia;
                                $link = 'https://avenida56a.com/Account/Login.html?filter=%';
                                $link = $link.$codigo;
                                // Configura el servidor SMTP
                                $mail->isSMTP();
                                $mail->Host       = 'smtp.hostinger.com';  // Cambia esto por tu servidor SMTP
                                $mail->SMTPAuth   = true;
                                $mail->Username   = $mail1; // Cambia esto por tu nombre de usuario SMTP
                                $mail->Password   = $Pmail1; // Cambia esto por tu contraseña SMTP
                                $mail->SMTPSecure = 'tls';
                                $mail->Port       = 587;

                                // Configura el remitente y el destinatario
                                $mail->setFrom($mail1 , 'Account Recovery');
                                $mail->addAddress($correo, '');

                                // Configura el asunto y el cuerpo del correo
                                $mail->Subject = 'Account Recovery';
                                $mail->isHTML(true);  
                               $mail->Body = "
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #333333;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
      
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Recuperacion de cuenta</h1>
        </div>
        <div class='content'>
            <p>Hola $nombre,</p>
            <p>Hemos detectado que has solicitado restablecer tu contraseña en nuestro sitio web. Por favor, haz clic en el siguiente enlace para definir una nueva contraseña:</p>
            <a href='$link' style='display: block; width: 200px; margin: 30px auto; padding: 10px; text-align: center; background-color: #222; color: white; text-decoration: none; border-radius: 5px;'>Restablecer Contraseña</a>
            <p>Si no solicitaste este cambio, por favor ignora este mensaje.</p>
            <p>Gracias,<br>El equipo de Avenida56A</p>
        </div>
        <div class='footer'>
            <p>Avenida56A.</p>
        </div>
    </div>
</body>
</html>
";

                                

                                // Envía el correo
                                if ($mail->send()) {
                                   echo 'Correo de recuperacion enviado, porfavor revisa tu correo';
                                } else {
                                    echo 'Error al enviar el correo: ' . $mail->ErrorInfo;
                                }                               
                                
                            } catch (Exception $e) {
                                echo 'Error al recuperar cuenta';
                            }



                  
                } else {
                  echo 'Este Correo no pertenece a una cuenta' ;                        
                }
            }

    } catch (Exception $ex) {
         echo 'Error al recuperar cuenta';
    }
    ?>







