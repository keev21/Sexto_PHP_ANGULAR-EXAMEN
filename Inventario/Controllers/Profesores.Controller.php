<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../Models/Profesores.model.php');
$profesores = new Clase_Profesores;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $profesores->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $ID_profesor = $_POST["ID_profesor"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $profesores->uno($ID_profesor); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $ID_escuela = $_POST["ID_escuela"];
        $nombre_profesor = $_POST["nombre_profesor"];
        $materia = $_POST["materia"];
        $salario = $_POST["salario"];


        $datos = array(); //defino un arreglo
        $datos = $profesores->insertar($ID_escuela, $nombre_profesor, $materia, $salario); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_profesor = $_POST["ID_profesor"];
        $ID_escuela = $_POST["ID_escuela"];
        $nombre_profesor = $_POST["nombre_profesor"];
        $materia = $_POST["materia"];
        $salario = $_POST["salario"];
        $datos = array(); //defino un arreglo
        $datos = $profesores->actualizar($ID_profesor, $ID_escuela, $nombre_profesor, $materia, $salario); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_profesor = $_POST["ID_profesor"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $profesores->eliminar($ID_profesor); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
