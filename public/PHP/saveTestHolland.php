<?php
require_once "DB.php";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_user = $_POST["user"];
    $type = $_POST["type"];
    $score = json_decode($_POST["score"], true);
    $date = date("YmdHis");
    $sql = "INSERT INTO Tests_Holland (id_user, date, type, Realistic, Intelligency, Artistic, Social, Enterprise, Convencial) 
            VALUES (:id_user, :date, :type, :Realistic, :Intelligency, :Artistic, :Social, :Enterprise, :Convencial)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id_user' => $id_user, ':date' => $date, ':type' => $type,
        ':Realistic' => $score['Реалистичный'], ':Intelligency' => $score['Исследовательский'],
        ':Artistic' => $score['Артистичный'], ':Social' => $score['Социальный'],
        ':Enterprise' => $score['Предпринимательский'], ':Convencial' => $score['Конвенциональный'],
    ]);
    echo "Тест успешно сохранен.";
} else {
    echo "Неверный запрос.";
}
?>