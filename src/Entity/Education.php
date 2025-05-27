<?php

namespace App\Entity;

use App\Repository\EducationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EducationRepository::class)]
class Education
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $universityName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $degree = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $major = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $startDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $endDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'education')]
    private ?UserResume $userResume = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUniversityName(): ?string
    {
        return $this->universityName;
    }

    public function setUniversityName(?string $universityName): static
    {
        $this->universityName = $universityName;

        return $this;
    }

    public function getDegree(): ?string
    {
        return $this->degree;
    }

    public function setDegree(?string $degree): static
    {
        $this->degree = $degree;

        return $this;
    }

    public function getMajor(): ?string
    {
        return $this->major;
    }

    public function setMajor(?string $major): static
    {
        $this->major = $major;

        return $this;
    }

    public function getStartDate(): ?string
    {
        return $this->startDate;
    }

    public function setStartDate(?string $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?string
    {
        return $this->endDate;
    }

    public function setEndDate(?string $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getUserResume(): ?UserResume
    {
        return $this->userResume;
    }

    public function setUserResume(?UserResume $userResume): static
    {
        $this->userResume = $userResume;

        return $this;
    }
}
