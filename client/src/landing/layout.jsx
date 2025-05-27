import "./globals.css";

export const metadata = {
  title: "Créateur de Portfolio",
  description: "Créez facilement votre portfolio professionnel personnalisé",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
