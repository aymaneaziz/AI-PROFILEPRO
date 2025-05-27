import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT =
  "Intitulé du poste : {positionTitle}. Sur la base de cet intitulé, donne-moi 5 à 7 points sous forme de liste à puces pour mon expérience dans un CV. Ne mentionne pas le niveau d'expérience et ne renvoie pas de JSON. Retourne uniquement le résultat sous forme de balises HTML <ul> ou <li> (réponse en francais).";

function RichTextEditor({ onRichTextEditorChange, defaultValue, index }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    const title = resumeInfo.experience[index]?.title;

    if (!title) {
      toast("Veuillez d'abord ajouter l'intitulé du poste");
      return;
    }

    const prompt = PROMPT.replace("{positionTitle}", title);
    setLoading(true);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const respText = await result.response.text();

      // La réponse est déjà du HTML avec <ul> et <li>, on l'utilise directement
      setValue(respText.trim());

      // Déclencher l'événement onChange pour mettre à jour le composant parent
      onRichTextEditorChange({ target: { value: respText.trim() } });
    } catch (error) {
      console.error("Erreur lors de la génération du résumé :", error);
      toast("Impossible de générer le résumé. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Résumé </label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Générer avec l'IA
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
