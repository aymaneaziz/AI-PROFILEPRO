<?php
// Configuration Imgur
define('IMGUR_CLIENT_ID', '3e8c618f12e9d25');
define('IMGUR_API_URL', 'https://api.imgur.com/3/image');

// Configuration des fichiers
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_TYPES', [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
]);

// Fonctions utilitaires
function validateFile($file) {
    if (!in_array($file['type'], ALLOWED_TYPES)) {
        return [
            'success' => false,
            'message' => 'Type de fichier non autorisé. Formats acceptés : JPEG, PNG, GIF, WEBP'
        ];
    }

    if ($file['size'] > MAX_FILE_SIZE) {
        return [
            'success' => false,
            'message' => 'L\'image ne doit pas dépasser 5MB'
        ];
    }

    return ['success' => true];
}

function uploadToImgur($file) {
    $imageData = file_get_contents($file["tmp_name"]);
    $base64 = base64_encode($imageData);

    $headers = [
        "Authorization: Client-ID " . IMGUR_CLIENT_ID
    ];

    $postFields = [
        "image" => $base64,
        "type" => "base64",
        "name" => $file['name'],
        "title" => "Upload via ProfilePro"
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, IMGUR_API_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $error = curl_errno($ch) ? curl_error($ch) : null;
    curl_close($ch);

    if ($error) {
        return [
            'success' => false,
            'message' => "Erreur CURL: " . $error
        ];
    }

    $result = json_decode($response, true);
    if ($result && isset($result['success']) && $result['success']) {
        return [
            'success' => true,
            'url' => $result['data']['link'],
            'deletehash' => $result['data']['deletehash']
        ];
    }

    return [
        'success' => false,
        'message' => "Erreur API Imgur",
        'details' => $result
    ];
}
?> 