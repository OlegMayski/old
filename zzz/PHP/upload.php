<?php
require_once "DB.php";
$target_dir = "/images/";
$imageFileType = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));

$sql = "SELECT MAX(id_image) as max_id FROM Posts1";
$stmt = $pdo->query($sql);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
$new_id = $result['max_id'] + 1;

$date = date("YmdHis");

$new_filename = $new_id . '-' . $date . '.' . $imageFileType;
if(isset($_POST["id_image"])){
    $new_filename = $_POST["id_image"]. '-' . $date . '.' . $imageFileType;
}
$target_file = $_SERVER['DOCUMENT_ROOT'] . $target_dir . $new_filename;

$uploadOk = 1;
$id_user = $_POST["user"];

// Проверка, является ли файл изображением
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

if (file_exists($target_file) && !isset($_POST["id_image"])) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

if ($_FILES["file"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $src = $target_dir . $new_filename;
        if(isset($_POST["id_image"])){
            $src = $target_dir.$_POST["id_image"] . '-' . $date . '.' . $imageFileType;
            $sql = "UPDATE Posts1 SET src = ? WHERE id_image = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$src, $_POST["id_image"]]);
            // Обновляем теги в таблице Tags
            $tagTypes = ["general", "artists", "copyright", "character"];
            foreach ($tagTypes as $tagType) {
                if (!empty($_POST[$tagType])) {
                    $tags = explode(" ", $_POST[$tagType]);
                    $sql = "DELETE FROM Tags WHERE id_image = ? AND type_tag = ?";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute([$_POST["id_image"], $tagType]);
                    $sql = "INSERT INTO Tags (id_image, name_tag, type_tag) VALUES (?, ?, ?)";
                    $stmt = $pdo->prepare($sql);
                    foreach ($tags as $tag) {
                        $stmt->execute([$_POST["id_image"], $tag, $tagType]);
                    }
                }
            }
            echo "Post updated successfully.";
            exit;
        }
        
        $sql = "INSERT INTO Posts1 (id_image, id_user, src) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$new_id ,$id_user, $src]);
        $id_image = $pdo->lastInsertId();

        $tagTypes = ["general", "artists", "copyright", "character"];        
        foreach ($tagTypes as $tagType) {
            if (!empty($_POST[$tagType])) {
                // Разбиваем строку на теги
                $tags = explode(" ", $_POST[$tagType]);
                $sql = "INSERT INTO Tags (id_image, name_tag, type_tag) VALUES (?, ?, ?)";
                $stmt = $pdo->prepare($sql);
                foreach ($tags as $tag) {
                    $stmt->execute([$id_image, $tag, $tagType]);
                }
            }
        }
        echo "The file " . basename($_FILES["file"]["name"]) . " has been uploaded." . $_POST["general"] . " id_image=" . $id_image;
    } else {
        echo "Sorry, there was an error uploading your file." . $_FILES["file"]["tmp_name"] . " " . $target_file;
    }
}
?>