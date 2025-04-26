import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
   <Helmet>
  {/* Preconnect early */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />

  {/* Preload the font stylesheets */}
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Nunito+Sans:wght@300;400;600&family=Cinzel:wght@400;600&display=swap" />

  {/* Load them properly */}
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Nunito+Sans:wght@300;400;600&family=Cinzel:wght@400;600&display=swap"
    rel="stylesheet"
    media="all"
  />

  <title>Sree Guru Living Space Science</title>
</Helmet>

    <App />
  </HelmetProvider>,
);
