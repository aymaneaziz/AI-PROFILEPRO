<?php

namespace App\Controller\Admin;

use App\Entity\UserResume;
use App\Entity\Education;
use App\Entity\Experience;
use App\Entity\Skills;
use App\Form\UserResumeType;
use App\Form\UserResumeTypeForm;
use App\Repository\UserResumeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class AdminResumeController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserResumeRepository $resumeRepository;

    public function __construct(EntityManagerInterface $entityManager, UserResumeRepository $resumeRepository)
    {
        $this->entityManager = $entityManager;
        $this->resumeRepository = $resumeRepository;
    }

    #[Route('/', name: 'admin_resume_index', methods: ['GET'])]
    public function index(): Response
    {
        $resumes = $this->resumeRepository->findAll();

        return $this->render('admin/resume/index.html.twig', [
            'resumes' => $resumes,
        ]);
    }

    #[Route('/new', name: 'admin_resume_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $resume = new UserResume();
        $form = $this->createForm(UserResumeTypeForm::class, $resume);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManager->persist($resume);
            $this->entityManager->flush();

            $this->addFlash('success', 'CV créé avec succès.');
            return $this->redirectToRoute('admin_resume_index');
        }

        return $this->render('admin/resume/new.html.twig', [
            'resume' => $resume,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'admin_resume_show', methods: ['GET'])]
    public function show(UserResume $resume): Response
    {
        return $this->render('admin/resume/show.html.twig', [
            'resume' => $resume,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin_resume_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, UserResume $resume): Response
    {
        $form = $this->createForm(UserResumeTypeForm::class, $resume);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManager->flush();

            $this->addFlash('success', 'CV modifié avec succès.');
            return $this->redirectToRoute('admin_resume_index');
        }

        return $this->render('admin/resume/edit.html.twig', [
            'resume' => $resume,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'admin_resume_delete', methods: ['POST'])]
    public function delete(Request $request, UserResume $resume): Response
    {
        if ($this->isCsrfTokenValid('delete'.$resume->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($resume);
            $this->entityManager->flush();
            $this->addFlash('success', 'CV supprimé avec succès.');
        }

        return $this->redirectToRoute('admin_resume_index');
    }

    #[Route('/{id}/education/new', name: 'admin_resume_education_new', methods: ['GET', 'POST'])]
    public function addEducation(Request $request, UserResume $resume): Response
    {
        $education = new Education();
        $education->setUserResume($resume);

        if ($request->isMethod('POST')) {
            $education->setUniversityName($request->request->get('universityName'));
            $education->setDegree($request->request->get('degree'));
            $education->setMajor($request->request->get('major'));
            $education->setStartDate($request->request->get('startDate'));
            $education->setEndDate($request->request->get('endDate'));
            $education->setDescription($request->request->get('description'));

            $this->entityManager->persist($education);
            $this->entityManager->flush();

            $this->addFlash('success', 'Formation ajoutée avec succès.');
            return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
        }

        return $this->render('admin/resume/add_education.html.twig', [
            'resume' => $resume,
            'education' => $education,
        ]);
    }

    #[Route('/{id}/experience/new', name: 'admin_resume_experience_new', methods: ['GET', 'POST'])]
    public function addExperience(Request $request, UserResume $resume): Response
    {
        $experience = new Experience();
        $experience->setUserResume($resume);

        if ($request->isMethod('POST')) {
            $experience->setTitle($request->request->get('title'));
            $experience->setCompanyName($request->request->get('companyName'));
            $experience->setCity($request->request->get('city'));
            $experience->setState($request->request->get('state'));
            $experience->setStartDate($request->request->get('startDate'));
            $experience->setEndDate($request->request->get('endDate'));
            $experience->setWorkSummery($request->request->get('workSummery'));

            $this->entityManager->persist($experience);
            $this->entityManager->flush();

            $this->addFlash('success', 'Expérience ajoutée avec succès.');
            return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
        }

        return $this->render('admin/resume/add_experience.html.twig', [
            'resume' => $resume,
            'experience' => $experience,
        ]);
    }

    #[Route('/{id}/skills/new', name: 'admin_resume_skills_new', methods: ['GET', 'POST'])]
    public function addSkills(Request $request, UserResume $resume): Response
    {
        $skill = new Skills();
        $skill->setUserResume($resume);

        if ($request->isMethod('POST')) {
            $skill->setName($request->request->get('name'));
            $skill->setRating((int)$request->request->get('rating'));

            $this->entityManager->persist($skill);
            $this->entityManager->flush();

            $this->addFlash('success', 'Compétence ajoutée avec succès.');
            return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
        }

        return $this->render('admin/resume/add_skills.html.twig', [
            'resume' => $resume,
            'skill' => $skill,
        ]);
    }

    #[Route('/{id}/education/{educationId}/edit', name: 'admin_resume_education_edit', methods: ['GET', 'POST'])]
    public function editEducation(Request $request, UserResume $resume, Education $educationId): Response
    {
        if ($request->isMethod('POST')) {
            $educationId->setUniversityName($request->request->get('universityName'));
            $educationId->setDegree($request->request->get('degree'));
            $educationId->setMajor($request->request->get('major'));
            $educationId->setStartDate($request->request->get('startDate'));
            $educationId->setEndDate($request->request->get('endDate'));
            $educationId->setDescription($request->request->get('description'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Formation modifiée avec succès.');
            return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
        }

        return $this->render('admin/resume/edit_education.html.twig', [
            'resume' => $resume,
            'education' => $educationId,
        ]);
    }

    #[Route('/{id}/education/{educationId}/delete', name: 'admin_resume_education_delete', methods: ['POST'])]
    public function deleteEducation(Request $request, UserResume $resume, Education $education): Response
    {
        if ($this->isCsrfTokenValid('delete_education'.$education->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($education);
            $this->entityManager->flush();
            $this->addFlash('success', 'Formation supprimée avec succès.');
        }

        return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
    }

    #[Route('/{id}/experience/{experienceId}/edit', name: 'admin_resume_experience_edit', methods: ['GET', 'POST'])]
    public function editExperience(Request $request, UserResume $resume, Experience $experienceId): Response
    {
        if ($request->isMethod('POST')) {
            $experienceId->setTitle($request->request->get('title'));
            $experienceId->setCompanyName($request->request->get('companyName'));
            $experienceId->setCity($request->request->get('city'));
            $experienceId->setState($request->request->get('state'));
            $experienceId->setStartDate($request->request->get('startDate'));
            $experienceId->setEndDate($request->request->get('endDate'));
            $experienceId->setWorkSummery($request->request->get('workSummery'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Expérience modifiée avec succès.');
            return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
        }

        return $this->render('admin/resume/edit_experience.html.twig', [
            'resume' => $resume,
            'experience' => $experienceId,
        ]);
    }

    #[Route('/{id}/experience/{experienceId}/delete', name: 'admin_resume_experience_delete', methods: ['POST'])]
    public function deleteExperience(Request $request, UserResume $resume, Experience $experienceId): Response
    {
        if ($this->isCsrfTokenValid('delete_experience'.$experienceId->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($experienceId);
            $this->entityManager->flush();
            $this->addFlash('success', 'Expérience supprimée avec succès.');
        }

        return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
    }

    #[Route('/{id}/skills/{skillId}/edit', name: 'admin_resume_skills_edit', methods: ['GET', 'POST'])]
    public function editSkills(Request $request, UserResume $resume, Skills $skillId): Response
    {
        if ($request->isMethod('POST')) {
            $skillId->setName($request->request->get('name'));
            $skillId->setRating((int)$request->request->get('rating'));

            $this->entityManager->flush();

            $this->addFlash('success', 'Compétence modifiée avec succès.');
            return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
        }

        return $this->render('admin/resume/edit_skills.html.twig', [
            'resume' => $resume,
            'skill' => $skillId,
        ]);
    }

    #[Route('/{id}/skills/{skillId}/delete', name: 'admin_resume_skills_delete', methods: ['POST'])]
    public function deleteSkills(Request $request, UserResume $resume, Skills $skillId): Response
    {
        if ($this->isCsrfTokenValid('delete_skill'.$skillId->getId(), $request->request->get('_token'))) {
            $this->entityManager->remove($skillId);
            $this->entityManager->flush();
            $this->addFlash('success', 'Compétence supprimée avec succès.');
        }

        return $this->redirectToRoute('admin_resume_show', ['id' => $resume->getId()]);
    }
}