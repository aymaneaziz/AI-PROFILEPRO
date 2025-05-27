import React, { useEffect, useState } from "react";
import Addportfolio from "./components/AddPortfolio";
import PortfolioCardItem from "./components/PortfolioCardItem";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import {
  Briefcase,
  PlusCircle,
  Award,
  ArrowRight,
  Image,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

function Portfoliospec() {
  const { user } = useUser();
  const [portfolioList, setPortfolioList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetPortfoliosList();
    }
  }, [user]);

  const GetPortfoliosList = () => {
    setIsLoading(true);
    GlobalApi.GetUserPortfolios(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setPortfolioList(resp.data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des portfolios:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-purple-600 font-medium animate-pulse">
          Chargement de vos portfolios...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 portfolio-animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <div className="bg-purple-600 p-4 rounded-xl">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-1">
                <Award className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-bold text-3xl text-gray-800">
                    Mon Portfolio
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Présentez vos réalisations et projets professionnels avec
                    style
                  </p>
                </div>

                <Addportfolio refreshData={GetPortfoliosList} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl flex items-center flex-1">
              <div className="bg-white p-2 rounded-lg mr-3">
                <Image className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {portfolioList?.length || 0} Projets
                </h3>
                <p className="text-xs text-gray-500">dans votre portfolio</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl flex items-center flex-1">
              <div className="bg-white p-2 rounded-lg mr-3">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Portfolio Pro</h3>
                <p className="text-xs text-gray-500">optimisé par IA</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 portfolio-animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Mes Projets
            </h3>
            <p className="text-gray-600">
              Créez et partagez vos réalisations professionnelles
            </p>
          </div>
        </div>
        {portfolioList?.length === 0 ? (
          <div
            className="bg-white rounded-2xl shadow-md p-10 text-center portfolio-animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Aucun projet dans votre portfolio
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Présentez vos compétences et réalisations en créant votre premier
              projet portfolio
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioList?.map((portfolio, index) => (
              <div
                key={index}
                className="portfolio-animate-fade-in transform transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${0.3 + (index + 1) * 0.1}s` }}
              >
                <PortfolioCardItem
                  portfolio={portfolio}
                  refreshData={GetPortfoliosList}
                />
              </div>
            ))}
          </div>
        )}
        {/* Conseils */}
        <div
          className="bg-white rounded-2xl shadow-md p-6 mt-10 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Conseils pour un portfolio efficace
          </h3>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-600 text-sm">
                Présentez vos projets les plus pertinents
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-600 text-sm">
                Ajoutez des captures d’écran et explications claires
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-600 text-sm">
                Assurez une navigation simple et responsive
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Ajouter les animations CSS nécessaires
const style = document.createElement("style");
style.innerHTML = `
  @keyframes portfolioFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .portfolio-animate-fade-in {
    animation: portfolioFadeIn 0.5s ease-out forwards;
    opacity: 0;
  }
  
  /* Support pour aspect-ratio si nécessaire */
  .aspect-w-16 {
    position: relative;
    padding-bottom: calc(9 / 16 * 100%);
  }
  
  .aspect-w-16 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;
document.head.appendChild(style);

export default Portfoliospec;
