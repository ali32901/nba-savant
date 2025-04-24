import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Index from "./routes/index.jsx";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
const queryClient = new QueryClient({});
// function App() {

//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <Theme>
//           <Index />
//         </Theme>
//       </QueryClientProvider>
//     </>
//   );
// }

const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </QueryClientProvider>
    </StrictMode>
  );
}

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//         <Theme>
//           <Index />
//         </Theme>
//       </QueryClientProvider>
//   </StrictMode>
// );
