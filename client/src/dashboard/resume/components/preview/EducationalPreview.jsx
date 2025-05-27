import React from "react";

function EducationalPreview({ resumeInfo }) {
  if (!resumeInfo?.education?.length) return null;

  return (
    <div
      className=" bg-white"
      style={{ borderLeftColor: resumeInfo?.themeColor }}
    >
      <h3
        className="text-sm font-bold uppercase tracking-wide text-center w-full"
        style={{ color: resumeInfo?.themeColor }}
      >
        Formation
      </h3>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="space-y-2">
        {resumeInfo.education.map((edu, index) => (
          <div
            key={index}
            className="relative pl-2  border-l-2 border-gray-200 "
          >
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-bold text-sm text-gray-800">
                {edu.universityName}
              </h4>
              <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                <span className="font-medium flex items-center gap-1">
                  {edu?.degree} en {edu?.major}
                </span>
                <span className="rounded text-black text-xs">
                  {edu?.startDate} - {edu?.endDate}
                </span>
              </div>
              {edu?.description && (
                <p className="text-xs text-gray-700 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationalPreview;
