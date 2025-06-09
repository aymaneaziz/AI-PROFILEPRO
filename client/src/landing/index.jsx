import Header from "@/components/custom/Header";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  FileText,
  Globe,
  Layout,
  Layers,
  Menu,
  PenTool,
  Sparkles,
  Star,
  UserCircle,
  Image as ImageIcon,
  Zap,
  ZapIcon,
} from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon, FacebookIcon } from 'lucide-react';
import LogoSeomaniak from './public/Seomaniak2025.png';
import { Link, useNavigate } from "react-router-dom";
import Contact from "@/components/contact/Contact";

export default function LandingPage() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header
        titre1={"Fonctionnalités"}
        titre2={"Exemples"}
        titre3={"Contact"}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Créez et gérez</span>
              <span className="block text-indigo-600">
                vos portfolios professionnels
              </span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Créez facilement plusieurs portfolios et CV professionnels
              personnalisés pour différents objectifs. Présentez vos
              compétences, expériences et projets de manière élégante et
              professionnelle
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button
                onClick={() => navigate("/portfolio")}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Créer mon Porfolio
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                size="lg"
              >
                Créer mon CV
              </Button>
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Créez plusieurs portfolios
                </h3>
                <p className="text-gray-600">
                  Créez des portfolios et des CV différents pour chaque domaine
                  d'expertise ou type de poste recherché.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Personnalisez
                </h3>
                <p className="text-gray-600">
                  Choisissez les couleurs qui correspondent à votre style
                  professionnel
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Partagez facilement
                </h3>
                <p className="text-gray-600">
                  Partagez vos portfolios avec des recruteurs ou sur vos réseaux
                  sociaux en quelques clics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="fonctionnalites"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Fonctionnalités
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Tout ce dont vous avez besoin pour réussir
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Notre plateforme offre des outils puissants pour créer des CV
                  et portfolios qui vous aident à décrocher l'emploi de vos
                  rêves.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">IA Avancée</h3>
                <p className="text-center text-muted-foreground">
                  Notre technologie d'IA analyse votre expérience et suggère des
                  formulations optimales pour votre profil.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Personnalisation Totale</h3>
                <p className="text-center text-muted-foreground">
                  Adaptez chaque aspect de votre CV ou portfolio pour refléter
                  votre style personnel et professionnel.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Portfolio en Ligne</h3>
                <p className="text-center text-muted-foreground">
                  Créez un portfolio web professionnel pour présenter vos
                  projets et compétences aux recruteurs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="exemples" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Recherche de Talents
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trouvez les profils parfaits pour votre entreprise
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Ce service vous aide à identifier et recruter les meilleurs
                  candidats selon vos critères
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border shadow-sm cursor-pointer">
                <img
                  src="/resume1.jpeg"
                  alt="Profil Développeur"
                  className="aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-bold">Profils Techniques</h3>
                    <p className="text-sm text-muted-foreground">
                      Développeurs, ingénieurs et experts IT
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border shadow-sm cursor-pointer">
                <img
                  src="/resume2.jpeg"
                  alt="Profil Commercial"
                  className="aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-bold">Profils Commerciaux</h3>
                    <p className="text-sm text-muted-foreground">
                      Commerciaux, chargés de clientèle et business developers
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border shadow-sm cursor-pointer">
                <img
                  src="/port1.jpeg"
                  alt="Profil Direction"
                  className="aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-bold">Profils Direction</h3>
                    <p className="text-sm text-muted-foreground">
                      Managers, directeurs et cadres expérimentés
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Link to={"/public-resumes"}>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  Rechercher des profils
                </button>
              </Link>
            </div>
          </div>
        </section>
        {/* Contact */}
        <section
          id="contact"
          className="w-full py-16 px-6 border-t bg-muted/50"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-4">
                Prêt à booster votre carrière ?
              </h2>
              <p className="text-gray-600 text-lg">
                Créez votre CV ou portfolio professionnel dès aujourd'hui avec
                notre outil simple et puissant.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="px-8"
                    onClick={() => navigate("/dashboard")}
                  >
                    Créer mon CV gratuitement
                  </Button>
                </div>
              </div>
            </div>

            <div className=" p-6 rounded-lg shadow-md bg-white">
              <Contact />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-12">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={LogoSeomaniak} alt="Seomaniak2025" className="h-8" />
            <span className="text-xl font-bold text-primary">Seomaniak Oujda</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Créez de nouvelles perspectives de développement pour votre entreprise grâce à Seomaniak, en optimisant votre présence en ligne.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/SeoManiakMaroc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://twitter.com/SeoManiakMaroc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://www.instagram.com/seomaniak.ma/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://github.com/Seomaniak" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/company/seomaniak-maroc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <LinkedInIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Nos Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Développement Web
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Référencement SEO
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Marketing Digital
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Création d'Identité Visuelle
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Ressources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://seomaniak.ma/blog/" className="text-muted-foreground hover:text-foreground">
                Blog
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/blog/" className="text-muted-foreground hover:text-foreground">
                Conseils CV
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/blog/" className="text-muted-foreground hover:text-foreground">
                Tendances du recrutement
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/blog/" className="text-muted-foreground hover:text-foreground">
                Tutoriels
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Entreprise</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                À propos
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Carrières
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </li>
            <li>
              <a href="https://seomaniak.ma/agence-web/oujda/" className="text-muted-foreground hover:text-foreground">
                Partenaires
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
    </div>
  );
}
