<?php
require_once "DB.php";
$target_dir = "/images/"; // Папка, куда будет загружен файл
$target_file = $_SERVER['DOCUMENT_ROOT'].$target_dir.$_FILES["file"]["name"];
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$id_user = 1;

// Проверка, является ли файл изображением
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Проверка, существует ли файл
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Проверка размера файла
if ($_FILES["file"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Позволяет загружать только определенные типы файлов
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Проверка наличия ошибок при загрузке файла
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// Если все в порядке, попытка загрузить файл
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $src = $target_dir.$_FILES["file"]["name"];
        $sql = "INSERT INTO Posts1 (id_user, src) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id_user, $src]);
        $id_image = $pdo->lastInsertId();

        if($_POST["general"]!=""){
            $tags = explode(" ", $_POST["general"]);
            $sql = "INSERT INTO Tags (id_image, name_tag, type_tag) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            foreach ($tags as $tag) {
                $stmt->execute([$id_image, $tag, "general"]);
            }
        }
        if($_POST["artists"]!=""){
            $tags = explode(" ", $_POST["artists"]);
            $sql = "INSERT INTO Tags (id_image, name_tag, type_tag) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            foreach ($tags as $tag) {
                $stmt->execute([$id_image, $tag, "artists"]);
            }
        }
        if($_POST["copyright"]!=""){
            $tags = explode(" ", $_POST["copyright"]);
            $sql = "INSERT INTO Tags (id_image, name_tag, type_tag) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            foreach ($tags as $tag) {
                $stmt->execute([$id_image, $tag, "copyright"]);
            }
        }
        if($_POST["character"]!=""){
            $tags = explode(" ", $_POST["character"]);
            $sql = "INSERT INTO Tags (id_image, name_tag, type_tag) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            foreach ($tags as $tag) {
                $stmt->execute([$id_image, $tag, "character"]);
            }
        }
        echo "The file ".basename( $_FILES["file"]["name"]). " has been uploaded.".var_export($_FILES).var_export($_POST).$_POST["general"]." id_image=".$id_image;
    } else {
        echo "Sorry, there was an error uploading your file.".$_FILES["file"]["tmp_name"]." ".$target_file;
    }
}
?>