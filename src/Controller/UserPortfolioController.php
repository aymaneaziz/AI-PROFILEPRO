<?php

namespace App\Controller;

use App\Entity\CertificatesPortfolio;
use App\Entity\EducationPortfolio;
use App\Entity\ExperiencesPortfolio;
use App\Entity\ProjectsPortfolio;
use App\Entity\SkillsPortfolio;
use App\Entity\SocialLinksPortfolio;
use App\Entity\UserPortfolio;

use App\Repository\UserPortfolioRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;



#[Route('/api/portfolios', name: 'portfolio_')]
class UserPortfolioController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPortfolioRepository $portfolioRepo,
        private ValidatorInterface $validator
    ) {}

    private function jsonResponse($data, int $status = 200): JsonResponse
    {
        $response = new JsonResponse($data, $status);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return $response;
    }
//------------------------------------------create_portfolio-------------------------------------------------------------------------
 
  
   #[Route('', name: 'create_portfolio', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérification que 'data' existe
        if (!isset($data['data'])) {
            return new JsonResponse(['error' => 'Invalid payload'], 400);
        }

        $portfolioData = $data['data'];

        $portfolio = new UserPortfolio();
        $portfolio->setTitle($portfolioData['title'] ?? 'Untitled');
        $portfolio->setPortfolioID($portfolioData['portfolioID'] ?? uniqid());
        $portfolio->setUserEmail($portfolioData['userEmail'] ?? '');
        $portfolio->setUserName($portfolioData['userName'] ?? '');
        $portfolio->setThemeColor($portfolioData['themeColor'] ?? '#ffff');

        $this->em->persist($portfolio);
        $this->em->flush();

        return new JsonResponse([
            'data' => [
                'portfolioID' => $portfolio->getPortfolioID()
            ]
        ], 201);
    }
//-----------------------------------------get_portfolios--------------------------------------------------------------------------
   #[Route('', name: 'get_user_portfolios', methods: ['GET'])]
    public function getUserPortfolios(Request $request): JsonResponse
    {
        $userEmail = $request->query->get('userEmail');

        if (!$userEmail) {
            return new JsonResponse(['error' => 'userEmail parameter is required'], 400);
        }

        $portfolios = $this->portfolioRepo->findBy(['userEmail' => $userEmail]);

       $data = array_map(function (UserPortfolio $portfolio) {
        return [
            'portfolioID' => $portfolio->getPortfolioID(),
             'profilePicture' => $portfolio->getProfilePicture(),
            'title' => $portfolio->getTitle(),
            'userEmail' => $portfolio->getUserEmail(),
            'userName' => $portfolio->getUserName(),
            'themeColor' => $portfolio->getThemeColor()
        ];
    }, $portfolios);

    return $this->jsonResponse(['data' => $data]);
    }


    //-----------------------------------------------update_portfolio--------------------------------------------------------------------

 #[Route('/{id}', name: 'update_portfolio', methods: ['PUT'])]
