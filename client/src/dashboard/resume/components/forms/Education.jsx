import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function Education() {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const AddNewEducation = () => {};

  const RemoveEducation = () => {};
  const onSave = () => {};

  const handleChange = (event, index) => {};

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your Educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs ">Univesity Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs ">Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label className="text-xs ">Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label className="text-xs ">Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs ">End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs ">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={AddNewEducation}
                  className="text-primary"
                >
                  + Add More Education
                </Button>
                <Button
                  variant="outline"
                  onClick={RemoveEducation}
                  className="text-primary"
                >
                  - Remove
                </Button>
              </div>

              <Button>Save</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
