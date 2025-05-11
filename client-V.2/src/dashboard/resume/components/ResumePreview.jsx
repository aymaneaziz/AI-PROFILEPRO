import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummeryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personel Detail/ */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summery */}
      <SummeryPreview resumeInfo={resumeInfo} />

      {/* Professional Exprience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Educational */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* Skills */}

      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
