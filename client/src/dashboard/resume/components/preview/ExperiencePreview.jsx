import React from "react";

function ExperiencePreview({ resumeInfo }) {
  if (!resumeInfo?.experience?.length) return null;

  return (
    <div
      className=" py-2 bg-white"
      style={{ borderLeftColor: resumeInfo?.themeColor }}
    >
      <h3
        className="text-sm font-bold uppercase tracking-wide text-center w-full"
        style={{ color: resumeInfo?.themeColor }}
      >
        Expérience Professionnelle
      </h3>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="space-y-2">
        {resumeInfo.experience.map((exp, index) => (
          <div
            key={index}
            className="relative pl-2 border-l-2 border-gray-200 "
          >
            <div className="bg-gray-50 p-2 rounded-md">
              <h4 className="font-bold text-sm text-gray-800 ">{exp?.title}</h4>
              <div className="flex justify-between items-center text-xs text-gray-600 mb-1 ">
                <span className="font-medium flex items-center gap-1">
                  {exp?.companyName} • {exp?.city}, {exp?.state}
                </span>
                <span className="px-2 py-1 rounded text-xs text-black">
                  {exp?.startDate}
                  {exp?.currentlyWorking
                    ? " - Aujourd'hui"
                    : ` - ${exp.endDate}`}
                </span>
              </div>
              <div
                className="text-xs text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: exp?.workSummery }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperiencePreview;
