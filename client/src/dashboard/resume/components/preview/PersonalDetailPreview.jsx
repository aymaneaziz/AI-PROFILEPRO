import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-md ">
        <div className="text-center ">
          <h1 className="text-2xl font-bold text-gray-800">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h1>
          <h2 className="text-md font-medium text-gray-600">
            {resumeInfo?.jobTitle}
          </h2>
          <p className="text-sm text-gray-500">{resumeInfo?.address}</p>
          <div
            className="flex justify-between  text-sm font-medium"
            style={{ color: resumeInfo?.themeColor || "#3B82F6" }}
          >
            <span>{resumeInfo?.phone}</span>
            <span>{resumeInfo?.email}</span>
          </div>
        </div>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
