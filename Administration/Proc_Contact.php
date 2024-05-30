<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {


    try {
     
           echo "<script>alert('hh');</script>";
      

    } catch (Exception $ex) {
        echo "<script>alert('Se produjo un error: " . $ex->getMessage() . "');
             window.location.href = 'Contact.html';</script>";
        exit();
    }


}



?>
