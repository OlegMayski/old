<?php
require_once "DB.php";

$sql = "SELECT *, COUNT(*) AS tag_count FROM Tags GROUP BY name_tag ORDER BY tag_count DESC";
$stmt = $pdo->query($sql);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>