import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";
import {
  ArrowLeft,
  Download,
  Share2,
  Eye,
  CheckCircle,
  Sparkles,
} from "lucide-react";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    setIsLoading(true);
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const HandleDownload = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div
        id="no-print"
        className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen"
      >
        <Header />

        {/* Section de félicitations moderne */}

        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge de succès */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              CV Généré avec Succès
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Félicitations !
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
              Votre CV est prêt !
            </h2>

            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Votre CV professionnel a été créé avec succès. Vous pouvez
              maintenant le télécharger, le partager ou continuer à l'éditer
              selon vos besoins.
            </p>

            {/* Boutons d'action modernes */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* Bouton Retour */}
              <Link to={`/dashboard/resume/${resumeId}/edit`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-400 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Retour à l'édition
                </Button>
              </Link>

              {/* Bouton Télécharger */}
              <Button
                onClick={HandleDownload}
                size="lg"
                className="group bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Télécharger PDF
              </Button>

              {/* Bouton Partager */}
              <RWebShare
                data={{
                  text: `Découvrez le CV de ${resumeInfo?.firstName} ${resumeInfo?.lastName}`,
                  url: `${
                    import.meta.env.VITE_BASE_URL
                  }/my-resume/${resumeId}/view`,
                  title: `CV - ${resumeInfo?.firstName} ${resumeInfo?.lastName}`,
                }}
                onClick={() => console.log("Partagé avec succès!")}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-purple-600 hover:bg-purple-700 hover:text-white text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Share2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Partager
                </Button>
              </RWebShare>
            </div>

            {/* Statistiques visuelles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  <Eye className="w-8 h-8 mx-auto mb-2" />
                  Prêt à voir
                </div>
                <p className="text-gray-600 text-sm">
                  CV optimisé pour les recruteurs
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  <Download className="w-8 h-8 mx-auto mb-2" />
                  Téléchargeable
                </div>
                <p className="text-gray-600 text-sm">
                  Format PDF professionnel
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  <Share2 className="w-8 h-8 mx-auto mb-2" />
                  Partageable
                </div>
                <p className="text-gray-600 text-sm">
                  Lien unique personnalisé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section d'aperçu du CV */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Aperçu de votre CV
            </h3>
            <p className="text-gray-600">
              Voici comment votre CV apparaîtra aux recruteurs
            </p>
          </div>

          <div id="print-area" className="max-w-5xl mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
