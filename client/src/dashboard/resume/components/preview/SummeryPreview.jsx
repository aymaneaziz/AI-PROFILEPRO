import React from "react";

function SummeryPreview({ resumeInfo }) {
  if (!resumeInfo?.summery) return null;

  return (
    <div
      className="px-2 py-1 bg-white "
      style={{ borderLeftColor: resumeInfo?.themeColor || "#3B82F6" }}
    >
      <p className="text-sm text-gray-700 leading-relaxed">
        {resumeInfo.summery}
      </p>
    </div>
  );
}

export default SummeryPreview;
