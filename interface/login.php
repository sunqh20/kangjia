<?php
    include('./conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $sql = "select * from users where user_name='$username'";
    $res = $mysqli->query($sql);
    if($res->num_rows>0){
        echo false;
        $mysqli->close();
        die;
    }else{
        $str = "INSERT INTO `users`(`user_name`, `user_password`) VALUES ('$username','$password')";
        $result = $mysqli->query($str);
        echo true;
        $mysqli->close();
        die;
    }
    
    
?>