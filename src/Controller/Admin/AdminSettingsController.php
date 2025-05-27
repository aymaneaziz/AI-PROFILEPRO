<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/settings')]
class AdminSettingsController extends AbstractController
{
    #[Route('/', name: 'admin_settings_index', methods: ['GET'])]
    public function index(): Response
    {
        // Informations simples à afficher
        $settings = [
            'site_name' => 'ProfilePro',
            'site_description' => 'Plateforme intelligente de génération de CV et de portfolios personnalisés avec IA',
            'contact_email' => 'aymaneaziz1234@gmail.com',
         
        ];
        
        return $this->render('admin/settings/index.html.twig', [
            'settings' => $settings,
        ]);
    }
} 