<?php
// Importa la clase PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../Private/Credentials/DataBase/connection.php';
require '../../Private/Credentials/mailCred.php';
require '../../Private/Credentials/encriptCred.php';
require '../../Private/Encripter/encripter.php';
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
        $nombre = isset($_GET['nombre']) ? $_GET['nombre'] : '';
        $telefono = isset($_GET['telefono']) ? $_GET['telefono'] : '';
        $contra = isset($_GET['contra']) ? $_GET['contra'] : '';
        $contraEn = isset($_GET['contraEn']) ? $_GET['contraEn'] : '';
        $noticias = isset($_GET['noticias']) ? $_GET['noticias'] : '';
        $codigo = isset($_GET['codigo']) ? $_GET['codigo'] : '';
        $nombrer = '';

        // Instancia un nuevo objeto PHPMailer
        $mail = new PHPMailer(true);
        // Instancia del encriptador
        $encriptador = new Encriptador();

        if ($conn8->connect_error || $conn8 === null) {
                 echo '-1';
                 exit();
            }     
         if ($conn9->connect_error || $conn9 === null) {
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
                        $nombrer = $row['Nombre'];
                        break; // Salir del bucle ya que hemos encontrado una coincidencia
                    }
                }
       
                 // Mostrar mensaje dependiendo de si se encontró el correo o no
                if ($email_exists) {
                      //$encriptador->desencriptar('', $clave, $iv);;
                          $codigo2 = $encriptador->encriptar($nombrer, $clave, $iv);                         
                          $codigo2 = substr($codigo2, 0, 10);
                          $nombreDia = date("l");
                          $nombreDia =  $encriptador->encriptar($nombreDia, $clave, $iv);
                          $nombreDia = substr($nombreDia, 0, 10);
                          $codigo2 = $codigo2 ."&". $nombreDia;
                         
                        if($codigo == $codigo2) {
                            try {

                              $queryUpdate = "CALL Cte_Update('$correo','$nombre','$telefono','$contra','$contraEn','$noticias')";
                               $updateresult = mysqli_query($conn9, $queryUpdate);
                               echo $updateresult;
                              // Configura el servidor SMTP
                                $mail->isSMTP();
                                $mail->Host       = 'smtp.hostinger.com';  // Cambia esto por tu servidor SMTP
                                $mail->SMTPAuth   = true;
                                $mail->Username   = $mail1; // Cambia esto por tu nombre de usuario SMTP
                                $mail->Password   = $Pmail1; // Cambia esto por tu contraseña SMTP
                                $mail->SMTPSecure = 'tls';
                                $mail->Port       = 587;

                                // Configura el remitente y el destinatario
                                $mail->setFrom($mail1, 'Account Update');
                                $mail->addAddress($correo, '');

                                // Configura el asunto y el cuerpo del correo
                                $mail->Subject = "Account Update";
                                $mail->Body = "Hola $nombrer,

                                                Hemos detectado que tu cuenta en nuestro sitio web ha sido actualizada recientemente. Si realizaste cambios en tu cuenta, puedes ignorar este mensaje.

                                                Si no realizaste estos cambios o tienes alguna pregunta, por favor contáctanos de inmediato.

                                                Gracias por confiar en nosotros.

                                                Atentamente,
                                                El equipo de Avenida56A";

                                // Envía el correo
                                $mail->send();
                                 echo 'Perfil Actualizado';
                            } catch (Exception $e) {
                                echo 'Error al Actualizar Perfil';
                                exit();
                            }   
                        }else {
	                        echo 'Error al Actualizar Perfil(codigo de recuperacion invalido)';
                         }
   
                  
                } else {
                  echo 'Este Correo no pertenece a una cuenta' ;                        
                }
            }

    } catch (Exception $ex) {
         echo 'Error al Actualizar Perfil';
    }
    ?>