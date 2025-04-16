<?php
require_once "DB.php";
session_start();
if(ini_get("session.use_cookies")){
    if($_SESSION["id"] != null)
        echo($_SESSION["id"]);
    else
        echo(0);
}
else
{
    echo(0);
}
