<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImgurUploader
{
    private string $clientId;
    private string $apiUrl;
    private array $allowedTypes;
    private int $maxSize;

    public function __construct()
    {
        $config = require __DIR__ . '/../../config/imgur.php';
        $this->clientId = $config['client_id'];
        $this->apiUrl = $config['api_url'];
        $this->allowedTypes = $config['allowed_types'];
        $this->maxSize = $config['max_size'];
    }

    public function upload(UploadedFile $file): array
    {
        // Vérification du type de fichier
        if (!in_array($file->getMimeType(), $this->allowedTypes)) {
            throw new \Exception('Type de fichier non autorisé. Types acceptés : ' . implode(', ', $this->allowedTypes));
        }

        // Vérification de la taille
        if ($file->getSize() > $this->maxSize) {
            throw new \Exception('Le fichier est trop volumineux. Taille maximale : ' . ($this->maxSize / 1024 / 1024) . 'MB');
        }

        // Lecture et encodage du fichier
        $imageData = file_get_contents($file->getPathname());
        $base64 = base64_encode($imageData);

        // Préparation de la requête
        $headers = [
            "Authorization: Client-ID {$this->clientId}"
        ];

        $postFields = [
            "image" => $base64,
            "type" => "base64"
        ];

        // Envoi de la requête
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->apiUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            throw new \Exception('Erreur CURL : ' . curl_error($ch));
        }
        
        curl_close($ch);

        // Traitement de la réponse
        $result = json_decode($response, true);
        
        if ($httpCode !== 200 || !isset($result['success']) || !$result['success']) {
            throw new \Exception('Erreur lors de l\'upload vers Imgur : ' . ($result['data']['error'] ?? 'Erreur inconnue'));
        }

        return [
            'success' => true,
            'url' => $result['data']['link'],
            'deletehash' => $result['data']['deletehash'] ?? null
        ];
    }
} 