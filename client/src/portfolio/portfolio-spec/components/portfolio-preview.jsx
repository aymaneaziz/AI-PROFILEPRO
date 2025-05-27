import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Globe,
  Instagram,
  ExternalLink,
  Facebook,
  Award,
  ArrowLeft,
} from "lucide-react";

export default function PortfolioPreview({ data, onBackToEdit }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "GitHub":
        return <Github className="h-5 w-5" />;
      case "Instagram":
        return <Instagram className="h-5 w-5" />;
      case "Facebook":
        return <Facebook className="h-5 w-5" />;
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />;
      case "Portfolio":
        return <Globe className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  // Generate lighter and darker versions of the theme color for gradients and accents
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb = hexToRgb(data?.themeColor);
  const lightBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
  const mediumBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;

  return (
    <div className="bg-white  overflow-hidden">
      {onBackToEdit && (
        <Button
          onClick={onBackToEdit}
          className="mb-6 inline-flex items-center px-4 py-2 text-white focus:outline-none bg-purple-600 hover:bg-purple-700 "
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l'édition
        </Button>
      )}
      {/* Header */}
      <div
        className="h-40 w-full bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${data.themeColor}, ${mediumBg})`,
        }}
      ></div>
      {/* Profile Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-20 mb-8">
          <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-4">
            <img
              src={
                data.profilePicture || "/placeholder.svg?height=128&width=128"
              }
              alt={data.fullName}
              className="h-40 w-40 rounded-full border-4 border-white object-cover bg-white shadow-lg"
            />
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {data.fullName}
            </h1>
            <p className="text-xl" style={{ color: data.themeColor }}>
              {data.jobTitle}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            {data.socialLinksPortfolio.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-full hover:border-transparent transition-colors"
                style={{
                  color: data.themeColor,
                  hoverBackgroundColor: lightBg,
                }}
                title={link.platform}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="prose max-w-none mb-12">
          <h2
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2"
            style={{ borderColor: lightBg }}
          >
            À propos
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{data.bio}</p>
        </div>

        {/* Skills */}
        {data.skillsPortfolio && data.skillsPortfolio.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2"
              style={{ borderColor: lightBg }}
            >
              Compétences
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skillsPortfolio.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: lightBg, color: data.themeColor }}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{skill.name}</span>
                    <div className="ml-2 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full mx-0.5`}
                          style={{
                            backgroundColor:
                              i < skill.level ? data.themeColor : "#e5e7eb",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experiencesPortfolio && data.experiencesPortfolio.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2"
              style={{ borderColor: lightBg }}
            >
              Expériences professionnelles
            </h2>
            <div className="space-y-10">
              {data.experiencesPortfolio.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5"
                  style={{
                    borderColor: data.themeColor,
                    beforeBackgroundColor: lightBg,
                  }}
                >
                  <div
                    className="absolute left-0 top-1.5 w-5 h-5 -ml-2.5 rounded-full"
                    style={{ backgroundColor: data.themeColor }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-lg" style={{ color: data.themeColor }}>
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Présent" : formatDate(exp.endDate)}
                    </p>
                    <p className="mt-3 text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.educationPortfolio && data.educationPortfolio.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2"
              style={{ borderColor: lightBg }}
            >
              Formation
            </h2>
            <div className="space-y-8">
              {data.educationPortfolio.map((edu) => (
                <div
                  key={edu.id}
                  className="relative pl-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5"
                  style={{
                    borderColor: data.themeColor,
                    beforeBackgroundColor: lightBg,
                  }}
                >
                  <div
                    className="absolute left-0 top-1.5 w-5 h-5 -ml-2.5 rounded-full"
                    style={{ backgroundColor: data.themeColor }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-lg" style={{ color: data.themeColor }}>
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.current ? "Présent" : formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Certificates */}
        {data.certificatesPortfolio.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2"
              style={{ borderColor: lightBg }}
            >
              Certificats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.certificatesPortfolio.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: lightBg }}
                >
                  <div className="flex items-start">
                    <Award
                      className="h-8 w-8 mr-3 flex-shrink-0"
                      style={{ color: data.themeColor }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(cert.date)}
                      </p>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-sm font-medium"
                          style={{ color: data.themeColor }}
                        >
                          Voir le certificat{" "}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projectsPortfolio.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2"
              style={{ borderColor: lightBg }}
            >
              Projets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projectsPortfolio.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <p
                      className="text-sm mt-1 mb-3"
                      style={{ color: data.themeColor }}
                    >
                      {project.technologies}
                    </p>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white"
                        style={{ backgroundColor: data.themeColor }}
                      >
                        Voir le projet <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
