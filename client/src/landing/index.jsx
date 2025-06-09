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
      <footer className="w-full border-t bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ZapIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ProfilPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Créez des CV et portfolios qui vous démarquent et boostent votre
                carrière.
              </p>
              <div className="flex gap-4">
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Produit</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Modèles
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Ressources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Conseils CV
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Tendances du recrutement
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Tutoriels
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Partenaires
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
