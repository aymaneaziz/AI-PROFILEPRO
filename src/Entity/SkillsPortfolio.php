<?php

namespace App\Entity;

use App\Repository\SkillsPortfolioRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillsPortfolioRepository::class)]
class SkillsPortfolio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $level = null;

    #[ORM\ManyToOne(inversedBy: 'skillsPortfolio')]
    private ?UserPortfolio $userPortfolio = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(?string $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getUserPortfolio(): ?UserPortfolio
    {
        return $this->userPortfolio;
    }

    public function setUserPortfolio(?UserPortfolio $userPortfolio): static
    {
        $this->userPortfolio = $userPortfolio;

        return $this;
    }
}
