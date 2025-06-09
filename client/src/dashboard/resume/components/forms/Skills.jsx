import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModal";

// IA prompt
const prompt =
  "Titre du poste : {jobTitle}. Sur la base de ce titre, donne-moi un tableau JSON avec 10 suggestions de compétences très demandées dans ce domaine. Chaque élément doit inclure : 'skills' et 'description'. Retourne uniquement le tableau, sans enveloppe d'objet.";

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [aiGeneratedSkills, setAiGeneratedSkills] = useState([]);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills || []);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkills = () => {
    setSkillsList((prev) => prev.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      () => {
        setLoading(false);
        toast("Détails sauvegardés avec succès");
      },
      () => {
        setLoading(false);
        toast("Erreur du serveur. Veuillez réessayer");
      }
    );
  };

  // Appel IA
  useEffect(() => {
    const fetchAISkillsSuggestions = async () => {
      if (!resumeInfo?.jobTitle) return;

      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);

      try {
        const result = await AIChatSession.sendMessage(PROMPT);
        const textResponse = await result.response.text();
        let parsedResponse;

        try {
          parsedResponse = JSON.parse(textResponse);
        } catch (parseError) {
          // Si la réponse n'est pas un JSON valide, on essaie de la traiter comme un tableau
          parsedResponse = textResponse
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => {
              try {
                return JSON.parse(line);
              } catch {
                return null;
              }
            })
            .filter((item) => item !== null);
        }

        if (Array.isArray(parsedResponse)) {
          setAiGeneratedSkills(parsedResponse);
        } else {
          toast.error("La réponse de l'IA n'est pas au format attendu.");
        }
      } catch (err) {
        console.error("Erreur de parsing :", err);
        toast.error("Erreur lors de la récupération des suggestions.");
      } finally {
        setLoading(false);
      }
    };

    fetchAISkillsSuggestions();
  }, [resumeInfo?.jobTitle]);

  // Mise à jour du contexte
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  // Ajouter une compétence depuis IA
  const handleSkillSuggestionClick = (skill) => {
    if (skillsList.some((s) => s.name === skill.skills)) return;

    setSkillsList([
      ...skillsList,
      {
        name: skill.skills,
        rating: 3,
      },
    ]);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Compétences</h2>
        <p>Ajoutez vos compétences professionnelles clés</p>

        <div>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between mb-2 border rounded-lg p-3"
            >
              <div>
                <label className="text-xs">Nom</label>
                <Input
                  className="w-full"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewSkills}
              className="text-primary"
            >
              + Ajouter une compétence
            </Button>
            <Button
              variant="outline"
              onClick={RemoveSkills}
              className="text-primary"
            >
              - Supprimer
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Enregistrer"
            )}
          </Button>
        </div>
      </div>

      {aiGeneratedSkills.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">
            Suggestions de compétences pour <b>{resumeInfo?.jobTitle}</b>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {aiGeneratedSkills.map((skill, index) => (
              <div
                key={index}
                onClick={() => handleSkillSuggestionClick(skill)}
                className="p-4 shadow-md rounded-md border hover:bg-gray-100 cursor-pointer transition"
              >
                <p className="font-semibold text-primary">{skill.skills}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {skill.description || "Aucune description fournie."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
