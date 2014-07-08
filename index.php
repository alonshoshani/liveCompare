<?php
		$url="http://localhost:3000/addDelta";
		$data=array();
		$ch = curl_init($url);
		$json_data = json_encode($data);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		//curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
		curl_setopt($ch, CURLOPT_POSTFIELDS, array('file' => '@' . realpath('example.txt')));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,10000);
		$result = curl_exec($ch);
		curl_close ($ch);
		echo $result;
?>