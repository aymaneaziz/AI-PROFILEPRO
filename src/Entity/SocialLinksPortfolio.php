<?php

namespace App\Entity;

use App\Repository\SocialLinksPortfolioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: SocialLinksPortfolioRepository::class)]
class SocialLinksPortfolio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $platform = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: 'socialLinksPortfolio')]
    private ?UserPortfolio $userPortfolio = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlatform(): ?string
    {
        return $this->platform;
    }

    public function setPlatform(?string $platform): static
    {
        $this->platform = $platform;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): static
    {
        $this->url = $url;

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
