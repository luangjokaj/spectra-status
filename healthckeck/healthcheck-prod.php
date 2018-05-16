<?php
header('Content-Type: application/json');
// create a new cURL resource
error_reporting(E_ALL);
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, 'http://prod.spectra.io/healthcheck');
curl_setopt($ch, CURLOPT_HEADER, 0);

// copy the handle
$ch2 = curl_copy_handle($ch);

// grab URL (http://www.example.com/) and pass it to the browser
$result = curl_exec($ch2);

// close cURL resources, and free up system resources
curl_close($ch2);
curl_close($ch);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
?>