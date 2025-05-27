import React from "react";

function SkillsPreview({ resumeInfo }) {
  if (!resumeInfo?.skills?.length) return null;

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
    <div
      className=" py-2 bg-white "
      style={{ borderLeftColor: resumeInfo?.themeColor }}
    >
      <h3
        className="text-sm font-bold uppercase tracking-wide text-center w-full"
        style={{ color: resumeInfo?.themeColor }}
      >
        Compétences
      </h3>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resumeInfo.skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-800">
                {skill.name}
              </span>
              <span className="text-xs px-2 py-1 rounded">
                {getSkillLevelText(skill.rating)}
              </span>
            </div>

            {/* Barre de progression */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: resumeInfo?.themeColor || "#3B82F6",
                  width: getSkillWidth(skill.rating),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
