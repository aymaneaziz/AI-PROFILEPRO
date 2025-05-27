import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import GlobalApi from "../../../service/GlobalApi";
import { RWebShare } from "react-web-share";

function PortfolioCardItem({ portfolio, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeletePortfolioById(portfolio.portfolioID).then(
      (resp) => {
        console.log(resp);
        toast("Portfolio Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div
      className="rounded-lg overflow-hidden  border-t-4 hover:scale-105 transition-all shadow-md hover:shadow-lg"
      style={{
        borderColor: portfolio?.themeColor,
      }}
    >
      <Link to={`/portfolio/portfoliospec/${portfolio.portfolioID}/edit`}>
        <div
          className="p-5 bg-secondary flex items-center justify-center
      h-[280px] cursor-pointer overflow-hidden"
        >
          <img
            src={portfolio.profilePicture || "CV2.png"}
            alt="CV preview"
            className={
              portfolio.profilePicture
                ? "max-h-full max-w-full object-contain rounded-lg"
                : "h-20 w-20"
            }
          />
        </div>
      </Link>

      <div
        className="border p-3 flex justify-between rounded-b-lg shadow-lg"
        style={{
          background: portfolio?.themeColor,
        }}
      >
        <h2 className="text-center font-medium text-white">
          {portfolio.title}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(
                  "/portfolio/portfoliospec/" + portfolio.portfolioID + "/edit"
                )
              }
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-portfolio/" + portfolio.portfolioID + "/view")
              }
            >
              Afficher
            </DropdownMenuItem>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-portfolio/" +
                  portfolio.portfolioID +
                  "/view",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <DropdownMenuItem>Partager</DropdownMenuItem>
            </RWebShare>

            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cela supprimera définitivement
                votre compte et retirera vos données de nos serveurs.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Supprimer"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default PortfolioCardItem;
