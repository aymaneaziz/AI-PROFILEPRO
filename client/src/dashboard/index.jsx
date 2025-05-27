import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";
import { FileText, Plus, CheckCircle } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    setIsLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setResumeList(resp.data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des CV:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-600 font-medium animate-pulse">
          Chargement de vos CV...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="bg-indigo-600 p-3 rounded-lg flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-3xl text-gray-800">
                Mon tableau de bord CV
              </h2>
              <p className="text-gray-500 mt-1">
                Créez et gérez vos CV optimisés par IA pour booster votre
                carrière
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg flex-1">
              <p className="text-indigo-800 font-medium">
                Nombre de CV :{" "}
                <span className="font-bold">{resumeList.length}</span>
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                {resumeList.length === 0
                  ? "Créez votre premier CV dès maintenant !"
                  : "Continuez à personnaliser vos CV pour maximiser vos chances"}
              </p>
            </div>
            <AddResume refreshData={GetResumesList} />
          </div>
        </div>

        {/* Section CV */}
        <div
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mes CV</h3>
          <p className="text-gray-600">
            Créez dès maintenant un CV optimisé par IA pour décrocher votre
            prochain emploi.
          </p>
        </div>

        {resumeList.length === 0 ? (
          <div
            className="bg-white rounded-2xl shadow-md p-10 text-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Aucun CV trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Commencez par créer votre premier CV professionnel
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resumeList.map((resume, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.3 + (index + 1) * 0.1}s` }}
              >
                <ResumeCardItem resume={resume} refreshData={GetResumesList} />
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
            Conseils pour un CV parfait
          </h3>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-600 text-sm">
                Utilisez des mots-clés pertinents
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-600 text-sm">
                Quantifiez vos réalisations avec des chiffres
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-600 text-sm">
                Adaptez votre CV à chaque offre
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
