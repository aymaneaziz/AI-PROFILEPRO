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
      <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">

          {/* Logo & Description */}
          <div className="md:w-1/4">
            <img
              src="/Seomaniak2025.png"
              alt="Seomaniak Oujda Logo"
              className="mb-4 w-36"
            />
            <p className="text-gray-400 leading-relaxed">
              Seomaniak Oujda, votre partenaire digital pour un avenir numérique innovant.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-5 mt-6">
              <a
                href="https://www.facebook.com/seomaniakoujda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-600 transition-colors"
              >
                {/* Facebook SVG */}
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .593 0 1.326v21.348C0 23.406.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116c.728 0 1.325-.594 1.325-1.326V1.326C24 .593 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/seomaniakoujda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-blue-400 transition-colors"
              >
                {/* Twitter SVG */}
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.374 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.556 4.897 4.897 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.919 4.919 0 004.588 3.417A9.867 9.867 0 010 21.54a13.9 13.9 0 007.548 2.212c9.058 0 14.009-7.512 14.009-14.01 0-.213-.004-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/seomaniakoujda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-700 transition-colors"
              >
                {/* LinkedIn SVG */}
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.763 0 5-2.238 5-5v-14c0-2.762-2.237-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.787-1.75-1.758 0-.97.784-1.757 1.75-1.757s1.75.786 1.75 1.757c0 .971-.784 1.758-1.75 1.758zm13.5 11.268h-3v-5.604c0-1.337-.026-3.064-1.867-3.064-1.867 0-2.154 1.459-2.154 2.963v5.705h-3v-10h2.879v1.367h.041c.401-.758 1.379-1.556 2.838-1.556 3.034 0 3.596 2.  .238 3.596 5.467v5.722z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="md:w-1/5">
            <h3 className="text-xl font-semibold mb-4 text-white">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Politique */}
          <div className="md:w-1/5">
            <h3 className="text-xl font-semibold mb-4 text-white">Politique</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-white transition-colors"
                >
                  Politique des cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:w-1/5">
            <h3 className="text-xl font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-white transition-colors"
                >
                  Aide
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  Contact support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Seomaniak Oujda. Tous droits réservés.
        </div>
      </div>
    </footer>
    </div>
  );
}
