<?php
require_once "DB.php";

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);
$login = $data['login'];
$password = $data['password'];

// Проверяем, существует ли уже такой логин в базе данных
$sql_check = "SELECT * FROM Accounts WHERE login = ?";
$stmt_check = $pdo->prepare($sql_check);
$stmt_check->execute([$login]);
$result = $stmt_check->fetch(PDO::FETCH_ASSOC);

if ($result) {
    echo json_encode(["message" => "Пользователь с таким логином уже существует"]);
} else {
    $sql_insert = "INSERT INTO Accounts (login, password) VALUES (?, ?)";
    $stmt_insert = $pdo->prepare($sql_insert);

    if ($stmt_insert->execute([$login, $password])) {
        echo json_encode(["message" => "Регистрация прошла успешно"]);
    } else {
        echo json_encode(["message" => "Произошла ошибка при регистрации"]);
    }
}
?>