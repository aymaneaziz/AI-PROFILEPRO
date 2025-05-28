import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";
import PortfolioPreview from "@/portfolio/portfolio-spec/components/portfolio-preview";

function ViewPortfolio() {
  const [portfolioInfo, setPortfolioInfo] = useState(null);
  const { portfolioId } = useParams();

  useEffect(() => {
    GlobalApi.GetPortfolioById(portfolioId).then((resp) => {
      setPortfolioInfo(resp.data.data);
    });
  }, [portfolioId]);

  if (!portfolioInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className=" ">
        <PortfolioPreview data={portfolioInfo} />
      </div>
    </>
  );
}

export default ViewPortfolio;
