<?php
header("Content-type:text/html, charset:utf8");
$act = isset($_GET['act']) ? $_GET['act'] : "";

$a_array = array("a"=>"长亭外，古道边，芳草碧连天", "b"=>"晚风拂柳笛声残,夕阳山外山 ", "c"=>"天之涯,地之角,知交半零落 ", "d"=>"人生难得是欢聚,唯有别离多");
// $b_array = array("a"=>"斜阳草树", "b"=>"寻常巷陌，人道寄奴曾住。", "c"=>"想当年，金戈铁马，气吞万里如虎。");
// $c_array = array("a"=>"孩儿立志出乡关,学不成名誓不还", "b"=>"埋骨何须桑梓地，人生无处不青山");
// $d_array = array("a"=>"公子王孙逐后尘", "b"=>"绿珠垂泪滴罗巾", "c"=>"侯门一入深如海", "d"=>"从此萧郎是路人");
// $e_array = array("a"=>"天街小雨润如酥", "b"=>"草色遥看近却无", "c"=>"最是一年春好处", "d"=>"绝胜烟柳满皇都");

echo $a_array;
exit(json_encode($a_array));

if( $act ){
    switch ($act) {
        case 'a':
            echo json_encode($a_array);
            break;
        case 'b':
            echo json_encode($b_array);
            break;
        case 'c':
            echo json_encode($c_array);
            break;
        case 'd':
            echo json_encode($d_array);
            break;
        case 'e':
            echo json_encode($e_array);
            break;
    }
}else{
    echo json_encode($a_array);
}


?>
