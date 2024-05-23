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
                                      $email_exists = false;
                                      $queryUpdate = "CALL Cte_Update('$correo','$nombre','$telefono','$contra','$contraEn','$noticias')";
                                       $updateresult = mysqli_query($conn9, $queryUpdate);
                                        while ($row2 = mysqli_fetch_assoc($updateresult)) {
                                                // Verificar si el correo actual es igual al recibido en el formulario
                                                if ($row2['Correo'] == $correo) {
                                                    $email_exists = true;
                                                    $nombre = $row2['Nombre'];
                                                    $contra = $row2['Pwsrd']; 
                                                    $contraEn = $row2['EcrpPswrd'];
                                                    $telefono = $row2['Telefono'];
                                                    break; // Salir del bucle ya que hemos encontrado una coincidencia
                                                }
                                         }
                                       if ($email_exists) {
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
                                                $mail->Body = "Hola $nombre,

                                                                Hemos detectado que tu cuenta en nuestro sitio web ha sido actualizada recientemente. Si realizaste cambios en tu cuenta, puedes ignorar este mensaje.

                                                                Si no realizaste estos cambios o tienes alguna pregunta, por favor contáctanos de inmediato.

                                                                Gracias por confiar en nosotros.

                                                                Atentamente,
                                                                El equipo de Avenida56A";

                                                // Envía el correo
                                                $mail->send();
                                               $data = array(
                                                            "estado" => 0,
                                                            "correo" => $correo,
                                                            "nombre" => $nombre,
                                                            "telefono" => $telefono,
                                                            "contra" => $contra,
                                                            "encontra" => $contraEn,
                                                        );
                                                                                                                
                                                        $json_data = json_encode($data);                                                      
                                                        echo $json_data;
                                      }
                              
                            } catch (Exception $e) {
                             $data = array(
                                              "estado" => 'Error al Actualizar Perfil'
                                           );
                                                                                                                
                                $json_data = json_encode($data);                                                      
                                echo $json_data;
                                exit();
                            }   
                        }else {
                         $data = array(
                                              "estado" => 'Error al Actualizar Perfil(codigo de recuperacion invalido o expirado)'
                                           );
                                                                                                                
                                $json_data = json_encode($data);                                                      
                                echo $json_data;
                         }
   
                  
                } else {
                $data = array(
                            "estado" => 'Este Correo no pertenece a una cuenta'
                            );
                                                                                                                
                $json_data = json_encode($data);                                                      
                echo $json_data;                      
                }
            }

    } catch (Exception $ex) {
             $data = array(
                        "estado" => 'Error al Actualizar Perfil'
                        );
                                                                                                                
            $json_data = json_encode($data);                                                      
            echo $json_data;   
         
    }
    ?>