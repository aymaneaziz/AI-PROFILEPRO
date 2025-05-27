// Addportfolio.jsx
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
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Loader2, Plus } from "lucide-react";

function Addportfolio({ refreshData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: portfolioTitle,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        portfolioID: uuid,
        themeColor: "#9333EA",
      },
    };
    GlobalApi.CreateNewPortfolio(data).then(
      (resp) => {
        setLoading(false);
        if (resp) {
          refreshData?.(); // facultatif
          setOpenDialog(false);
          navigate(
            "/portfolio/portfoliospec/" + resp.data.data.portfolioID + "/edit"
          );
        }
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-9 py-6 rounded-lg font-medium flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus className="h-5 w-5 " />
          Nouveau projet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouveau portfolio</DialogTitle>
          <DialogDescription>
            Donnez un titre à votre portfolio.
          </DialogDescription>
        </DialogHeader>
        <Input
          className="my-2"
          placeholder="Ex. Portfolio Développeur"
          value={portfolioTitle}
          onChange={(e) => setPortfolioTitle(e.target.value)}
        />
        <div className="flex justify-end gap-5 ">
          <Button variant="outline" onClick={() => setOpenDialog(false)}>
            Annuler
          </Button>
          <Button onClick={onCreate} disabled={!portfolioTitle || loading}>
            {loading ? <Loader2 className="animate-spin " /> : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Addportfolio;
