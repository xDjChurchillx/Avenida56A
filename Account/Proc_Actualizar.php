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
        $contraEn = '';
        $noticias = isset($_GET['noticias']) ? $_GET['noticias'] : '';
        $codigo = isset($_GET['codigo']) ? $_GET['codigo'] : '';
        $nombrer = '';
        $codigo2 = '';

        $nombre = trim($nombre);
        $correo = trim($correo);
        $telefono = trim($telefono);


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
       
                 // Mostrar mensaje dependiendo de si se encontr� el correo o no
                if ($email_exists) {
                      //$encriptador->desencriptar('', $clave, $iv);;
                          $codigo2 = $encriptador->encriptar($nombrer, $clave, $iv);                         
                          $codigo2 = substr($codigo2, 0, 10);
                          $nombreDia = date("d/m/Y");
                          $nombreDia =  $encriptador->encriptar($nombreDia, $clave, $iv);
                          $nombreDia = substr($nombreDia, 0, 10);
                          $codigo2 = $codigo2 ."&". $nombreDia;
                         
                         

                        if($codigo == $codigo2) {
                            try {
                                      $contraEn = $encriptador->encriptar($contra, $clave, $iv);
                                      $email_exists = false;
                                      $queryUpdate = "CALL Cte_Update('$correo','$nombre','$telefono','$contra','$contraEn','$noticias')";
                                       $updateresult = mysqli_query($conn9, $queryUpdate);
                                        while ($row2 = mysqli_fetch_assoc($updateresult)) {
                                                // Verificar si el correo actual es igual al recibido en el formulario
                                                if ($row2['Correo'] == $correo) {
                                                    $email_exists = true;
                                                    $nombre = $row2['Nombre'];                                                  
                                                    $telefono = $row2['Telefono'];
                                                    $noticias = $row2['Noticias'];
                                                    break; // Salir del bucle ya que hemos encontrado una coincidencia
                                                }
                                         }
                                       if ($email_exists) {
                                                         // Configura el servidor SMTP
                                                $mail->isSMTP();
                                                $mail->Host       = 'smtp.hostinger.com';  // Cambia esto por tu servidor SMTP
                                                $mail->SMTPAuth   = true;
                                                $mail->Username   = $mail1; // Cambia esto por tu nombre de usuario SMTP
                                                $mail->Password   = $Pmail1; // Cambia esto por tu contrase�a SMTP
                                                $mail->SMTPSecure = 'tls';
                                                $mail->Port       = 587;

                                                // Configura el remitente y el destinatario
                                                $mail->setFrom($mail1, 'Account Update');
                                                $mail->addAddress($correo, '');

                                                // Configura el asunto y el cuerpo del correo
                                                $mail->Subject = "Account Update";
                                               $mail->isHTML(true);  // Aseg�rate de que esta l�nea est� presente
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
            <h1>Actualizaci�n de Cuenta</h1>
        </div>
        <div class='content'>
            <p>Hola $nombre,</p>
            <p>Hemos detectado que tu cuenta en nuestro sitio web ha sido actualizada recientemente. Si realizaste cambios en tu cuenta, puedes ignorar este mensaje.</p>
            <p>Si no realizaste estos cambios o tienes alguna pregunta, por favor cont�ctanos de inmediato.</p>
            <p>Gracias por confiar en nosotros.</p>
            <p>Atentamente,<br>El equipo de Avenida56A</p>
        </div>
        <div class='footer'>
            <p>Avenida56A.</p>
        </div>
    </div>
</body>
</html>
";

                                                // Env�a el correo
                                                if ($mail->send()) {
                                                    $data = array(
                                                            "estado" => 0,
                                                            "correo" => $correo,
                                                            "nombre" => $nombre,
                                                            "telefono" => $telefono,
                                                            "contra" => $contraEn,
                                                            "noticias" => $noticias
                                                         );
                                                                                                                
                                                        $json_data = json_encode($data);                                                      
                                                        echo $json_data;
                                                } else {
                                                    $data = array(
                                                            "estado" => 'Error al enviar correo'                                                         
                                                         );
                                                                                                                
                                                        $json_data = json_encode($data);                                                      
                                                        echo $json_data;
                                                }

                                              
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