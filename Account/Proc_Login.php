<?php
require '../../Private/Credentials/DataBase/connection.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
      try {
                // Recibir y limpiar los datos del formulario
                $name = null;
                $correo = htmlspecialchars($_POST["correo"]);
                $contrasena = htmlspecialchars($_POST["contrasena"]);
                $recordar = isset($_POST["recordar"]) ? "True" : "False"; // Verificar si se guarda el usuario
                $contrasena_encriptada = null;
                 //Llamar al procedimiento almacenado para la autenticacion
                $queryListar = "CALL Cte_Login('$correo', '$contrasena')";
                $result = mysqli_query($conn, $queryListar);

        if ($result === false) {
                    echo "<script>alert('Error en la base de datos. Por favor, intentalo de nuevo más tarde.');
                          window.location.href = 'Login.html';</script>";
                    exit();
            } else {
               
                if ($row = mysqli_fetch_assoc($result)) {
                        // Si hay resultados en $result, se carga la contraseña encriptada en la variable $contrasena_encriptada y el nombre
                    $name = $row['Name'];
                    $contrasena_encriptada = $row['Pass'];

                        if ($recordar === "True") {

                            echo "<script>
                                                var Avn56User = [
                                                    { correo: '" . $correo . "',nombre: '" . $name . "', pswrd:'" . $contrasena_encriptada . "'}
                                                ];
                                                localStorage.setItem('Avn56User', JSON.stringify(Avn56User));
                                                sessionStorage.setItem('Avn56User', JSON.stringify(Avn56User));
                                                alert('Usuario Guardado, Bienvenido ".$name."');
                                                if (window.self !== window.top) {
                                                    window.parent.location.reload();
                                                }else{
                                                window.location.href = '../index.html';
                                                }
                                               
                                              </script>";
                        } else {
                            echo "<script>
                                               var Avn56User = [
                                                    { correo: '" . $correo . "',nombre: '" . $name . "', pswrd:'" . $contrasena_encriptada . "'}
                                                ];
                                            alert('Bienvenido " . $name . "');
                                            localStorage.removeItem('Avn56User');
                                            sessionStorage.setItem('Avn56User', JSON.stringify(Avn56User));
                                             if (window.self !== window.top) {
                                                   window.parent.location.reload();
                                             }else{
                                                window.location.href = '../index.html';
                                             }
                                            </script>";
                        }
                        exit();
                } else {
                    echo "<script>alert('Usuario inv\u00E1lido. Por favor, comprueba tus credenciales.');
                             window.location.href = 'Login.html';
                             </script>";
                    exit();
                }

            }
    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
                       window.location.href = 'Login.html';
                        </script>";
        exit();
    }
}


 ?> 