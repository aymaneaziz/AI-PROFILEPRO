import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import Home from "./home/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/edit";
import ViewResume from "./my-resume/[resumeId]/view";
import Portfolio from "./portfolio/portfolio-spec/[portfolioId]/edit";
import LandingPage from "./landing";
import Portfoliospec from "./portfolio";
import ViewPortfolio from "./my-portfolio/[portfolioId]/view";
import Contact from "./components/contact/Contact";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    element: <App />,
    children: [
      {
        path: "/portfolio",
        element: <Portfoliospec />,
      },
      {
        path: "/portfolio/portfoliospec/:portfolioId/edit",
        element: <Portfolio />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />,
  },
  {
    path: "/my-portfolio/:portfolioId/view",
    element: <ViewPortfolio />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
