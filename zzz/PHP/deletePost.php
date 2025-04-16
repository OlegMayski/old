<?php
require_once "DB.php";

if (isset($_POST['id_image'])) {
    $id_image = $_POST['id_image'];
    $sql = "SELECT src FROM Posts1 WHERE id_image = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_image]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $src = $_SERVER['DOCUMENT_ROOT'] . $result['src'];
        $pdo->beginTransaction();
        
        try {

            $sql = "DELETE FROM Posts1 WHERE id_image = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id_image]);

            $sql = "DELETE FROM Tags WHERE id_image = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id_image]);

            if (file_exists($src)) {
                unlink($src);
            }
            $pdo->commit();
            
            echo "Post deleted successfully.";
        } catch (Exception $e) {
            $pdo->rollBack();
            echo "Failed to delete post: " . $e->getMessage();
        }
    } else {
        echo "Post not found.";
    }
} else {
    echo "Invalid request.";
}
?>