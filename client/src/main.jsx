import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MainPage from "./MainPage.jsx";

function App() {
  const queryClient = new QueryClient({});

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Theme appearance="dark">
          <MainPage />
        </Theme>
      </QueryClientProvider>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
