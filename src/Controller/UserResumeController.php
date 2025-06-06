<?php

namespace App\Controller;

use App\Entity\Education;
use App\Entity\Experience;
use App\Entity\Skills;
use App\Entity\UserResume;
use App\Repository\UserResumeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;



#[Route('/api/resumes')]
class UserResumeController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserResumeRepository $resumeRepo,
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
//------------------------------------------create_resume-------------------------------------------------------------------------
 
  
   #[Route('', name: 'create_resume', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérification que 'data' existe
        if (!isset($data['data'])) {
            return new JsonResponse(['error' => 'Invalid payload'], 400);
        }

        $resumeData = $data['data'];

        $resume = new UserResume();
        $resume->setTitle($resumeData['title'] ?? 'Untitled');
        $resume->setResumeID($resumeData['resumeID'] ?? uniqid());
        $resume->setUserEmail($resumeData['userEmail'] ?? '');
        $resume->setUserName($resumeData['userName'] ?? '');
        $resume->setThemeColor($resumeData['themeColor'] ?? '#ffff');

        $this->em->persist($resume);
        $this->em->flush();

        return new JsonResponse([
            'data' => [
                'resumeID' => $resume->getResumeID()
            ]
        ], 201);
    }
//-----------------------------------------get_resumes--------------------------------------------------------------------------
   #[Route('', name: 'get_user_resumes', methods: ['GET'])]
    public function getUserResumes(Request $request): JsonResponse
    {
        $userEmail = $request->query->get('userEmail');

        if (!$userEmail) {
            return new JsonResponse(['error' => 'userEmail parameter is required'], 400);
        }

        $resumes = $this->em->getRepository(UserResume::class)->findBy([
            'userEmail' => $userEmail
        ]);

        $data = [];

        foreach ($resumes as $resume) {
            $data[] = [
                'resumeID' => $resume->getResumeID(),
                'title' => $resume->getTitle(),
                'userEmail' => $resume->getUserEmail(),
                'userName' => $resume->getUserName(),  
                'themeColor' => $resume->getThemeColor(),
            ];
        }

        return new JsonResponse(['data' => $data], 200);
    }

