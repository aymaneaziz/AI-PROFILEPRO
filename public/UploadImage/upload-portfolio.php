<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$targetDir = "c:/xampp/htdocs/ai-resume-image/portfolio/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true); // Crée le dossier s’il n’existe pas
}

if (isset($_FILES["image"])) {
    $fileName = basename($_FILES["image"]["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $url = "http://localhost/ai-resume-image/portfolio/" . $fileName;
        echo json_encode(["success" => true, "url" => $url]);
    } else {
        echo json_encode(["success" => false, "message" => "Échec du déplacement du fichier."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Aucun fichier reçu."]);
}
?>
