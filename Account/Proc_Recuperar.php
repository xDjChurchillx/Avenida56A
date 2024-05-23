<?php
// Importa la clase PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../Private/Credentials/DataBase/connection.php';
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
        $nombre = '';
        // Instancia un nuevo objeto PHPMailer
        $mail = new PHPMailer(true);

        if ($conn8->connect_error || $conn8 === null) {
                 echo '-1';
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
                                // Configura el servidor SMTP
                                $mail->isSMTP();
                                $mail->Host       = 'smtp.hostinger.com';  // Cambia esto por tu servidor SMTP
                                $mail->SMTPAuth   = true;
                                $mail->Username   = 'account@avenida56a.com'; // Cambia esto por tu nombre de usuario SMTP
                                $mail->Password   = '9Tp&X3l@7zQw'; // Cambia esto por tu contraseña SMTP
                                $mail->SMTPSecure = 'tls';
                                $mail->Port       = 587;

                                // Configura el remitente y el destinatario
                                $mail->setFrom('account@avenida56a.com', 'Account Recovery');
                                $mail->addAddress($correo, '');

                                // Configura el asunto y el cuerpo del correo
                                $mail->Subject = 'Account Recovery';
                                $mail->Body = "Hola $nombre,

                                               Hemos detectado que has solicitado restablecer tu contraseña en nuestro sitio web. Por favor, haz clic en el siguiente enlace para definir una nueva contraseña:

                                               <a href='https://avenida56a.com'>Definir Nueva Contraseña</a>

                                               Si no solicitaste este cambio, por favor ignora este mensaje.
 
                                               Gracias,
                                               El equipo de Avenida56A";

                                // Envía el correo
                                $mail->send();
                                 echo 'Correo de recuperacion enviado, porfavor revisa tu correo';
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







