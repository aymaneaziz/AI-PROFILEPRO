import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileText, Briefcase } from "lucide-react";
import GlobalApi from "../../service/GlobalApi";
import Header from "@/components/custom/Header";

function PublicResumes() {
  const [resumes, setResumes] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both data sets in parallel
        const [resumesResponse, portfoliosResponse] = await Promise.all([
          GlobalApi.GetPublicResumes(),
          GlobalApi.GetPublicPortfolios(),
        ]);

        setResumes(resumesResponse.data.data);
        setPortfolios(portfoliosResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-green-700 font-medium animate-pulse">
          Chargement ...
        </p>
      </div>
    );
  }

  const EmptyState = ({ message }) => (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Ressources Publiques
        </h1>

        <Tabs defaultValue="resumes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="resumes"
              className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              CV Publics ({resumes.length})
            </TabsTrigger>
            <TabsTrigger
              value="portfolios"
              className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Briefcase className="h-4 w-4" />
              Portfolios Publics ({portfolios.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumes" className="mt-6">
            {resumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <Card
                    key={resume.resumeID}
                    className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="flex flex-col h-full">
                      <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        {resume.title}
                      </h2>
                      <p className="text-lg mb-2 text-gray-700">
                        {resume.firstName} {resume.lastName}
                      </p>
                      <p className="text-gray-600 mb-4 font-medium">
                        {resume.jobTitle}
                      </p>

                      {resume.summery && (
                        <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                          {resume.summery}
                        </p>
                      )}

                      <div className="mt-auto pt-4">
                        <Link to={`/pages/${resume.resumeID}/view`}>
                          <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir le CV
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState message="Aucun CV public disponible" />
            )}
          </TabsContent>

          <TabsContent value="portfolios" className="mt-6">
            {portfolios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolios.map((portfolio) => (
                  <Card
                    key={portfolio.portfolioID}
                    className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="flex flex-col h-full">
                      <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        {portfolio.title}
                      </h2>
                      <p className="text-lg mb-2 text-gray-700">
                        {portfolio.fullName}
                      </p>
                      <p className="text-gray-600 mb-4 font-medium">
                        {portfolio.jobTitle}
                      </p>

                      {portfolio.bio && (
                        <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                          {portfolio.bio}
                        </p>
                      )}

                      <div className="mt-auto pt-4">
                        <Link
                          to={`/my-portfolio/${portfolio.portfolioID}/view`}
                        >
                          <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir le Portfolio
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState message="Aucun Portfolio public disponible" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default PublicResumes;
