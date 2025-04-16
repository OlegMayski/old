<?php
session_start();
require_once 'DB.php';

$data = json_decode(file_get_contents('php://input'), true);
$login = $data['login'];
$password = $data['password'];

$sql = "SELECT * FROM Accounts_Test WHERE login = :login AND password = :password";
$stmt = $pdo->prepare($sql);

$stmt->bindParam(':login', $login);
$stmt->bindParam(':password', $password);

$stmt->execute();
$select = $stmt->fetchAll(PDO::FETCH_ASSOC);

if(count($select)==1)
{
    $_SESSION['name'] = $login;
    $_SESSION['id'] = $select[0]['id'];
    $exit = $_COOKIE[session_name()];
    echo $_SESSION['id'];
}
else
{
    echo 0;
    $_SESSION = [];
    var_dump(session_destroy());
    if(ini_get("session.use_cookies")){
        $params = session_get_cookie_params();
        setcookie(session_name(),'', time()-42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    
}

