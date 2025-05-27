import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioForm from "../../components/portfolio-form";
import PortfolioPreview from "../../components/portfolio-preview";
import Header from "@/components/custom/Header";

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  const handleFormSubmit = (data) => {
    setPortfolioData(data);
    setShowPreview(true);
    setActiveTab("preview");
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
    setActiveTab("edit");
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-2">
            <TabsTrigger value="edit">Éditer</TabsTrigger>
            <TabsTrigger value="preview" disabled={!portfolioData}>
              Prévisualiser
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <PortfolioForm
              onSubmit={handleFormSubmit}
              initialData={portfolioData}
            />
          </TabsContent>
          <TabsContent value="preview">
            {portfolioData && (
              <PortfolioPreview
                data={portfolioData}
                onBackToEdit={handleBackToEdit}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
