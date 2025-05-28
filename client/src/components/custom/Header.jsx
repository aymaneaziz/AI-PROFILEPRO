import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import {
  Zap,
  Menu,
  X,
  FileText,
  Briefcase,
  User,
  UserCogIcon,
  Earth,
} from "lucide-react";

function Header({ titre1, titre2, titre3 }) {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);
  const handleClick = () => {
    window.location.href = "http://127.0.0.1:8000/admin";
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-4  py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mr-8">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-indigo-600 bg-clip-text text-transparent">
                ProfilPro
              </span>
              <div className="text-xs text-gray-500">CV & Portfolio IA</div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            {titre1 && titre2 && titre3 && (
              <div className="flex gap-6 mr-3">
                <a
                  href="#fonctionnalites"
                  className="text-sm font-semibold hover:text-indigo-600"
                >
                  Fonctionnalités
                </a>
                <a
                  href="#exemples"
                  className="text-sm font-semibold hover:text-indigo-600"
                >
                  Exemples
                </a>
                <a
                  href="#contact"
                  className="text-sm font-semibold hover:text-indigo-600"
                >
                  Contact
                </a>
              </div>
            )}
            {isSignedIn ? (
              <>
                {/* Menu de navigation conditionnelle */}
                {/* Boutons principaux */}{" "}
                <Link to="/public-resumes">
                  <Button
                    variant={
                      isActive("/public-resumes") || isActive("/pages")
                        ? "default"
                        : "ghost"
                    }
                    className={
                      isActive("/public-resumes") || isActive("/pages")
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "hover:bg-green-50 hover:text-green-700"
                    }
                  >
                    <Earth className="w-4 h-4 mr-2" />
                    Profils
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button
                    variant={isActive("/portfolio") ? "default" : "ghost"}
                    className={
                      isActive("/portfolio")
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "hover:bg-purple-50 hover:text-purple-700"
                    }
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Portfolio
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant={isActive("/dashboard") ? "default" : "ghost"}
                    className={
                      isActive("/dashboard")
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "hover:bg-blue-50 hover:text-indigo-700"
                    }
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    CV Professionnel
                  </Button>
                </Link>
                {user?.primaryEmailAddress?.emailAddress ===
                  "aymaneaziz1234@gmail.com" && (
                  <Button
                    onClick={handleClick}
                    variant={"ghost"}
                    className={"hover:bg-blue-50 hover:text-indigo-700"}
                  >
                    <UserCogIcon className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                {/* Profil utilisateur */}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l">
                  <div className="hidden lg:block text-right">
                    <div className="text-sm font-medium">
                      {user?.fullName || user?.firstName || "Utilisateur"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                  <UserButton />
                </div>
              </>
            ) : (
              <Link to="/auth/sign-in">
                <Button className="bg-indigo-600 hover:bg-indigo-700 hover:to-purple-700 text-white">
                  <User className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </Link>
            )}
          </nav>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t px-6 py-4">
          {isSignedIn ? (
            <div className="space-y-3">
              {/* Info utilisateur */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <UserButton />
                <div>
                  <div className="text-sm font-medium">
                    {user?.fullName || user?.firstName || "Utilisateur"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>

              {/* Liens de navigation */}
              <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant={isActive("/portfolio") ? "default" : "outline"}
                  className="w-full justify-start"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Portfolio
                </Button>
              </Link>

              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant={isActive("/dashboard") ? "default" : "outline"}
                  className="w-full justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  CV Professionnel
                </Button>
              </Link>
              <Link to="/public-resumes" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant={isActive("/public-resumes") ? "default" : "outline"}
                  className="w-full justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Profils
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/auth/sign-in" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <User className="w-4 h-4 mr-2" />
                Se connecter
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
