import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModal";

const prompt =
  "Titre du poste : {Title}. Sur la base de ce titre, donne-moi un tableau JSON avec 7 suggestions de postes très demandés dans ce domaine. Chaque élément doit inclure : 'jobTitle' et 'description'. Retourne uniquement le tableau, sans enveloppe d'objet.";

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedJobTitleList, setAiGenerateJobTitleList] = useState([]);
  const [jobTitle, setJobTitle] = useState(resumeInfo?.jobTitle || "");

  useEffect(() => {
    setFormData({
      firstName: resumeInfo?.firstName || "",
      lastName: resumeInfo?.lastName || "",
      jobTitle: resumeInfo?.jobTitle || "",
      address: resumeInfo?.address || "",
      phone: resumeInfo?.phone || "",
      email: resumeInfo?.email || "",
    });
  }, [resumeInfo]);

  useEffect(() => {
    const fetchAIJobSuggestions = async () => {
      if (!resumeInfo?.title) return;
      setLoading(true);
      const PROMPT = prompt.replace("{Title}", resumeInfo?.title);

      try {
        const result = await AIChatSession.sendMessage(PROMPT);
        const textResponse = await result.response.text();
        const parsedResponse = JSON.parse(textResponse);

        if (Array.isArray(parsedResponse)) {
          setAiGenerateJobTitleList(parsedResponse);
        } else {
          toast.error("La réponse de l'IA n'est pas au format attendu.");
        }
      } catch (err) {
        console.error("Erreur de parsing :", err);
        toast.error("Erreur lors de la récupération des suggestions de l'IA.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIJobSuggestions();
  }, [resumeInfo?.title]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setResumeInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "jobTitle") {
      setJobTitle(value);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: formData };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        enabledNext(true);
        setLoading(false);
        toast("Détails sauvegardés avec succès");
      },
      (error) => {
        setLoading(false);
        toast("Erreur du serveur. Veuillez réessayer");
      }
    );
  };

  const handleSuggestionClick = (title) => {
    setJobTitle(title);
    setFormData((prev) => ({ ...prev, jobTitle: title }));
    setResumeInfo((prev) => ({ ...prev, jobTitle: title }));
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Informations personnelles</h2>
        <p>Commencez par renseigner les informations de base</p>

        <form onSubmit={onSave}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <label className="text-sm">Prénom</label>
              <Input
                name="firstName"
                required
                value={formData?.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm">Nom</label>
              <Input
                name="lastName"
                required
                value={formData?.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm">Intitulé du poste</label>
              <Input
                name="jobTitle"
                required
                value={jobTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm">Adresse</label>
              <Input
                name="address"
                required
                value={formData?.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm">Téléphone</label>
              <Input
                name="phone"
                required
                value={formData?.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm">E-mail</label>
              <Input
                name="email"
                required
                value={formData?.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end">
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
      {aiGeneratedJobTitleList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">
            Suggestions de postes très demandés
          </h2>
          {aiGeneratedJobTitleList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item.jobTitle)}
              className="p-4 shadow-md my-3 rounded-md border hover:bg-gray-100 cursor-pointer transition"
            >
              <p className="font-semibold text-primary">{item.jobTitle}</p>
              <p className="text-sm text-gray-600 mt-1">
                {item.description || "Aucune description fournie."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalDetail;
