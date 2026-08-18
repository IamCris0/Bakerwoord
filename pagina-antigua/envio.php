<?php
$errors = '';
$myemail = 'info@creatividad-laser.com';//<-----Put Your email address here.
if(empty($_POST['name'])  || 
   empty($_POST['email']) ||
   empty($_POST['subject']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: todos los campos son requeridos";
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$subject = $_POST['subject']; 
$message = $_POST['message']; 

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: E-mail incorrecto";
}

if( empty($errors))

{

$to = $myemail;

$email_subject = "Contacto desde sitio web: $name";

$email_body = "Has recibido un nuevo mensaje. ".

" Conoce los detalles:\n Nombre: $name \n ".

"Email: $email_address\n Asunto: $subject\n Mensaje: \n $message";

$headers = "From: $myemail\n";

$headers .= "Reply-To: $email_address";

mail($to,$email_subject,$email_body,$headers);

//redirect to the 'home' page

header('Location: index.html');

}
?>