//-----------------------------------------------update_resume--------------------------------------------------------------------
#[Route('/{id}', name: 'update_resume', methods: ['PUT'])]
    public function updateResume(string  $id, Request $request): JsonResponse
    {
       $resume = $this->resumeRepo->findOneBy(['resumeID' => $id]);
        if (!$resume) {
            return new JsonResponse(['message' => 'Resume not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $fields = $data['data'] ?? [];

        // Infos simples
        $resume->setFirstName($fields['firstName'] ?? $resume->getFirstName());
        $resume->setLastName($fields['lastName'] ?? $resume->getLastName());
        $resume->setJobTitle($fields['jobTitle'] ?? $resume->getJobTitle());
        $resume->setAddress($fields['address'] ?? $resume->getAddress());
        $resume->setPhone($fields['phone'] ?? $resume->getPhone());
        $resume->setEmail($fields['email'] ?? $resume->getEmail());
        $resume->setSummery($fields['summery'] ?? $resume->getSummery());
        $resume->setThemeColor($fields['themeColor'] ?? $resume->getThemeColor());

        // Reset & ajouter les expériences
        foreach ($resume->getExperience() as $exp) {
            $this->em->remove($exp);
        }
        if (!empty($fields['experience'])) {
            foreach ($fields['experience'] as $item) {
                $exp = new Experience();
                $exp->setTitle($item['title'] ?? '');
                $exp->setCompanyName($item['companyName'] ?? '');
                $exp->setCity($item['city'] ?? '');
                $exp->setState($item['state'] ?? '');
                $exp->setStartDate($item['startDate'] ?? 'now');
                $exp->setEndDate($item['endDate'] ?? 'now');
                $exp->setWorkSummery($item['workSummery'] ?? '');
                $exp->setUserResume($resume);
                $this->em->persist($exp);
            }
        }

        // Reset & ajouter les compétences
        foreach ($resume->getSkills() as $skill) {
            $this->em->remove($skill);
        }
        if (!empty($fields['skills'])) {
            foreach ($fields['skills'] as $item) {
                $skill = new Skills();
                $skill->setName($item['name'] ?? '');
                $skill->setRating($item['rating'] ?? 0);
                $skill->setUserResume($resume);
                $this->em->persist($skill);
            }
        }

        // Reset & ajouter les formations
        foreach ($resume->getEducation() as $edu) {
            $this->em->remove($edu);
        }
        if (!empty($fields['education'])) {
            foreach ($fields['education'] as $item) {
                $edu = new Education();
                $edu->setUniversityName($item['universityName'] ?? '');
                $edu->setDegree($item['degree'] ?? '');
                $edu->setMajor($item['major'] ?? '');
                $edu->setStartDate($item['startDate'] ?? 'now');
                $edu->setEndDate($item['endDate'] ?? 'now');
                 $edu->setDescription($item['description'] );
                $edu->setUserResume($resume);
                $this->em->persist($edu);
            }
        }

        $this->em->persist($resume);
        $this->em->flush();

        return new JsonResponse(['message' => 'Resume updated successfully']);
    }
//----------------------------------------------get_all_public_resumes---------------------------------------------------------------------
#[Route('/public', name: 'api_public_resumes', methods: ['GET'])]
    public function getPublicResumes(): JsonResponse
    {
        $resumes = $this->resumeRepo->findBy(['isPublic' => true]);

        $data = array_map(function ($resume) {
            return [
                'resumeID' => $resume->getResumeID(),
                'title' => $resume->getTitle(),
                'firstName' => $resume->getFirstName(),
                'lastName' => $resume->getLastName(),
                'jobTitle' => $resume->getJobTitle(),
                'themeColor' => $resume->getThemeColor(),
                'summery' => $resume->getSummery(),
                'email' => $resume->getEmail(),
                'phone' => $resume->getPhone(),
                'address' => $resume->getAddress(),
            ];
        }, $resumes);

        return new JsonResponse(['data' => $data]);
    }
//----------------------------------------------get_resume_by_id---------------------------------------------------------------------
    #[Route('/{id}', name: 'get_resume_by_id', methods: ['GET'])]
    public function getResumeById(string $id): JsonResponse
    {
         $resume = $this->resumeRepo->findOneBy(['resumeID' => $id]);

        if (!$resume) {
            return new JsonResponse(['message' => 'Resume not found'], 404);
        }

        // Formatage personnalisé du résumé avec ses relations
        $data = [
            'resumeID' => $resume->getResumeID(),
            'title'=>$resume->getTitle(),
            'firstName' => $resume->getFirstName(),
            'lastName' => $resume->getLastName(),
            'jobTitle'=>$resume->getJobTitle(),
            'address' => $resume->getAddress(),
            'phone' => $resume->getPhone(),
            'email' => $resume->getEmail(),
            'summery' => $resume->getSummery(),
            'themeColor' => $resume->getThemeColor(),

            'experience' => array_map(function ($exp) {
                return [
                    'id' => $exp->getId(),
                    'title'=>$exp->getTitle(),
                    'companyName' => $exp->getCompanyName(),
                    'city' => $exp->getCity(),
                    'state'=>$exp->getState(),
                    'startDate' => $exp->getStartDate(),
                    'endDate' => $exp->getEndDate(),
                    'workSummery' => $exp->getWorkSummery(),
                ];
            }, $resume->getExperience()->toArray()),

            'education' => array_map(function ($edu) {
                return [
                    'id' => $edu->getId(),
                    'universityName' => $edu->getUniversityName(),
                    'degree' => $edu->getDegree(),
                    'major'=>$edu->getMajor(),
                    'startDate' => $edu->getStartDate(),
                    'endDate' => $edu->getEndDate(),
                    'description'=>$edu->getDescription()
                ];
            }, $resume->getEducation()->toArray()),

            'skills' => array_map(function ($skill) {
                return [
                    'id' => $skill->getId(),
                    'name' => $skill->getName(),
                    'rating'=>$skill->getRating()
                ];
            }, $resume->getSkills()->toArray()),
        ];

        return new JsonResponse(['data' => $data], 200);
    }
//-------------------------------------delete_resume------------------------------------------------------------------------------
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function deleteResume(string  $id ): JsonResponse {
        $resume = $this->resumeRepo->findOneBy(['resumeID' => $id]);

        if (!$resume) {
            return new JsonResponse(['message' => 'Resume not found.'], 404);
        }

        $this->em->remove($resume);
        $this->em->flush();

        return new JsonResponse(['message' => 'Resume deleted successfully.']);
    }
//------------------------------------------set_mode------------------------------------------------------------------------------

    #[Route('/{id}/update-mode', name: 'api_resume_update_mode', methods: ['PUT'])]
    public function updateMode(string $id, Request $request): JsonResponse
    {
        $resume = $this->resumeRepo->findOneBy(['resumeID' => $id]);
        if (!$resume) {
            return new JsonResponse(['message' => 'Resume not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $isPublic = $data['isPublic'] ?? false;

        $resume->setIsPublic($isPublic);
        $this->em->flush();

        return new JsonResponse([
            'message' => 'Resume visibility updated successfully',
            'isPublic' => $isPublic
        ]);
    }

    #[Route('/{id}/get-mode', name: 'api_resume_get_mode', methods: ['GET'])]
    public function getMode(string $id): JsonResponse
    {
        $resume = $this->resumeRepo->findOneBy(['resumeID' => $id]);
        if (!$resume) {
            return new JsonResponse(['message' => 'Resume not found'], 404);
        }
        
        return new JsonResponse([
            'isPublic' => $resume->isPublic()
        ]);
    }
}
