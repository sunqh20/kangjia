<?php
    include('./conn.php');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // sql语句 查询
    $sql = "select * from users where user_name='$username' and user_password='$password'";
    // echo $sql;
    // die;
    // 执行sql语句
    $res = $mysqli->query($sql);

    // var_dump($res);
    // die;
    if($res->num_rows>0){
        $row = $res->fetch_assoc(); // 从结果集获取一条数据
        // php中 添加cookie  setcookie(键,值,生存期,路径)
        // php 获得当前时间 time()
        setcookie('username',$row['user_name'],time()+3600*24,'/');
        setcookie('isLogin','true',time()+3600*24,'/');
        echo 'true';
    }else{
        echo 'false';
    }

    $mysqli->close();
?>