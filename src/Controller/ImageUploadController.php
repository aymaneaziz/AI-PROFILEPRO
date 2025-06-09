<?php

namespace App\Controller;

use App\Service\ImgurUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/upload')]
class ImageUploadController extends AbstractController
{
    private ImgurUploader $imgurUploader;

    public function __construct(ImgurUploader $imgurUploader)
    {
        $this->imgurUploader = $imgurUploader;
    }

    #[Route('/image', name: 'api_upload_image', methods: ['POST'])]
    public function uploadImage(Request $request): JsonResponse
    {
        try {
            if (!$request->files->has('image')) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Aucun fichier image n\'a été envoyé'
                ], 400);
            }

            $file = $request->files->get('image');
            $result = $this->imgurUploader->upload($file);

            return new JsonResponse([
                'success' => true,
                'url' => $result['url'],
                'deletehash' => $result['deletehash']
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
} 