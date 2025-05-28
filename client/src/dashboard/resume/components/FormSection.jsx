import React, { useState, useEffect } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { ArrowLeft, ArrowRight, Home, LayoutGrid, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { resumeId } = useParams();

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        setLoading(true);
        const response = await GlobalApi.GetMode(resumeId);
        setIsPublic(response.data.isPublic);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resume visibility:", error);
      }
    };

    fetchVisibility();
  }, [resumeId]);

  const handleVisibilityChange = async (checked) => {
    setLoading(true);
    try {
      const resp = await GlobalApi.UpdateMode(resumeId, {
        isPublic: checked,
      });
      console.log(resp);
      setIsPublic(checked);
      toast("Détails sauvegardés avec succès");
    } catch (error) {
      console.error(error);
      toast("Erreur du serveur. Veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>

          <ThemeColor />

          <div className="flex items-center space-x-2">
            <Switch
              id="resume-visibility"
              checked={isPublic}
              onCheckedChange={handleVisibilityChange}
              disabled={isLoading}
            />
            <Label htmlFor="resume-visibility">
              {isPublic ? "CV public" : "CV privé"}
            </Label>

            {isLoading && (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin text-gray-500 mt-1"
                  aria-label="Chargement en cours"
                />
                <span className="text-gray-500 text-sm">
                  Chargement en cours..
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}

      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience />
      ) : activeFormIndex == 4 ? (
        <Education />
      ) : activeFormIndex == 5 ? (
        <Skills />
      ) : activeFormIndex == 6 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}

      {/* Summery */}

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  );
}

export default FormSection;
