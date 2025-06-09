<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Remplace par ton Client-ID Imgur ici
$clientId = "3e8c618f12e9d25";

if (isset($_FILES["image"])) {
    $file = $_FILES["image"];
    
    // Vérification du type de fichier
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode([
            "success" => false,
            "message" => "Type de fichier non autorisé. Formats acceptés : JPEG, PNG, GIF, WEBP"
        ]);
        exit;
    }

    // Vérification de la taille (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        echo json_encode([
            "success" => false,
            "message" => "L'image ne doit pas dépasser 5MB"
        ]);
        exit;
    }

    $imageData = file_get_contents($file["tmp_name"]);
    $base64 = base64_encode($imageData);

    $url = "https://api.imgur.com/3/image";

    $headers = [
        "Authorization: Client-ID $clientId"
    ];

    $postFields = [
        "image" => $base64,
        "type" => "base64",
        "name" => $file['name'],
        "title" => "Upload via ProfilePro"
    ];

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode([
            "success" => false,
            "message" => "Erreur CURL: " . curl_error($ch)
        ]);
    } else {
        $result = json_decode($response, true);
        if ($result && isset($result['success']) && $result['success']) {
            echo json_encode([
                "success" => true,
                "url" => $result['data']['link'],
                "deletehash" => $result['data']['deletehash'] // Stocker pour suppression future si nécessaire
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Erreur API Imgur",
                "details" => $result
            ]);
        }
    }

    curl_close($ch);
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Aucun fichier reçu ou erreur lors du téléchargement."
    ]);
}
?>
