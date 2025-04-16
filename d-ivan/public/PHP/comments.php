<?php
require_once "DB.php";
if (isset($_POST['id'])) {
    $postId = $_POST['id'];

    $sql = "SELECT Comments.*, Accounts.login FROM Comments 
            INNER JOIN Accounts ON Comments.id_user = Accounts.id_login
            WHERE Comments.id_image = $postId";
    
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
?>