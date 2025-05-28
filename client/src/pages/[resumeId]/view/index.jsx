import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import GlobalApi from "../../../../service/GlobalApi";
import Header from "@/components/custom/Header";

function ResumeView() {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      try {
        const response = await GlobalApi.GetResumeById(resumeId);
        setResume(response.data.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fonction pour obtenir la largeur de la barre selon le niveau
  const getSkillWidth = (level) => {
    switch (level) {
      case 1:
        return "20%";
      case 2:
        return "40%";
      case 3:
        return "60%";
      case 4:
        return "80%";
      case 5:
        return "100%";
      default:
        return "60%";
    }
  };

  // Fonction pour obtenir le texte du niveau
  const getSkillLevelText = (level) => {
    switch (level) {
      case 1:
        return "Débutant";
      case 2:
        return "Intermédiaire";
      case 3:
        return "Bon";
      case 4:
        return "Avancé";
      case 5:
        return "Expert";
      default:
        return "Bon";
    }
  };

  return (
    <div>
      <div className="container mx-auto py-8">
        <Card className="p-8 max-w-4xl mx-auto">
          {/* En-tête du CV */}
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {resume.firstName} {resume.lastName}
              </h1>
              <h2 className="text-md font-medium text-gray-600">
                {resume.jobTitle}
              </h2>
              <p className="text-sm text-gray-500">{resume.address}</p>
              <div
                className="flex justify-between text-sm font-medium"
                style={{ color: resume.themeColor || "#3B82F6" }}
              >
                <span>{resume.phone}</span>
                <span>{resume.email}</span>
              </div>
            </div>
          </div>
          <hr
            className="border-[1.5px] my-2"
            style={{ borderColor: resume.themeColor }}
          />

          {/* Résumé */}
          {resume.summery && (
            <div className="px-2 py-1 bg-white">
              <h3
                className="text-sm font-bold uppercase tracking-wide text-center w-full mb-2"
                style={{ color: resume.themeColor }}
              >
                Résumé
              </h3>
              <hr
                className="border-[1.5px] my-2"
                style={{ borderColor: resume.themeColor }}
              />
              <p className="text-sm text-gray-700 leading-relaxed">
                {resume.summery}
              </p>
            </div>
          )}

          {/* Expérience */}
          {resume.experience && resume.experience.length > 0 && (
            <div className="px-2 py-1 bg-white">
              <h3
                className="text-sm font-bold uppercase tracking-wide text-center w-full mb-2"
                style={{ color: resume.themeColor }}
              >
                Expérience
              </h3>
              <hr
                className="border-[1.5px] my-2"
                style={{ borderColor: resume.themeColor }}
              />
              {resume.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-gray-600">{exp.companyName}</p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {exp.workSummery}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Formation */}
          {resume.education && resume.education.length > 0 && (
            <div className="px-2 py-1 bg-white">
              <h3
                className="text-sm font-bold uppercase tracking-wide text-center w-full mb-2"
                style={{ color: resume.themeColor }}
              >
                Formation
              </h3>
              <hr
                className="border-[1.5px] my-2"
                style={{ borderColor: resume.themeColor }}
              />
              {resume.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800">
                    {edu.universityName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {edu.degree} en {edu.major}
                  </p>
                  <p className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Compétences */}
          {resume.skills && resume.skills.length > 0 && (
            <div className="px-2 py-1 bg-white">
              <h3
                className="text-sm font-bold uppercase tracking-wide text-center w-full mb-2"
                style={{ color: resume.themeColor }}
              >
                Compétences
              </h3>
              <hr
                className="border-[1.5px] my-2"
                style={{ borderColor: resume.themeColor }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resume.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-800">
                        {skill.name}
                      </span>
                      <span className="text-xs px-2 py-1 rounded">
                        {getSkillLevelText(skill.rating)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: resume.themeColor || "#3B82F6",
                          width: getSkillWidth(skill.rating),
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ResumeView;
