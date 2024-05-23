<?php
// Importa la clase PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../Private/Credentials/DataBase/connection.php';
require '../../Private/Credentials/encriptCred.php';
require '../../Private/Encripter/encripter.php';
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

 try {
    
        $correo = isset($_GET['correo']) ? $_GET['correo'] : '';
        $contra = isset($_GET['contra']) ? $_GET['contra'] : '';
        $codigo = isset($_GET['codigo']) ? $_GET['codigo'] : '';
        $nombre = '';
        
        // Instancia un nuevo objeto PHPMailer
        $mail = new PHPMailer(true);
        // Instancia del encriptador
        $encriptador = new Encriptador();

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
       
                 // Mostrar mensaje dependiendo de si se encontr� el correo o no
                if ($email_exists) {
                      //$encriptador->desencriptar('', $clave, $iv);;
                         $codigo2 = $encriptador->encriptar($nombre, $clave, $iv);
                          echo $codigo2;
                           echo '-';
                          $codigo2 = substr($codigo2, 0, 18);
                          echo $codigo2;
                           echo '-';
                          echo $codigo;
                        if($codigo == $codigo2) {
                            try {
                               
                                // Configura el servidor SMTP
                                $mail->isSMTP();
                                $mail->Host       = 'smtp.hostinger.com';  // Cambia esto por tu servidor SMTP
                                $mail->SMTPAuth   = true;
                                $mail->Username   = 'account@avenida56a.com'; // Cambia esto por tu nombre de usuario SMTP
                                $mail->Password   = '9Tp&X3l@7zQw'; // Cambia esto por tu contrase�a SMTP
                                $mail->SMTPSecure = 'tls';
                                $mail->Port       = 587;

                                // Configura el remitente y el destinatario
                                $mail->setFrom('account@avenida56a.com', 'Account Update');
                                $mail->addAddress($correo, '');

                                // Configura el asunto y el cuerpo del correo
                                $mail->Subject = 
                                $mail->Body = "Hola $nombre,

                                                Hemos detectado que tu cuenta en nuestro sitio web ha sido actualizada recientemente. Si realizaste cambios en tu cuenta, puedes ignorar este mensaje.

                                                Si no realizaste estos cambios o tienes alguna pregunta, por favor cont�ctanos de inmediato.

                                                Gracias por confiar en nosotros.

                                                Atentamente,
                                                El equipo de Avenida56A";

                                // Env�a el correo
                                $mail->send();
                                 echo 'Perfil Actualizado';
                            } catch (Exception $e) {
                                echo 'Error al Actualizar Perfil';
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