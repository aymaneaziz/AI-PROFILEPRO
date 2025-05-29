import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileText, Briefcase, Search } from "lucide-react";
import GlobalApi from "../../service/GlobalApi";
import Header from "@/components/custom/Header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function PublicResumes() {
  const [resumes, setResumes] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("resumes");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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

  const filteredResumes = resumes.filter((resume) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      resume.title?.toLowerCase().includes(searchLower) ||
      resume.firstName?.toLowerCase().includes(searchLower) ||
      resume.lastName?.toLowerCase().includes(searchLower) ||
      resume.jobTitle?.toLowerCase().includes(searchLower) ||
      resume.summery?.toLowerCase().includes(searchLower)
    );
  });

  const filteredPortfolios = portfolios.filter((portfolio) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      portfolio.title?.toLowerCase().includes(searchLower) ||
      portfolio.fullName?.toLowerCase().includes(searchLower) ||
      portfolio.jobTitle?.toLowerCase().includes(searchLower) ||
      portfolio.bio?.toLowerCase().includes(searchLower)
    );
  });

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
          Chercheurs d'emploi
        </h1>

        <Tabs defaultValue="resumes" className="w-full" onValueChange={setActiveTab}>
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

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={`Rechercher dans les ${
                  activeTab === "resumes" ? "CV" : "portfolios"
                }...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <TabsContent value="resumes" className="mt-6">
            {filteredResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.map((resume) => (
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

                      {resume.skills && resume.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resume.skills.map((skill) => (
                            <Badge
                              key={skill.name}
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
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
            {filteredPortfolios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolios.map((portfolio) => (
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

                      {portfolio.skillsPortfolio && portfolio.skillsPortfolio.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {portfolio.skillsPortfolio.map((skill) => (
                            <Badge
                              key={skill.name}
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto pt-4">
                        <Link to={`/my-portfolio/${portfolio.portfolioID}/view`}>
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
