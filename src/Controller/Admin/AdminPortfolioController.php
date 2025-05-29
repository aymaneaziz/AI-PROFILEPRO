<?php

namespace App\Controller\Admin;

use App\Entity\UserPortfolio;
use App\Entity\SkillsPortfolio;
use App\Entity\ExperiencesPortfolio;
use App\Entity\EducationPortfolio;
use App\Entity\ProjectsPortfolio;
use App\Entity\CertificatesPortfolio;
use App\Entity\SocialLinksPortfolio;
use App\Repository\UserPortfolioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\SkillsPortfolioForm;
use App\Form\ExperiencesPortfolioForm;
use App\Form\EducationPortfolioForm;
use App\Form\ProjectsPortfolioForm;
use App\Form\CertificatesPortfolioForm;
use App\Form\SocialLinksPortfolioForm;

#[Route('/admin/portfolio')]
class AdminPortfolioController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPortfolioRepository $portfolioRepository;

    public function __construct(EntityManagerInterface $entityManager, UserPortfolioRepository $portfolioRepository)
    {
        $this->entityManager = $entityManager;
        $this->portfolioRepository = $portfolioRepository;
    }

    #[Route('/', name: 'admin_portfolio_index', methods: ['GET'])]
    public function index(): Response
    {
        $portfolios = $this->portfolioRepository->findAll();
        
        // Calcul des statistiques
        $stats = [
            'total' => count($portfolios),
            'with_skills' => 0,
            'with_experiences' => 0,
            'with_education' => 0,
            'with_projects' => 0,
            'with_certificates' => 0,
            'with_social' => 0,
        ];

        foreach ($portfolios as $portfolio) {
            if ($portfolio->getSkillsPortfolio()->count() > 0) $stats['with_skills']++;
            if ($portfolio->getExperiencesPortfolio()->count() > 0) $stats['with_experiences']++;
            if ($portfolio->getEducationPortfolio()->count() > 0) $stats['with_education']++;
            if ($portfolio->getProjectsPortfolio()->count() > 0) $stats['with_projects']++;
            if ($portfolio->getCertificatesPortfolio()->count() > 0) $stats['with_certificates']++;
            if ($portfolio->getSocialLinksPortfolio()->count() > 0) $stats['with_social']++;
        }

        return $this->render('admin/portfolio/index.html.twig', [
            'portfolios' => $portfolios,
            'stats' => $stats,
        ]);
    }

    #[Route('/new', name: 'admin_portfolio_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $portfolio = new UserPortfolio();
        
        if ($request->isMethod('POST')) {
            $portfolio->setTitle($request->request->get('title'));
            $portfolio->setUserEmail($request->request->get('userEmail'));
            $portfolio->setUserName($request->request->get('userName'));
            $portfolio->setPortfolioID($request->request->get('portfolioID'));
            $portfolio->setFullName($request->request->get('fullName'));
            $portfolio->setJobTitle($request->request->get('jobTitle'));
            $portfolio->setProfilePicture($request->request->get('profilePicture'));
            $portfolio->setBio($request->request->get('bio'));
            $portfolio->setThemeColor($request->request->get('themeColor'));
            $portfolio->setIsPublic($request->request->get('isPublic') === 'on');

            $this->entityManager->persist($portfolio);
            $this->entityManager->flush();

            $this->addFlash('success', 'Portfolio créé avec succès.');
            return $this->redirectToRoute('admin_portfolio_index');
        }

        return $this->render('admin/portfolio/new.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/{id}', name: 'admin_portfolio_show', methods: ['GET'])]
    public function show(UserPortfolio $portfolio): Response
    {
        return $this->render('admin/portfolio/show.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin_portfolio_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, UserPortfolio $portfolio): Response
    {
        if ($request->isMethod('POST')) {
            $portfolio->setTitle($request->request->get('title'));
            $portfolio->setUserEmail($request->request->get('userEmail'));
            $portfolio->setUserName($request->request->get('userName'));
            $portfolio->setPortfolioID($request->request->get('portfolioID'));
            $portfolio->setFullName($request->request->get('fullName'));
            $portfolio->setJobTitle($request->request->get('jobTitle'));
            $portfolio->setProfilePicture($request->request->get('profilePicture'));
            $portfolio->setBio($request->request->get('bio'));
            $portfolio->setThemeColor($request->request->get('themeColor'));
            $portfolio->setIsPublic($request->request->get('isPublic') === 'on');

            $this->entityManager->flush();

            $this->addFlash('success', 'Portfolio modifié avec succès.');
            return $this->redirectToRoute('admin_portfolio_index');
        }

        return $this->render('admin/portfolio/edit.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/{id}', name: 'admin_portfolio_delete', methods: ['POST'])]
    public function delete(Request $request, UserPortfolio $portfolio): Response
    {
        if ($this->isCsrfTokenValid('delete'.$portfolio->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($portfolio);
            $this->entityManager->flush();
            $this->addFlash('success', 'Portfolio supprimé avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_index');
    }

    // Skills Portfolio
    #[Route('/{id}/skills/new', name: 'admin_portfolio_skills_new', methods: ['POST'])]
    public function newSkill(Request $request, UserPortfolio $portfolio): Response
    {
        $skill = new SkillsPortfolio();
        $skill->setName($request->request->get('name'));
        $skill->setLevel($request->request->get('level'));
        $skill->setUserPortfolio($portfolio);

        $this->entityManager->persist($skill);
        $this->entityManager->flush();

        $this->addFlash('success', 'La compétence a été ajoutée avec succès.');
        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    #[Route('/{id}/skills/{skillId}/edit', name: 'admin_portfolio_skills_edit', methods: ['GET', 'POST'])]
    public function editSkill(Request $request, UserPortfolio $portfolio, int $skillId): Response
    {
        $skill = $this->entityManager->getRepository(SkillsPortfolio::class)->find($skillId);
        
        if (!$skill || $skill->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Compétence non trouvée');
        }

        if ($request->isMethod('POST')) {
            $skill->setName($request->request->get('name'));
            $skill->setLevel($request->request->get('level'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Compétence modifiée avec succès.');
            return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
        }

        return $this->render('admin/portfolio/skills/edit.html.twig', [
            'portfolio' => $portfolio,
            'skill' => $skill,
        ]);
    }

    #[Route('/{id}/skills/{skillId}/delete', name: 'admin_portfolio_skills_delete', methods: ['POST'])]
    public function deleteSkill(Request $request, UserPortfolio $portfolio, int $skillId): Response
    {
        $skill = $this->entityManager->getRepository(SkillsPortfolio::class)->find($skillId);
        
        if (!$skill || $skill->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Compétence non trouvée');
        }

        if ($this->isCsrfTokenValid('delete_skill'.$skill->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($skill);
            $this->entityManager->flush();
            $this->addFlash('success', 'Compétence supprimée avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    // Experiences Portfolio
    #[Route('/{id}/experience/new', name: 'admin_portfolio_experience_new', methods: ['POST'])]
    public function newExperience(Request $request, UserPortfolio $portfolio): Response
    {
        $experience = new ExperiencesPortfolio();
        $experience->setTitle($request->request->get('title'));
        $experience->setCompany($request->request->get('company'));
        $experience->setStartDate($request->request->get('startDate'));
        $experience->setEndDate($request->request->get('endDate'));
        $experience->setCurrent($request->request->get('current') === 'on');
        $experience->setDescription($request->request->get('description'));
        $experience->setUserPortfolio($portfolio);

        $this->entityManager->persist($experience);
        $this->entityManager->flush();

        $this->addFlash('success', 'L\'expérience a été ajoutée avec succès.');
        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    #[Route('/{id}/experience/{experienceId}/edit', name: 'admin_portfolio_experience_edit', methods: ['GET', 'POST'])]
    public function editExperience(Request $request, UserPortfolio $portfolio, int $experienceId): Response
    {
        $experience = $this->entityManager->getRepository(ExperiencesPortfolio::class)->find($experienceId);
        
        if (!$experience || $experience->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Expérience non trouvée');
        }

        if ($request->isMethod('POST')) {
            $experience->setTitle($request->request->get('title'));
            $experience->setCompany($request->request->get('company'));
            $experience->setStartDate($request->request->get('startDate'));
            $experience->setEndDate($request->request->get('endDate') ? new \DateTime($request->request->get('endDate')) : null);
            $experience->setCurrent($request->request->get('current') ? true : false);
            $experience->setDescription($request->request->get('description'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Expérience modifiée avec succès.');
            return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
        }

        return $this->render('admin/portfolio/experience/edit.html.twig', [
            'portfolio' => $portfolio,
            'experience' => $experience,
        ]);
    }

    #[Route('/{id}/experience/{experienceId}/delete', name: 'admin_portfolio_experience_delete', methods: ['POST'])]
    public function deleteExperience(Request $request, UserPortfolio $portfolio, int $experienceId): Response
    {
        $experience = $this->entityManager->getRepository(ExperiencesPortfolio::class)->find($experienceId);
        
        if (!$experience || $experience->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Expérience non trouvée');
        }

        if ($this->isCsrfTokenValid('delete_experience'.$experience->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($experience);
            $this->entityManager->flush();
            $this->addFlash('success', 'Expérience supprimée avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    // Education Portfolio
    #[Route('/{id}/education/new', name: 'admin_portfolio_education_new', methods: ['POST'])]
    public function newEducation(Request $request, UserPortfolio $portfolio): Response
    {
        $education = new EducationPortfolio();
        $education->setDegree($request->request->get('degree'));
        $education->setInstitution($request->request->get('institution'));
        $education->setStartDate($request->request->get('startDate'));
        $education->setEndDate($request->request->get('endDate'));
        $education->setCurrent($request->request->get('current') === 'on');
        $education->setUserPortfolio($portfolio);

        $this->entityManager->persist($education);
        $this->entityManager->flush();

        $this->addFlash('success', 'La formation a été ajoutée avec succès.');
        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    #[Route('/{id}/education/{educationId}/edit', name: 'admin_portfolio_education_edit', methods: ['GET', 'POST'])]
    public function editEducation(Request $request, UserPortfolio $portfolio, int $educationId): Response
    {
        $education = $this->entityManager->getRepository(EducationPortfolio::class)->find($educationId);
        
        if (!$education || $education->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Formation non trouvée');
        }

        if ($request->isMethod('POST')) {
            $education->setDegree($request->request->get('degree'));
            $education->setInstitution($request->request->get('institution'));
            $education->setStartDate($request->request->get('startDate'));
            $education->setEndDate($request->request->get('endDate') ? new \DateTime($request->request->get('endDate')) : null);
            $education->setCurrent($request->request->get('current') ? true : false);

            $this->entityManager->flush();

            $this->addFlash('success', 'Formation modifiée avec succès.');
            return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
        }

        return $this->render('admin/portfolio/education/edit.html.twig', [
            'portfolio' => $portfolio,
            'education' => $education,
        ]);
    }

    #[Route('/{id}/education/{educationId}/delete', name: 'admin_portfolio_education_delete', methods: ['POST'])]
    public function deleteEducation(Request $request, UserPortfolio $portfolio, int $educationId): Response
    {
        $education = $this->entityManager->getRepository(EducationPortfolio::class)->find($educationId);
        
        if (!$education || $education->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Formation non trouvée');
        }

        if ($this->isCsrfTokenValid('delete_education'.$education->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($education);
            $this->entityManager->flush();
            $this->addFlash('success', 'Formation supprimée avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    // Projects Portfolio
    #[Route('/{id}/project/new', name: 'admin_portfolio_project_new', methods: ['POST'])]
    public function newProject(Request $request, UserPortfolio $portfolio): Response
    {
        $project = new ProjectsPortfolio();
        $project->setTitle($request->request->get('title'));
        $project->setDescription($request->request->get('description'));
        $project->setTechnologies($request->request->get('technologies'));
        $project->setImage($request->request->get('image'));
        $project->setUrl($request->request->get('url'));
        $project->setUserPortfolio($portfolio);

        $this->entityManager->persist($project);
        $this->entityManager->flush();

        $this->addFlash('success', 'Le projet a été ajouté avec succès.');
        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    #[Route('/{id}/project/{projectId}/edit', name: 'admin_portfolio_project_edit', methods: ['GET', 'POST'])]
    public function editProject(Request $request, UserPortfolio $portfolio, int $projectId): Response
    {
        $project = $this->entityManager->getRepository(ProjectsPortfolio::class)->find($projectId);
        
        if (!$project || $project->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Projet non trouvé');
        }

        if ($request->isMethod('POST')) {
            $project->setTitle($request->request->get('title'));
            $project->setDescription($request->request->get('description'));
            $project->setTechnologies($request->request->get('technologies'));
            $project->setImage($request->request->get('image'));
            $project->setUrl($request->request->get('url'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Projet modifié avec succès.');
            return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
        }

        return $this->render('admin/portfolio/project/edit.html.twig', [
            'portfolio' => $portfolio,
            'project' => $project,
        ]);
    }

    #[Route('/{id}/project/{projectId}/delete', name: 'admin_portfolio_project_delete', methods: ['POST'])]
    public function deleteProject(Request $request, UserPortfolio $portfolio, int $projectId): Response
    {
        $project = $this->entityManager->getRepository(ProjectsPortfolio::class)->find($projectId);
        
        if (!$project || $project->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Projet non trouvé');
        }

        if ($this->isCsrfTokenValid('delete_project'.$project->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($project);
            $this->entityManager->flush();
            $this->addFlash('success', 'Projet supprimé avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    // Certificates Portfolio
    #[Route('/{id}/certificate/new', name: 'admin_portfolio_certificate_new', methods: ['POST'])]
    public function newCertificate(Request $request, UserPortfolio $portfolio): Response
    {
        $certificate = new CertificatesPortfolio();
        $certificate->setName($request->request->get('name'));
        $certificate->setIssuer($request->request->get('issuer'));
        $certificate->setDate($request->request->get('date'));
        $certificate->setUrl($request->request->get('url'));
        $certificate->setUserPortfolio($portfolio);

        $this->entityManager->persist($certificate);
        $this->entityManager->flush();

        $this->addFlash('success', 'Le certificat a été ajouté avec succès.');
        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    #[Route('/{id}/certificate/{certificateId}/edit', name: 'admin_portfolio_certificate_edit', methods: ['GET', 'POST'])]
    public function editCertificate(Request $request, UserPortfolio $portfolio, int $certificateId): Response
    {
        $certificate = $this->entityManager->getRepository(CertificatesPortfolio::class)->find($certificateId);
        
        if (!$certificate || $certificate->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Certificat non trouvé');
        }

        if ($request->isMethod('POST')) {
            $certificate->setName($request->request->get('name'));
            $certificate->setIssuer($request->request->get('issuer'));
            $certificate->setDate($request->request->get('date'));
            $certificate->setUrl($request->request->get('url'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Certificat modifié avec succès.');
            return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
        }

        return $this->render('admin/portfolio/certificate/edit.html.twig', [
            'portfolio' => $portfolio,
            'certificate' => $certificate,
        ]);
    }

    #[Route('/{id}/certificate/{certificateId}/delete', name: 'admin_portfolio_certificate_delete', methods: ['POST'])]
    public function deleteCertificate(Request $request, UserPortfolio $portfolio, int $certificateId): Response
    {
        $certificate = $this->entityManager->getRepository(CertificatesPortfolio::class)->find($certificateId);
        
        if (!$certificate || $certificate->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Certificat non trouvé');
        }

        if ($this->isCsrfTokenValid('delete_certificate'.$certificate->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($certificate);
            $this->entityManager->flush();
            $this->addFlash('success', 'Certificat supprimé avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    // Social Links Portfolio
    #[Route('/{id}/social/new', name: 'admin_portfolio_social_new', methods: ['POST'])]
    public function newSocial(Request $request, UserPortfolio $portfolio): Response
    {
        $socialLink = new SocialLinksPortfolio();
        $socialLink->setPlatform($request->request->get('platform'));
        $socialLink->setUrl($request->request->get('url'));
        $socialLink->setUserPortfolio($portfolio);

        $this->entityManager->persist($socialLink);
        $this->entityManager->flush();

        $this->addFlash('success', 'Le lien social a été ajouté avec succès.');
        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }

    #[Route('/{id}/social/{socialId}/edit', name: 'admin_portfolio_social_edit', methods: ['GET', 'POST'])]
    public function editSocial(Request $request, UserPortfolio $portfolio, int $socialId): Response
    {
        $social = $this->entityManager->getRepository(SocialLinksPortfolio::class)->find($socialId);
        
        if (!$social || $social->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Lien social non trouvé');
        }

        if ($request->isMethod('POST')) {
            $social->setPlatform($request->request->get('platform'));
            $social->setUrl($request->request->get('url'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Lien social modifié avec succès.');
            return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
        }

        return $this->render('admin/portfolio/social/edit.html.twig', [
            'portfolio' => $portfolio,
            'socialLink' => $social,
        ]);
    }

    #[Route('/{id}/social/{socialId}/delete', name: 'admin_portfolio_social_delete', methods: ['POST'])]
    public function deleteSocial(Request $request, UserPortfolio $portfolio, int $socialId): Response
    {
        $social = $this->entityManager->getRepository(SocialLinksPortfolio::class)->find($socialId);
        
        if (!$social || $social->getUserPortfolio()->getId() !== $portfolio->getId()) {
            throw $this->createNotFoundException('Lien social non trouvé');
        }

        if ($this->isCsrfTokenValid('delete_social'.$social->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($social);
            $this->entityManager->flush();
            $this->addFlash('success', 'Lien social supprimé avec succès.');
        }

        return $this->redirectToRoute('admin_portfolio_show', ['id' => $portfolio->getId()]);
    }
} 