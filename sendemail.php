<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);                          // Passing `true` enables exceptions

$msg = '';
$signal ='';

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$subject = trim($_POST['subject']);
$message = trim($_POST['message']);

try {


	if(count($_POST) == 0) throw new \Exception('Niste popunili sva polja!');

	$emailTextHtml = "<style type='text/css'>body {font-family: Roboto, sans-serif; font-size: 13px; }</style>";
	$emailTextHtml .= "<body>";
	$emailTextHtml .= "<h1>Dobili ste novu poruku</h1><hr>";
	$emailTextHtml .= "<table>";
	$emailTextHtml .= "<tr><th>Od: </th><td>$name</td>";
	$emailTextHtml .= "<tr><th>E-mail: </th><td>$email</td>";
	$emailTextHtml .= "<tr><th>Broj telefona: </th><td>$phone</td>";
	$emailTextHtml .= "<tr><th>Naslov: </th><td>$subject</td>";
	$emailTextHtml .= "<tr><th>Poruka: </th><td>$message</td>";
	$emailTextHtml .= "</table>";
	$emailTextHtml .= "</body>";



    //Server settings
    $mail->SMTPDebug = 2;                               // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.wooddesigndenic.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'contact@wooddesigndenic.com';                 // SMTP username
    $mail->Password = 'vladapetrovcic';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('' . $email, '' . $name);
    $mail->addAddress('contact@wooddesigndenic.com');     //           // Name is optional

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Naslov: ' . $subject;
    $mail->Body    = 'Poruka: </b> ' . $message;
    $mail->AltBody = 'Poruka: </b> ' . $message;

    $mail->send();

    $msg = 'Uspešno ste poslali e-mail, odgovorićemo Vam u najkraćem roku!';
    $signal = 'ok';

} catch (Exception $e) {
    $msg = 'Niste uspeli da pošaljete e-mail, pokušajte malo kasnije! ' . $e;
    $signal = 'bad' . $mail->ErrorInfo;
}

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

	$data = array(
	    'signal' => $signal,
	    'msg' => $msg
	);

    header('Content-Type: application/json');

    echo json_encode($data);
    
}
// else just display the message
else {
    echo $msg;
}

?>