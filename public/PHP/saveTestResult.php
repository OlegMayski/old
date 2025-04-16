<?php
require_once "DB.php";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_user = $_POST["user"];
    $id_test = $_POST["id_test"];
    $score = $_POST["score"];
    $length = $_POST["length"];
    $date = date("YmdHis");
    $sql = "INSERT INTO Tests_result (id_test, id_user, score, length, date) 
            VALUES (:id_test, :id_user, :score, :length, :date)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id_test' => $id_test,
        ':id_user' => $id_user,
        ':score' => $score,
        ':length' => $length,
        ':date' => $date,
    ]);
    echo "Тест успешно сохранен.";
} else {
    echo "Неверный запрос.";
}
?>