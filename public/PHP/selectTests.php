<?php
require_once "DB.php";
session_start();
$id_user = $_SESSION['id'];
$sql = "SELECT t.id, t.name, t.description, t.src, t.tags, r.score, r.length, r.date 
            FROM Tests t 
            LEFT JOIN (
                SELECT id_test, score, length, date
                FROM Tests_result
                WHERE (id_user, date) IN (
                    SELECT id_user, MAX(date)
                    FROM Tests_result
                    WHERE id_user = :id_user
                    GROUP BY id_test
                )
            ) r ON t.id = r.id_test 
            WHERE t.id IN (SELECT id_test FROM Tests_result WHERE id_user = :id_user)
            ORDER BY t.id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id_user' => $id_user]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $sqlHolland = "SELECT * FROM Tests_Holland 
                   WHERE id_user = :id_user 
                   ORDER BY date DESC 
                   LIMIT 1";
    $stmtHolland = $pdo->prepare($sqlHolland);
    $stmtHolland->execute([':id_user' => $id_user]);
    $resultHolland = $stmtHolland->fetch(PDO::FETCH_ASSOC);
    /*$pass = "user";
    $pass1 = password_hash($pass, PASSWORD_DEFAULT);
    $pass2 = password_hash($pass, PASSWORD_DEFAULT);
    $pass3 = password_verify($pass, $pass1);
    $pass4 = password_verify($pass, $pass2);*/

    $response = [
        'tests' => $result,
        'holland' => $resultHolland
    ];

    echo json_encode($response);
?>