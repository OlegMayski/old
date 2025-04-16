<?php
require_once "DB.php";
if (isset($_POST['id_image']) && isset($_POST['id_user']) && isset($_POST['content'])) {
    // Получаем данные из POST-запроса
    $id_image = $_POST['id_image'];
    $id_user = $_POST['id_user'];
    $content = $_POST['content'];
    try {
        // Подготавливаем SQL-запрос
        $sql = "INSERT INTO Comments (id_image, id_user, content, date_comment) VALUES (?, ?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        // Выполняем запрос, передавая значения в виде массива
        $stmt->execute([$id_image, $id_user, $content]);

        // Возвращаем успешный ответ в формате JSON
        echo json_encode(array("success" => true, "message" => "Комментарий успешно добавлен"));
    } catch (PDOException $e) {
        // Если возникла ошибка, возвращаем сообщение об ошибке в формате JSON
        echo json_encode(array("success" => false, "message" => "Ошибка при выполнении запроса: " . $e->getMessage()));
    }
} else {
    // Если не были переданы все необходимые данные, возвращаем сообщение об ошибке в формате JSON
    echo json_encode(array("success" => false, "message" => "Не переданы все необходимые данные", "ARR" => $_POST));
}
