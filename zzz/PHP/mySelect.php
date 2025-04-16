<?php
require_once "DB.php";

$sql = "SELECT * FROM Posts1";
$stmt = $pdo->query($sql);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>