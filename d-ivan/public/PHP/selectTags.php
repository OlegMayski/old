<?php
require_once "DB.php";

$sql = "SELECT * FROM Tags";
$stmt = $pdo->query($sql);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>