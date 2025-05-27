import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AIModal";

const prompt =
  "Titre du poste : {jobTitle}. Sur la base de ce titre, donne-moi un tableau JSON avec 3 résumés : un pour débutant, un pour niveau intermédiaire et un pour senior. Chaque élément doit inclure un 'summary' (résumé) et 'experience_level' (niveau d'expérience). Retourne uniquement le tableau, sans enveloppe d'objet.";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || "");

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const textResponse = await result.response.text();
      const parsedResponse = JSON.parse(textResponse);

      if (Array.isArray(parsedResponse)) {
        setAiGenerateSummeryList(parsedResponse);
      } else {
        console.error("Réponse attendue : tableau, reçu :", parsedResponse);
        toast.error("La réponse de l'IA n'est pas au format attendu.");
        setAiGenerateSummeryList([]);
      }
    } catch (err) {
      console.error("Erreur de parsing de l'IA :", err);
      toast.error("Échec de l'analyse de la réponse de l'IA.");
      setAiGenerateSummeryList([]);
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast.success("Détails sauvegardés avec succès");
      },
      (error) => {
        setLoading(false);
        toast.error("Erreur du serveur. Veuillez réessayer.");
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Résumé</h2>
        <p>Ajoutez un résumé pour votre intitulé de poste</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Ajouter un résumé</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Générer avec l'IA
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Enregistrer"
              )}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Niveau : {item.experience_level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
