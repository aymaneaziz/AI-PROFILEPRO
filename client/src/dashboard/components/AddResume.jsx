import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume({ refreshData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeID: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        themeColor: "#7F7F7F",
      },
    };

    try {
      const resp = await GlobalApi.CreateNewResume(data);
      if (resp?.data?.data?.resumeID) {
        setOpenDialog(false);
        refreshData?.();
        navigate("/dashboard/resume/" + resp.data.data.resumeID + "/edit");
      }
    } catch (err) {
      console.error("Erreur lors de la création du CV", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-9 py-6 rounded-lg font-medium flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus className="h-5 w-5 " />
          Créer un nouveau CV
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouveau CV</DialogTitle>
          <DialogDescription>
            Ajoutez un titre pour votre nouveau CV
            <Input
              className="my-2"
              placeholder="Ex. CV Développeur Full Stack"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </DialogDescription>
          <div className="flex justify-end gap-5 ">
            <Button onClick={() => setOpenDialog(false)} variant="ghost">
              Annuler
            </Button>
            <Button disabled={!resumeTitle || loading} onClick={onCreate}>
              {loading ? <Loader2 className="animate-spin" /> : "Créer"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddResume;
