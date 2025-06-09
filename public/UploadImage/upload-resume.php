<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Remplace par ton Client-ID Imgur ici
$clientId = "3e8c618f12e9d25";

if (isset($_FILES["image"])) {
    $imageData = file_get_contents($_FILES["image"]["tmp_name"]);
    $base64 = base64_encode($imageData);

    $url = "https://api.imgur.com/3/image";

    $headers = [
        "Authorization: Client-ID $clientId"
    ];

    $postFields = [
        "image" => $base64,
        "type" => "base64"
    ];

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

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
                "url" => $result['data']['link']  // URL publique de l'image Imgur
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
    echo json_encode(["success" => false, "message" => "Aucun fichier reçu."]);
}
?>
