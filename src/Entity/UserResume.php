<?php

namespace App\Entity;

use App\Repository\UserResumeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserResumeRepository::class)]
class UserResume
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $resumeID = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $userEmail = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $userName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lastName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $jobTitle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $summery = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $themeColor = null;

    /**
     * @var Collection<int, Experience>
     */
    #[ORM\OneToMany(
    targetEntity: Experience::class,
    mappedBy: 'userResume',
    cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $experience;

    /**
     * @var Collection<int, Education>
     */
    #[ORM\OneToMany( 
    targetEntity: Education::class,
    mappedBy: 'userResume',
    cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $education;

    /**
     * @var Collection<int, Skills>
     */
    #[ORM\OneToMany(  
    targetEntity: Skills::class,
    mappedBy: 'userResume',
    cascade: ['persist', 'remove'],
    orphanRemoval: true)]
    private Collection $skills;

    public function __construct()
    {
        $this->experience = new ArrayCollection();
        $this->education = new ArrayCollection();
        $this->skills = new ArrayCollection();
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

    public function getResumeID(): ?string
    {
        return $this->resumeID;
    }

    public function setResumeID(?string $resumeID): static
    {
        $this->resumeID = $resumeID;

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

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): static
    {
        $this->lastName = $lastName;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getSummery(): ?string
    {
        return $this->summery;
    }

    public function setSummery(?string $summery): static
    {
        $this->summery = $summery;

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
     * @return Collection<int, Experience>
     */
    public function getExperience(): Collection
    {
        return $this->experience;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experience->contains($experience)) {
            $this->experience->add($experience);
            $experience->setUserResume($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experience->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getUserResume() === $this) {
                $experience->setUserResume(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Education>
     */
    public function getEducation(): Collection
    {
        return $this->education;
    }

    public function addEducation(Education $education): static
    {
        if (!$this->education->contains($education)) {
            $this->education->add($education);
            $education->setUserResume($this);
        }

        return $this;
    }

    public function removeEducation(Education $education): static
    {
        if ($this->education->removeElement($education)) {
            // set the owning side to null (unless already changed)
            if ($education->getUserResume() === $this) {
                $education->setUserResume(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Skills>
     */
    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkills(Skills $skills): static
    {
        if (!$this->skills->contains($skills)) {
            $this->skills->add($skills);
            $skills->setUserResume($this);
        }

        return $this;
    }

    public function removeSkills(Skills $skills): static
    {
        if ($this->skills->removeElement($skills)) {
            // set the owning side to null (unless already changed)
            if ($skills->getUserResume() === $this) {
                $skills->setUserResume(null);
            }
        }

        return $this;
    }
}
