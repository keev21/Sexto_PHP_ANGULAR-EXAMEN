<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}


require_once('../Models/Escuelas.model.php');
$escuelas = new Clase_escuelas;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $escuelas->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;

    case "uno":
        $ID_escuela = $_POST["ID_escuela"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $escuelas->uno($ID_escuela); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $Nombre_escuela = $_POST["Nombre_escuela"];
        $Ciudad = $_POST["Ciudad"];
        $Nivel_educativo = $_POST["Nivel_educativo"];
        

        $datos = array(); //defino un arreglo
        $datos = $escuelas->insertar($Nombre_escuela, $Ciudad, $Nivel_educativo); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
        
    case 'actualizar':
        $ID_escuela = $_POST["ID_escuela"];
        $Nombre_escuela = $_POST["Nombre_escuela"];
        $Ciudad = $_POST["Ciudad"];
        $Nivel_educativo = $_POST["Nivel_educativo"];
        $datos = array(); //defino un arreglo
        $datos = $escuelas->actualizar($ID_escuela, $Nombre_escuela, $Ciudad, $Nivel_educativo); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_escuela = $_POST["ID_escuela"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $escuelas->eliminar($ID_escuela); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}