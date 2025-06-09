import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#FF33A1", "#A133FF", "#33FFA1",
    "#33A1FF", "#FF7133", "#71FF33", "#FF3371", "#3371FF",
    "#5733FF", "#33FF5A", "#FF335A", "#1F2937", "#4B5563",
    "#6B21A8", "#BE185D", "#0E7490", "#065F46", "#78350F",
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState("");
  const { resumeId } = useParams();

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data).then(() => {
      toast("Couleur du thème mise à jour");
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-50 p-4 bg-white border rounded shadow-md"
        side="bottom"
        align="start"
        forceMount={true}
      >
        <h2 className="mb-2 text-sm font-bold">Choisir la couleur du thème</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(color)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                selectedColor === color ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
