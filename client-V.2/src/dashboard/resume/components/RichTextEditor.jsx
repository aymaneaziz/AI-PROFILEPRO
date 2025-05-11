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
  "position title: {positionTitle}. Based on this title, give me 5–7 bullet points for my experience in a resume. Please do not include experience level and do not use JSON. Return the result as HTML <ul> or <li> tags only.";

function RichTextEditor({ onRichTextEditorChange, defaultValue, index }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    const title = resumeInfo.experience[index]?.title;

    if (!title) {
      toast("Please add the position title first.");
      return;
    }

    const prompt = PROMPT.replace("{positionTitle}", title);
    setLoading(true);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const respText = await result.response.text();

      const json = JSON.parse(respText);

      if (Array.isArray(json.bulletPoints)) {
        const listItems = json.bulletPoints
          .map((point) => `<li>${point}</li>`)
          .join("");
        const formatted = `<ul>${listItems}</ul>`;
        setValue(formatted);
      } else {
        setValue(respText.trim());
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast("Could not generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
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
