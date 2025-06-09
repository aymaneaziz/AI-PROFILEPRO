<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

if (isset($_FILES["image"])) {
    $file = $_FILES["image"];
    
    // Validation du fichier
    $validation = validateFile($file);
    if (!$validation['success']) {
        echo json_encode($validation);
        exit;
    }

    // Upload vers Imgur
    $result = uploadToImgur($file);
    echo json_encode($result);
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Aucun fichier reçu ou erreur lors du téléchargement."
    ]);
}
?>
