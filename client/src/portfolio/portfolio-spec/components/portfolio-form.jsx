"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowLeft,
  Brain,
  Home,
  Loader2,
  LoaderCircle,
  PlusCircle,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { AIChatSession } from "../../../../service/AIModal";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";

export default function PortfolioForm({ onSubmit, initialData }) {
  // État initial par défaut
  const defaultFormState = {
    title: "",
    userEmail: "",
    userName: "",
    portfolioID: uuidv4(),
    fullName: "",
    jobTitle: "",
    profilePicture: "",
    bio: "",
    themeColor: "#6366f1", // Default indigo color
    skillsPortfolio: [{ id: uuidv4(), name: "", level: 3 }],
    experiencesPortfolio: [
      {
        id: uuidv4(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    educationPortfolio: [
      {
        id: uuidv4(),
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        current: false,
      },
    ],
    socialLinksPortfolio: [{ id: uuidv4(), platform: "LinkedIn", url: "" }],
    certificatesPortfolio: [
      { id: uuidv4(), name: "", issuer: "", date: "", url: "" },
    ],
    projectsPortfolio: [
      {
        id: uuidv4(),
        title: "",
        description: "",
        technologies: "",
        image: "",
        url: "",
      },
    ],
  };

  function stripIdsFromPortfolio(data) {
    return {
      ...data,
      skillsPortfolio: data.skillsPortfolio.map(({ id, ...rest }) => rest),
      experiencesPortfolio: data.experiencesPortfolio.map(
        ({ id, ...rest }) => rest
      ),
      educationPortfolio: data.educationPortfolio.map(
        ({ id, ...rest }) => rest
      ),
      socialLinksPortfolio: data.socialLinksPortfolio.map(
        ({ id, ...rest }) => rest
      ),
      certificatesPortfolio: data.certificatesPortfolio.map(
        ({ id, ...rest }) => rest
      ),
      projectsPortfolio: data.projectsPortfolio.map(({ id, ...rest }) => rest),
    };
  }

  const [formData, setFormData] = useState(defaultFormState);
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);
  const [aiGeneratedSkills, setAiGeneratedSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [aiGeneratedJobTitles, setAiGeneratedJobTitles] = useState([]);
  const [isLoadingJobTitles, setIsLoadingJobTitles] = useState(false);

  useEffect(() => {
    if (params?.portfolioId) {
      setIsLoading(true);
      GlobalApi.GetPortfolioById(params.portfolioId)
        .then((resp) => {
          if (resp?.data?.data) {
            setFormData(resp.data.data);
          } else {
            if (initialData) {
              setFormData(initialData);
            }
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du portfolio:", error);
          toast.error("Erreur lors du chargement des données");
          setIsLoading(false);
          // Utiliser les données initiales en cas d'erreur
          if (initialData) {
            setFormData(initialData);
          }
        });
    } else if (initialData) {
      // Si pas d'ID mais des données initiales sont fournies
      setFormData(initialData);
    }
  }, [params?.portfolioId, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérification de la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("L'image ne doit pas dépasser 5MB");
        return;
      }

      // Vérification du type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert("Type de fichier non autorisé. Formats acceptés : JPEG, PNG, GIF, WEBP");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        setIsLoading(true);
        const response = await fetch(
          "https://ai-profilepro-production.up.railway.app/UploadImage/upload-resume.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          setFormData((prev) => ({ ...prev, profilePicture: result.url }));
        } else {
          alert("Erreur lors du téléchargement de l'image: " + (result.message || 'Erreur inconnue'));
        }
      } catch (error) {
        alert("Erreur réseau : " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleProfilePictureUrl = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, profilePicture: value }));
  };

  // Skills handlers
  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skillsPortfolio: [
        ...prev.skillsPortfolio,
        { id: uuidv4(), name: "", level: 3 },
      ],
    }));
  };

  const updateSkill = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      skillsPortfolio: prev.skillsPortfolio.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (id) => {
    setFormData((prev) => ({
      ...prev,
      skillsPortfolio: prev.skillsPortfolio.filter((skill) => skill.id !== id),
    }));
  };

  // Experience handlers
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiencesPortfolio: [
        ...prev.experiencesPortfolio,
        {
          id: uuidv4(),
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experiencesPortfolio: prev.experiencesPortfolio.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experiencesPortfolio: prev.experiencesPortfolio.filter(
        (exp) => exp.id !== id
      ),
    }));
  };

  // Education handlers
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationPortfolio: [
        ...prev.educationPortfolio,
        {
          id: uuidv4(),
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
          current: false,
        },
      ],
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      educationPortfolio: prev.educationPortfolio.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      educationPortfolio: prev.educationPortfolio.filter(
        (edu) => edu.id !== id
      ),
    }));
  };

  // Social links handlers
  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinksPortfolio: [
        ...prev.socialLinksPortfolio,
        { id: uuidv4(), platform: "GitHub", url: "" },
      ],
    }));
  };

  const updateSocialLink = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinksPortfolio: prev.socialLinksPortfolio.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeSocialLink = (id) => {
    setFormData((prev) => ({
      ...prev,
      socialLinksPortfolio: prev.socialLinksPortfolio.filter(
        (link) => link.id !== id
      ),
    }));
  };

  // Certificate handlers
  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificatesPortfolio: [
        ...prev.certificatesPortfolio,
        { id: uuidv4(), name: "", issuer: "", date: "", url: "" },
      ],
    }));
  };

  const updateCertificate = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certificatesPortfolio: prev.certificatesPortfolio.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertificate = (id) => {
    setFormData((prev) => ({
      ...prev,
      certificatesPortfolio: prev.certificatesPortfolio.filter(
        (cert) => cert.id !== id
      ),
    }));
  };

  // Project handlers
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projectsPortfolio: [
        ...prev.projectsPortfolio,
        {
          id: uuidv4(),
          title: "",
          description: "",
          technologies: "",
          image: "",
          url: "",
        },
      ],
    }));
  };

  const updateProject = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projectsPortfolio: prev.projectsPortfolio.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const handleProjectImageChange = async (e, projectId) => {
    const file = e.target.files[0];
    if (file) {
      // Vérification de la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("L'image ne doit pas dépasser 5MB");
        return;
      }

      // Vérification du type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert("Type de fichier non autorisé. Formats acceptés : JPEG, PNG, GIF, WEBP");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        setIsLoading(true);
        const response = await fetch(
          "https://ai-profilepro-production.up.railway.app/UploadImage/upload-portfolio.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          setFormData((prev) => ({
            ...prev,
            projectsPortfolio: prev.projectsPortfolio.map((proj) =>
              proj.id === projectId ? { ...proj, image: result.url } : proj
            ),
          }));
        } else {
          alert("Erreur lors du téléchargement de l'image: " + (result.message || 'Erreur inconnue'));
        }
      } catch (error) {
        alert("Erreur réseau : " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removeProject = (id) => {
    setFormData((prev) => ({
      ...prev,
      projectsPortfolio: prev.projectsPortfolio.filter(
        (proj) => proj.id !== id
      ),
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    const data = {
      data: stripIdsFromPortfolio(formData),
    };

    try {
      if (params?.portfolioId) {
        await GlobalApi.UpdatePortfolioDetail(params.portfolioId, data);
        toast.success("Détails sauvegardés avec succès");
      } else {
        const response = await GlobalApi.CreatePortfolio(data);

        if (response?.data?.id) {
          navigate(`/portfolio/edit/${response.data.id}`);
        }
        toast.success("Portfolio créé avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      console.log(data);
      toast.error("Erreur lors de la sauvegarde des données");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour soumettre le formulaire et générer le portfolio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Appeler d'abord la fonction onSubmit si elle existe
    if (onSubmit) {
      onSubmit(formData);
    }

    const data = {
      data: stripIdsFromPortfolio(formData),
    };

    try {
      // Sauvegarder d'abord les données
      if (params?.portfolioId) {
        await GlobalApi.UpdatePortfolioDetail(params.portfolioId, data);
        toast.success("Portfolio mis à jour et généré avec succès");
        // Rediriger vers la page de visualisation du portfolio
        navigate(`/portfolio/portfoliospec/${params.portfolioId}/edit`);
      }
    } catch (error) {
      console.error("Erreur lors de la génération du portfolio:", error);
      toast.error("Erreur lors de la génération du portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  //------------------------------ bio
  const promptSummaryTemplate =
    "Titre du poste : {jobTitle}. Sur la base de ce titre, donne-moi uniquement un résumé pour un niveau intermédiaire. Retourne un objet JSON avec deux clés : 'summary' (le résumé) et 'experience_level' (niveau d'expérience). Ne retourne que l'objet JSON, sans autre texte.";
  const GenerateSummaryFromAISummary = async (jobTitle, onResult) => {
    if (!jobTitle) {
      toast("Veuillez d'abord ajouter Titre professionnel ");
      return;
    }

    setIsLoading(true);
    const PROMPT = promptSummaryTemplate.replace("{jobTitle}", jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const textResponse = await result.response.text();
      const parsedResponse = JSON.parse(textResponse);

      if (parsedResponse && parsedResponse.summary) {
        onResult(parsedResponse.summary);
      } else {
        toast.error("Résumé manquant dans la réponse de l'IA.");
        onResult("");
      }
    } catch (err) {
      console.error("Erreur de parsing de l'IA :", err);
      toast.error("Échec de l'analyse de la réponse de l'IA.");
      onResult("");
    } finally {
      setIsLoading(false);
    }
  };

  //------------------------------ description experience
  const prompt =
    "Titre du poste : {jobTitle}. Entreprise : {company}. Sur la base de ce poste et de l'entreprise, génère uniquement un résumé adapté à un niveau intermédiaire. Retourne un objet JSON avec deux clés : 'summary' (le résumé) et 'experience_level' (niveau d'expérience). Ne retourne que l'objet JSON, sans aucun texte supplémentaire.";

  const GenerateSummaryFromAI = async (company, jobTitle, onResult) => {
    if (!jobTitle || !company) {
      toast("Veuillez d'abord ajouter l'intitulé du poste et l'entreprise.");
      return;
    }

    setIsLoading(true);
    const PROMPT = prompt
      .replace("{jobTitle}", jobTitle)
      .replace("{company}", company);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const textResponse = await result.response.text();
      const parsedResponse = JSON.parse(textResponse);

      if (parsedResponse && parsedResponse.summary) {
        onResult(parsedResponse.summary);
      } else {
        toast.error("Résumé manquant dans la réponse de l'IA.");
        onResult("");
      }
    } catch (err) {
      console.error("Erreur de parsing de l'IA :", err);
      toast.error("Échec de l'analyse de la réponse de l'IA.");
      onResult("");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        setIsLoading(true);
        const response = await GlobalApi.GetModePortfolio(params?.portfolioId);
        setIsPublic(response.data.isPublic);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching resume visibility:", error);
      }
    };

    fetchVisibility();
  }, [params?.portfolioId]);

  const handleVisibilityChange = async (checked) => {
    setIsLoading(true);
    try {
      const resp = await GlobalApi.UpdateModePortfolio(params?.portfolioId, {
        isPublic: checked,
      });
      console.log(resp);
      setIsPublic(checked);
      toast("Détails sauvegardés avec succès");
    } catch (error) {
      console.error(error);
      toast("Erreur du serveur. Veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };

  // IA prompt pour les compétences
  const skillsPrompt = "Titre du poste : {jobTitle}. Sur la base de ce titre, donne-moi un tableau JSON avec 14 suggestions de compétences très demandées dans ce domaine. Chaque élément doit inclure : 'skills' et 'description'. Retourne uniquement le tableau, sans enveloppe d'objet.";

  // Appel IA pour les suggestions de compétences
  useEffect(() => {
    const fetchAISkillsSuggestions = async () => {
      if (!formData.jobTitle) return;

      setIsLoadingSkills(true);
      const PROMPT = skillsPrompt.replace("{jobTitle}", formData.jobTitle);

      try {
        const result = await AIChatSession.sendMessage(PROMPT);
        const textResponse = await result.response.text();
        let parsedResponse;
        
        try {
          parsedResponse = JSON.parse(textResponse);
        } catch (parseError) {
          parsedResponse = textResponse.split('\n')
            .filter(line => line.trim())
            .map(line => {
              try {
                return JSON.parse(line);
              } catch {
                return null;
              }
            })
            .filter(item => item !== null);
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
        setIsLoadingSkills(false);
      }
    };

    fetchAISkillsSuggestions();
  }, [formData.jobTitle]);

  // Ajouter une compétence depuis IA
  const handleSkillSuggestionClick = (skill) => {
    if (formData.skillsPortfolio.some((s) => s.name === skill.skills)) return;

    setFormData((prev) => ({
      ...prev,
      skillsPortfolio: [
        ...prev.skillsPortfolio,
        { id: uuidv4(), name: skill.skills, level: 3 },
      ],
    }));
  };

  // IA prompt pour les titres de poste
  const jobTitlePrompt = "Titre du portfolio : {title}. Sur la base de ce titre, donne-moi un tableau JSON avec 6 suggestions de titres de poste pertinents. Chaque élément doit inclure : 'title' et 'description'. Retourne uniquement le tableau, sans enveloppe d'objet.";

  // Appel IA pour les suggestions de titres de poste
  useEffect(() => {
    const fetchAIJobTitleSuggestions = async () => {
      if (!formData.title) return;

      setIsLoadingJobTitles(true);
      const PROMPT = jobTitlePrompt.replace("{title}", formData.title);

      try {
        const result = await AIChatSession.sendMessage(PROMPT);
        const textResponse = await result.response.text();
        let parsedResponse;
        
        try {
          parsedResponse = JSON.parse(textResponse);
        } catch (parseError) {
          parsedResponse = textResponse.split('\n')
            .filter(line => line.trim())
            .map(line => {
              try {
                return JSON.parse(line);
              } catch {
                return null;
              }
            })
            .filter(item => item !== null);
        }

        if (Array.isArray(parsedResponse)) {
          setAiGeneratedJobTitles(parsedResponse);
        } else {
          toast.error("La réponse de l'IA n'est pas au format attendu.");
        }
      } catch (err) {
        console.error("Erreur de parsing :", err);
        toast.error("Erreur lors de la récupération des suggestions.");
      } finally {
        setIsLoadingJobTitles(false);
      }
    };

    fetchAIJobTitleSuggestions();
  }, [formData.title]);

  // Ajouter un titre de poste depuis IA
  const handleJobTitleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      jobTitle: suggestion.title,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <header className="bg-white rounded-lg shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to={"/portfolio"}>
              <Button className="flex items-center gap-2  bg-purple-600 hover:bg-purple-700  ">
                <Home className="h-4 w-4" />
              </Button>
            </Link>

            <h1 className="text-2xl font-bold text-gray-900">
              {formData.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {isLoading && (
              <>
                <span className="text-gray-500 text-sm">Chargement...</span>
                <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </>
            )}
            <Label htmlFor="resume-visibility">
              {isPublic ? "Portfolio public" : "Portfolio privé"}
            </Label>
            <Switch
              id="resume-visibility"
              checked={isPublic}
              onCheckedChange={handleVisibilityChange}
              disabled={isLoading}
            />

            <Button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </header>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-6">
          <TabsTrigger value="personal">Personnel</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="experience">Expériences</TabsTrigger>
          <TabsTrigger value="education">Formation</TabsTrigger>
          <TabsTrigger value="certificates">Certificats</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        {/* Personal Information ------------------------------------------------------------------------------------------------------ */}
        <TabsContent
          value="personal"
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Informations personnelles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom complet
                </label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Titre professionnel
                </label>
                <Input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  required
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex: Développeur Web, Designer, etc."
                />
              </div>
            </div>

            {aiGeneratedJobTitles.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Suggestions de titres professionnels pour <b>{formData.title}</b>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiGeneratedJobTitles.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleJobTitleSuggestionClick(suggestion)}
                      className="p-4 shadow-md rounded-md border hover:bg-gray-100 cursor-pointer transition"
                    >
                      <p className="font-semibold text-primary">{suggestion.title}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {suggestion.description || "Aucune description fournie."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isLoadingJobTitles && (
              <div className="mt-4 flex items-center justify-center p-4 border rounded-lg">
                <LoaderCircle className="animate-spin h-6 w-6 text-primary mr-2" />
                <span className="text-gray-600">Chargement des suggestions...</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo de profil
              </label>
              <div className="mt-1 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Upload une image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="block w-full text-sm text-gray-500 file:mr-4  file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Ou entrez une URL
                  </label>
                  <Input
                    type="url"
                    value={formData.profilePicture}
                    onChange={handleProfilePictureUrl}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              {formData.profilePicture && (
                <div className="mt-2">
                  <img
                    src={formData.profilePicture || "/placeholder.svg"}
                    alt="Aperçu"
                    className="h-20 w-20 rounded-xl object-cover border border-gray-200"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium mt-4 text-gray-700"
                >
                  Présentation
                </label>
                <Button
                  type="button"
                  variant="outline"
                  className="inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded-md shadow-sm text-purple-600 border-purple-600 mb-2"
                  onClick={() =>
                    GenerateSummaryFromAISummary(formData.jobTitle, (summary) =>
                      setFormData((prev) => ({ ...prev, bio: summary }))
                    )
                  }
                >
                  <Brain className="mr-2" />
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Générer une présentation avec l'IA"
                  )}
                </Button>
              </div>

              <Textarea
                id="bio"
                name="bio"
                rows={4}
                required
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Parlez de vous, de votre parcours et de vos objectifs professionnels..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Réseaux sociaux
                </h3>
                <Button
                  type="Button"
                  onClick={addSocialLink}
                  className="inline-flex  text-xs bg-purple-600 hover:bg-purple-700  "
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Ajouter un réseau
                </Button>
              </div>

              <div className="space-y-4">
                {formData.socialLinksPortfolio.map((link) => (
                  <div key={link.id} className="flex items-center gap-4">
                    <div className="w-40">
                      <Select
                        value={link.platform}
                        onValueChange={(value) =>
                          updateSocialLink(link.id, "platform", value)
                        }
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="ex: LinkedIn" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="GitHub">GitHub</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Portfolio">Portfolio</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Input
                        type="url"
                        value={link.url}
                        onChange={(e) =>
                          updateSocialLink(link.id, "url", e.target.value)
                        }
                        placeholder="https://..."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <Button
                      onClick={() => removeSocialLink(link.id)}
                      className="inline-flex items-center p-1.5 bg-accent text-red-600 hover:bg-red-200  "
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Skills Section ---------------------------------------------------------------------------------------------------*/}
        <TabsContent value="skills" className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Compétences
              </h2>
              <Button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center px-3 py-1.5 bg-purple-600 hover:bg-purple-700  border border-transparent text-xs font-medium rounded-md shadow-sm text-white"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Ajouter une compétence
              </Button>
            </div>

            <div className="space-y-4">
              {formData.skillsPortfolio.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, "name", e.target.value)
                      }
                      placeholder="Nom de la compétence"
                    />
                  </div>
                  <Select
                    value={skill.level.toString()}
                    onValueChange={(value) => updateSkill(skill.id, "level", parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Débutant</SelectItem>
                      <SelectItem value="2">Intermédiaire</SelectItem>
                      <SelectItem value="3">Avancé</SelectItem>
                      <SelectItem value="4">Expert</SelectItem>
                      <SelectItem value="5">Maître</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-accent hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                  </Button>
                </div>
              ))}
            </div>

            {aiGeneratedSkills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Suggestions de compétences pour <b>{formData.jobTitle}</b>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            {isLoadingSkills && (
              <div className="mt-4 flex items-center justify-center p-4 border rounded-lg">
                <LoaderCircle className="animate-spin h-6 w-6 text-primary mr-2" />
                <span className="text-gray-600">Chargement des suggestions...</span>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Experiences Section  ---------------------------------------------------------------------------------------------------*/}
        <TabsContent
          value="experience"
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Expériences professionnelles
              </h2>
              <Button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Ajouter une expérience
              </Button>
            </div>

            <div className="space-y-6">
              {formData.experiencesPortfolio.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Titre du poste
                      </label>
                      <Input
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          updateExperience(exp.id, "title", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Entreprise
                      </label>
                      <Input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date de début
                      </label>
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date de fin
                      </label>
                      <Input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
                        }
                        disabled={exp.current}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div className="flex items-center mt-6">
                      <Input
                        id={`current-job-${exp.id}`}
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => {
                          updateExperience(exp.id, "current", e.target.checked);
                          if (e.target.checked) {
                            updateExperience(exp.id, "endDate", "");
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor={`current-job-${exp.id}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Poste actuel
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium text-gray-700 mt-5">
                        Description
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        className="inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded-md shadow-sm text-purple-600 border-purple-600 mb-2"
                        onClick={() =>
                          GenerateSummaryFromAI(
                            exp.company,
                            exp.title,
                            (summary) =>
                              updateExperience(exp.id, "description", summary)
                          )
                        }
                      >
                        <Brain className="mr-2" />
                        {isLoading ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          "Générer la description avec l'IA"
                        )}
                      </Button>
                    </div>

                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, "description", e.target.value)
                      }
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Décrivez vos responsabilités et réalisations..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-accent hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Education Section --------------------------------------------------------------------------------------------------- */}
        <TabsContent
          value="education"
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Formations
              </h2>
              <Button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Ajouter une formation
              </Button>
            </div>

            <div className="space-y-6">
              {formData.educationPortfolio.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Diplôme / Formation
                      </label>
                      <Input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Établissement
                      </label>
                      <Input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(edu.id, "institution", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date de début
                      </label>
                      <Input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(edu.id, "startDate", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date de fin
                      </label>
                      <Input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(edu.id, "endDate", e.target.value)
                        }
                        disabled={edu.current}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div className="flex items-center mt-6">
                      <Input
                        id={`current-edu-${edu.id}`}
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => {
                          updateEducation(edu.id, "current", e.target.checked);
                          if (e.target.checked) {
                            updateEducation(edu.id, "endDate", "");
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor={`current-edu-${edu.id}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        En cours
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-accent hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Certificates Section ---------------------------------------------------------------------------------------------------*/}
        <TabsContent
          value="certificates"
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Certificats
              </h2>
              <Button
                type="button"
                onClick={addCertificate}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white  bg-purple-600 hover:bg-purple-700"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Ajouter un certificat
              </Button>
            </div>

            <div className="space-y-6">
              {formData.certificatesPortfolio.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nom du certificat
                      </label>
                      <Input
                        type="text"
                        value={cert.name}
                        onChange={(e) =>
                          updateCertificate(cert.id, "name", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="ex: AWS Certified Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Organisme émetteur
                      </label>
                      <Input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) =>
                          updateCertificate(cert.id, "issuer", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="ex: Amazon Web Services"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date d'obtention
                      </label>
                      <Input
                        type="date"
                        value={cert.date}
                        onChange={(e) =>
                          updateCertificate(cert.id, "date", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        URL du certificat
                      </label>
                      <Input
                        type="url"
                        value={cert.url}
                        onChange={(e) =>
                          updateCertificate(cert.id, "url", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeCertificate(cert.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-accent hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Projects Section ---------------------------------------------------------------------------------------------------*/}
        <TabsContent
          value="projects"
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Projets</h2>
              <Button
                type="button"
                onClick={addProject}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Ajouter un projet
              </Button>
            </div>

            <div className="space-y-6">
              {formData.projectsPortfolio.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Titre du projet
                      </label>
                      <Input
                        type="text"
                        value={proj.title}
                        onChange={(e) =>
                          updateProject(proj.id, "title", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Technologies utilisées
                      </label>
                      <Input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) =>
                          updateProject(proj.id, "technologies", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="ex: React, Node.js, MongoDB"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Textarea
                      value={proj.description}
                      onChange={(e) =>
                        updateProject(proj.id, "description", e.target.value)
                      }
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        URL du projet
                      </label>
                      <Input
                        type="url"
                        value={proj.url}
                        onChange={(e) =>
                          updateProject(proj.id, "url", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image du projet
                      </label>
                      <div className="mt-1 flex items-center">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProjectImageChange(e, proj.id)}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                        />
                      </div>
                      {proj.image && (
                        <div className="mt-2">
                          <img
                             src={proj.image}
                             alt={proj.title || "Aperçu du projet"}
                             className="h-20 object-cover rounded border border-gray-200"
                           />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => removeProject(proj.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-accent hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Settings Section */}
        <TabsContent
          value="settings"
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Paramètres</h2>

            <div>
              <label
                htmlFor="themeColor"
                className="block text-sm font-medium text-gray-700"
              >
                Couleur principale
              </label>
              <div className="mt-1 flex items-center gap-4">
                <Input
                  type="color"
                  id="themeColor"
                  name="themeColor"
                  value={formData.themeColor}
                  onChange={handleInputChange}
                  className="h-10 w-20 p-0 border-0 cursor-pointer"
                />
                <span className="text-sm text-gray-500">
                  Cette couleur sera utilisée pour les éléments principaux de
                  votre portfolio
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aperçu des couleurs
              </h3>
              <div className="flex flex-wrap gap-4">
                <div
                  className="w-24 h-24 rounded-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: formData.themeColor }}
                >
                  Principal
                </div>
                <div
                  className="w-24 h-24 rounded-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: formData.themeColor, opacity: 0.8 }}
                >
                  Secondaire
                </div>
                <div
                  className="w-24 h-24 rounded-md flex items-center justify-center text-gray-900 font-medium"
                  style={{ backgroundColor: formData.themeColor, opacity: 0.2 }}
                >
                  Fond
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="pt-5">
        <div className="flex justify-end">
          <Button
            type="submit"
            className="inline-flex justify-center py-7 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white  bg-purple-600 hover:bg-purple-700 "
          >
            <Brain />
            Générer mon portfolio
          </Button>
        </div>
      </div>
    </form>
  );
}
