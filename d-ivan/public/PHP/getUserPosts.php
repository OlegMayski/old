<?php
require_once "DB.php";

if (isset($_GET['id_user'])) {
    $id_user = $_GET['id_user'];

    $sql = "SELECT id_image, src FROM Posts1 WHERE id_user = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_user]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
} else {
    echo json_encode(["error"]);
}
?>