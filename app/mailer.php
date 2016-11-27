<?php

if (!empty($_POST)){
	$phone = $_POST['phone'];
	$name = $_POST['name'];
	$message = $_POST['message'];
	$error = '';
	if(!$name) {$error .= 'Укажите свое имя. ';}
	if(!$phone) {$error .= 'Укажите номер телефона. ';}
	if(!$message || strlen($message) < 1) {$error .= 'Введите сообщение. ';}

	if (!preg_match("/^([0-9])+$/", $phone)) {$error .= 'Пожалуйста, укажите номер телефона корректно.';}

	if($error =='') {
		$address = "chekulaeva1@yandex.ru";
	  $subject = "Новое сообщение - Обратная связь takoefoto.ru";
		$mes = "Имя: ".$name."\n\nТелефон: +7".$phone."\n\nСообщение: ".$message."\n\n";
		$send = mail ($address,$subject,$mes,"Content-type: text/plain; charset=UTF-8");
		if($send) {echo 'OK';}
	}
	else {echo '<div class="err">'.$error.'</div>';}
}

?>
