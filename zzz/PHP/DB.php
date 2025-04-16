<?php
$sname = "178.57.221.16";
$uname = "p654633_van_user";
$upass = "nS7wA8wV2v";
$dbname = "p654633_van_kurs";
header("Content-Type: text/html; charset=utf-8");
try {
    $pdo = new PDO("mysql:host=$sname;dbname=$dbname;charset=utf8mb4", $uname, $upass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Ошибка подключения к базе данных: " . $e->getMessage();
    die();
} 
?>