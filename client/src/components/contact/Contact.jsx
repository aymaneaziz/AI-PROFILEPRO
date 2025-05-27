import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import Swal from "sweetalert2";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formDataToSend = new FormData(form);
    formDataToSend.append("access_key", "7ec5bac0-e690-46af-92e2-a8fef6a04741");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Merci !",
          text: "Votre message a bien été envoyé.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        setFormData({ fullName: "", email: "", message: "" });
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        Swal.fire({
          title: "Erreur",
          text: data.message || "Une erreur est survenue.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur réseau",
        text: "Impossible d'envoyer le message. Veuillez réessayer plus tard.",
        icon: "error",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <Card className="w-full max-w-md rounded-lg shadow-md bg-white">
        <CardHeader className="mb-4">
          <CardTitle className="text-3xl font-extrabold text-center text-indigo-600">
            Contactez-nous
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Remplissez le formulaire ci-dessous et nous vous répondrons dès que
            possible.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="font-semibold">
                Nom complet
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Votre nom complet"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message" className="font-semibold">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Écrivez votre message ici..."
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 min-h-[120px]"
              />
            </div>

            {isSubmitted && (
              <div className="text-center text-green-600 font-medium">
                Message envoyé avec succès !
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <Send className="h-5 w-5" />
              )}
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Contact;