public function updatePortfolio(string $id, Request $request): JsonResponse
{ 
    $portfolio = $this->portfolioRepo->findOneBy(['portfolioID' => $id]);
    if (!$portfolio) {
        return new JsonResponse(['message' => 'Portfolio not found'], 404);
    }

    $data = json_decode($request->getContent(), true);
    $fields = $data['data'] ?? [];;

    // Infos simples
    $portfolio->setFullName($fields['fullName'] ?? $portfolio->getFullName());
    $portfolio->setJobTitle($fields['jobTitle'] ?? $portfolio->getJobTitle());
    $portfolio->setProfilePicture($fields['profilePicture'] ?? $portfolio->getProfilePicture());
    $portfolio->setBio($fields['bio'] ?? $portfolio->getBio());
    $portfolio->setThemeColor($fields['themeColor'] ?? $portfolio->getThemeColor());

    // --- Skills ---
    foreach ($portfolio->getSkillsPortfolio() as $skill) {
        $this->em->remove($skill);
    }
    if (!empty($fields['skillsPortfolio'])) {
        foreach ($fields['skillsPortfolio'] as $item) {
            $skill = new SkillsPortfolio();
            $skill->setName($item['name'] ?? '');
            $skill->setLevel($item['level'] ?? 0);
            $skill->setUserPortfolio($portfolio);
            $this->em->persist($skill);
        }
    }

    // --- Experiences ---
    foreach ($portfolio->getExperiencesPortfolio() as $exp) {
        $this->em->remove($exp);
    }
    if (!empty($fields['experiencesPortfolio'])) {
        foreach ($fields['experiencesPortfolio'] as $item) {
            $exp = new ExperiencesPortfolio();
            $exp->setTitle($item['title'] ?? '');
            $exp->setCompany($item['company'] ?? '');
            $exp->setStartDate($item['startDate'] ?? 'now');
            $exp->setEndDate($item['endDate'] ?? 'now');
            $exp->setCurrent($item['current'] ?? false);
            $exp->setDescription($item['description'] ?? '');
            $exp->setUserPortfolio($portfolio);
            $this->em->persist($exp);
        }
    }

    // --- Education ---
    foreach ($portfolio->getEducationPortfolio() as $edu) {
        $this->em->remove($edu);
    }
    if (!empty($fields['educationPortfolio'])) {
        foreach ($fields['educationPortfolio'] as $item) {
            $edu = new EducationPortfolio();
            $edu->setInstitution($item['institution'] ?? '');
            $edu->setDegree($item['degree'] ?? '');
            $edu->setStartDate($item['startDate'] ?? 'now');
            $edu->setEndDate($item['endDate'] ?? 'now');
            $edu->setCurrent($item['current'] ?? false);
            $edu->setUserPortfolio($portfolio);
            $this->em->persist($edu);
        }
    }

    // --- Social Links ---
    foreach ($portfolio->getSocialLinksPortfolio() as $link) {
        $this->em->remove($link);
    }
    if (!empty($fields['socialLinksPortfolio'])) {
        foreach ($fields['socialLinksPortfolio'] as $item) {
            $link = new SocialLinksPortfolio();
            $link->setPlatform($item['platform'] ?? '');
            $link->setUrl($item['url'] ?? '');
            $link->setUserPortfolio($portfolio);
            $this->em->persist($link);
        }
    }

    // --- Certificates ---
    foreach ($portfolio->getCertificatesPortfolio() as $cert) {
        $this->em->remove($cert);
    }
    if (!empty($fields['certificatesPortfolio'])) {
        foreach ($fields['certificatesPortfolio'] as $item) {
            $cert = new CertificatesPortfolio();
            $cert->setName($item['name'] ?? '');
            $cert->setIssuer($item['issuer'] ?? '');
            $cert->setDate($item['date'] ?? 'now');
            $cert->setUrl($item['url'] ?? '');
            $cert->setUserPortfolio($portfolio);
            $this->em->persist($cert);
        }
    }

    // --- Projects ---
    foreach ($portfolio->getProjectsPortfolio() as $proj) {
        $this->em->remove($proj);
    }
    if (!empty($fields['projectsPortfolio'])) {
        foreach ($fields['projectsPortfolio'] as $item) {
            $proj = new ProjectsPortfolio();
            $proj->setTitle($item['title'] ?? '');
            $proj->setDescription($item['description'] ?? '');
            $proj->setTechnologies($item['technologies'] ?? '');
            $proj->setImage($item['image'] ?? '');
            $proj->setUrl($item['url'] ?? '');
            $proj->setUserPortfolio($portfolio);
            $this->em->persist($proj);
        }
    }

    $this->em->flush();
     return new JsonResponse(['message' => 'Portfolio updated successfully']);

     
  
}
//-----------------------------------------------get_portfolio_by_id--------------------------------------------------------------------
#[Route('/{id}', name: 'get_portfolio', methods: ['GET'])]
public function getPortfolioById(string $id): JsonResponse
{
    $portfolio = $this->portfolioRepo->findOneBy(['portfolioID' => $id]);
    if (!$portfolio) {
        return new JsonResponse(['message' => 'Portfolio not found'], 404);
    }

    $data = [
        'title'=> $portfolio->getTitle(),
        'portfolioID' => $portfolio->getPortfolioID(),
        'fullName' => $portfolio->getFullName(),
        'jobTitle' => $portfolio->getJobTitle(),
        'profilePicture' => $portfolio->getProfilePicture(),
        'bio' => $portfolio->getBio(),
        'themeColor' => $portfolio->getThemeColor(),

        'skillsPortfolio' => array_map(function ($skill) {
            return [
                'id' => $skill->getId(),
                'name' => $skill->getName(),
                'level' => $skill->getLevel(),
            ];
        }, $portfolio->getSkillsPortfolio()->toArray()),

        'experiencesPortfolio' => array_map(function ($exp) {
            return [
                'id' => $exp->getId(),
                'title' => $exp->getTitle(),
                'company' => $exp->getCompany(),
                'startDate' => $exp->getStartDate(),
                'endDate' => $exp->getEndDate(),
                'current' => $exp->isCurrent(),
                'description' => $exp->getDescription(),
            ];
        }, $portfolio->getExperiencesPortfolio()->toArray()),

        'educationPortfolio' => array_map(function ($edu) {
            return [
                'id' => $edu->getId(),
                'institution' => $edu->getInstitution(),
                'degree' => $edu->getDegree(),
                'startDate' => $edu->getStartDate(),
                'endDate' => $edu->getEndDate(),
                'current' => $edu->isCurrent(),
            ];
        }, $portfolio->getEducationPortfolio()->toArray()),

        'socialLinksPortfolio' => array_map(function ($link) {
            return [
                'id' => $link->getId(),
                'platform' => $link->getPlatform(),
                'url' => $link->getUrl(),
            ];
        }, $portfolio->getSocialLinksPortfolio()->toArray()),

        'certificatesPortfolio' => array_map(function ($cert) {
            return [
                'id' => $cert->getId(),
                'name' => $cert->getName(),
                'issuer' => $cert->getIssuer(),
                'date' => $cert->getDate(),
                'url' => $cert->getUrl(),
            ];
        }, $portfolio->getCertificatesPortfolio()->toArray()),

        'projectsPortfolio' => array_map(function ($proj) {
            return [
                'id' => $proj->getId(),
                'title' => $proj->getTitle(),
                'description' => $proj->getDescription(),
                'technologies' => $proj->getTechnologies(),
                'image' => $proj->getImage(),
                'url' => $proj->getUrl(),
            ];
        }, $portfolio->getProjectsPortfolio()->toArray()),
    ];

    return new JsonResponse(['data' => $data], 200);
}

//-------------------------------------delete_portfolio------------------------------------------------------------------------------
 #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
public function deletePortfolio(string $id): JsonResponse {
    $portfolio = $this->portfolioRepo->findOneBy(['portfolioID' => $id]);

    if (!$portfolio) {
        return new JsonResponse(['message' => 'Portfolio not found.'], 404);
    }

    $this->em->remove($portfolio);
    $this->em->flush();

    return new JsonResponse(['message' => 'Portfolio deleted successfully.']);
}

}
