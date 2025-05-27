<?php

namespace App\Entity;

use App\Repository\UserPortfolioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserPortfolioRepository::class)]
class UserPortfolio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $userEmail = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $userName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $portfolioID = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fullName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $jobTitle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $profilePicture = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $bio = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $themeColor = null;

    /**
     * @var Collection<int, SkillsPortfolio>
     */
    #[ORM\OneToMany(targetEntity: SkillsPortfolio::class, mappedBy: 'userPortfolio',cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $skillsPortfolio;

    /**
     * @var Collection<int, ExperiencesPortfolio>
     */
    #[ORM\OneToMany(targetEntity: ExperiencesPortfolio::class, mappedBy: 'userPortfolio',cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $experiencesPortfolio;

    /**
     * @var Collection<int, EducationPortfolio>
     */
    #[ORM\OneToMany(targetEntity: EducationPortfolio::class, mappedBy: 'userPortfolio',cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $educationPortfolio;

    /**
     * @var Collection<int, SocialLinksPortfolio>
     */
    #[ORM\OneToMany(targetEntity: SocialLinksPortfolio::class, mappedBy: 'userPortfolio',cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $socialLinksPortfolio;

    /**
     * @var Collection<int, CertificatesPortfolio>
     */
    #[ORM\OneToMany(targetEntity: CertificatesPortfolio::class, mappedBy: 'userPortfolio',cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $certificatesPortfolio;

    /**
     * @var Collection<int, ProjectsPortfolio>
     */
    #[ORM\OneToMany(targetEntity: ProjectsPortfolio::class, mappedBy: 'userPortfolio',cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $projectsPortfolio;

    public function __construct()
    {
        $this->skillsPortfolio = new ArrayCollection();
        $this->experiencesPortfolio = new ArrayCollection();
        $this->educationPortfolio = new ArrayCollection();
        $this->socialLinksPortfolio = new ArrayCollection();
        $this->certificatesPortfolio = new ArrayCollection();
        $this->projectsPortfolio = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getUserEmail(): ?string
    {
        return $this->userEmail;
    }

    public function setUserEmail(?string $userEmail): static
    {
        $this->userEmail = $userEmail;

        return $this;
    }

    public function getUserName(): ?string
    {
        return $this->userName;
    }

    public function setUserName(?string $userName): static
    {
        $this->userName = $userName;

        return $this;
    }

    public function getPortfolioID(): ?string
    {
        return $this->portfolioID;
    }

    public function setPortfolioID(?string $portfolioID): static
    {
        $this->portfolioID = $portfolioID;

        return $this;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(?string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getJobTitle(): ?string
    {
        return $this->jobTitle;
    }

    public function setJobTitle(?string $jobTitle): static
    {
        $this->jobTitle = $jobTitle;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(?string $profilePicture): static
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }

    public function getThemeColor(): ?string
    {
        return $this->themeColor;
    }

    public function setThemeColor(?string $themeColor): static
    {
        $this->themeColor = $themeColor;

        return $this;
    }

    /**
     * @return Collection<int, skillsPortfolio>
     */
    public function getSkillsPortfolio(): Collection
    {
        return $this->skillsPortfolio;
    }

    public function addSkillsPortfolio(skillsPortfolio $skillsPortfolio): static
    {
        if (!$this->skillsPortfolio->contains($skillsPortfolio)) {
            $this->skillsPortfolio->add($skillsPortfolio);
            $skillsPortfolio->setUserPortfolio($this);
        }

        return $this;
    }

    public function removeSkillsPortfolio(skillsPortfolio $skillsPortfolio): static
    {
        if ($this->skillsPortfolio->removeElement($skillsPortfolio)) {
            // set the owning side to null (unless already changed)
            if ($skillsPortfolio->getUserPortfolio() === $this) {
                $skillsPortfolio->setUserPortfolio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, experiencesPortfolio>
     */
    public function getExperiencesPortfolio(): Collection
    {
        return $this->experiencesPortfolio;
    }

    public function addExperiencesPortfolio(experiencesPortfolio $experiencesPortfolio): static
    {
        if (!$this->experiencesPortfolio->contains($experiencesPortfolio)) {
            $this->experiencesPortfolio->add($experiencesPortfolio);
            $experiencesPortfolio->setUserPortfolio($this);
        }

        return $this;
    }

    public function removeExperiencesPortfolio(experiencesPortfolio $experiencesPortfolio): static
    {
        if ($this->experiencesPortfolio->removeElement($experiencesPortfolio)) {
            // set the owning side to null (unless already changed)
            if ($experiencesPortfolio->getUserPortfolio() === $this) {
                $experiencesPortfolio->setUserPortfolio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, educationPortfolio>
     */
    public function getEducationPortfolio(): Collection
    {
        return $this->educationPortfolio;
    }

    public function addEducationPortfolio(educationPortfolio $educationPortfolio): static
    {
        if (!$this->educationPortfolio->contains($educationPortfolio)) {
            $this->educationPortfolio->add($educationPortfolio);
            $educationPortfolio->setUserPortfolio($this);
        }

        return $this;
    }

    public function removeEducationPortfolio(educationPortfolio $educationPortfolio): static
    {
        if ($this->educationPortfolio->removeElement($educationPortfolio)) {
            // set the owning side to null (unless already changed)
            if ($educationPortfolio->getUserPortfolio() === $this) {
                $educationPortfolio->setUserPortfolio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, socialLinksPortfolio>
     */
    public function getSocialLinksPortfolio(): Collection
    {
        return $this->socialLinksPortfolio;
    }

    public function addSocialLinksPortfolio(socialLinksPortfolio $socialLinksPortfolio): static
    {
        if (!$this->socialLinksPortfolio->contains($socialLinksPortfolio)) {
            $this->socialLinksPortfolio->add($socialLinksPortfolio);
            $socialLinksPortfolio->setUserPortfolio($this);
        }

        return $this;
    }

    public function removeSocialLinksPortfolio(socialLinksPortfolio $socialLinksPortfolio): static
    {
        if ($this->socialLinksPortfolio->removeElement($socialLinksPortfolio)) {
            // set the owning side to null (unless already changed)
            if ($socialLinksPortfolio->getUserPortfolio() === $this) {
                $socialLinksPortfolio->setUserPortfolio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, certificatesPortfolio>
     */
    public function getCertificatesPortfolio(): Collection
    {
        return $this->certificatesPortfolio;
    }

    public function addCertificatesPortfolio(certificatesPortfolio $certificatesPortfolio): static
    {
        if (!$this->certificatesPortfolio->contains($certificatesPortfolio)) {
            $this->certificatesPortfolio->add($certificatesPortfolio);
            $certificatesPortfolio->setUserPortfolio($this);
        }

        return $this;
    }

    public function removeCertificatesPortfolio(certificatesPortfolio $certificatesPortfolio): static
    {
        if ($this->certificatesPortfolio->removeElement($certificatesPortfolio)) {
            // set the owning side to null (unless already changed)
            if ($certificatesPortfolio->getUserPortfolio() === $this) {
                $certificatesPortfolio->setUserPortfolio(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, projectsPortfolio>
     */
    public function getProjectsPortfolio(): Collection
    {
        return $this->projectsPortfolio;
    }

    public function addProjectsPortfolio(projectsPortfolio $projectsPortfolio): static
    {
        if (!$this->projectsPortfolio->contains($projectsPortfolio)) {
            $this->projectsPortfolio->add($projectsPortfolio);
            $projectsPortfolio->setUserPortfolio($this);
        }

        return $this;
    }

    public function removeProjectsPortfolio(projectsPortfolio $projectsPortfolio): static
    {
        if ($this->projectsPortfolio->removeElement($projectsPortfolio)) {
            // set the owning side to null (unless already changed)
            if ($projectsPortfolio->getUserPortfolio() === $this) {
                $projectsPortfolio->setUserPortfolio(null);
            }
        }

        return $this;
    }
}
