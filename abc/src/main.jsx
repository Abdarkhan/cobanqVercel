// import React, { Suspense, lazy } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import CssBaseline from "@mui/material/CssBaseline";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Loader from "@/components/common/Loader";
// import ErrorScreen from "@/components/common/ErrorScreen";
// import "./index.css";

// // Route-level code splitting: pages load on demand instead of in the initial bundle
// const Home = lazy(() => import("@/pages/Home"));
// const About = lazy(() => import("@/pages/About"));
// const Faq = lazy(() => import("@/pages/Faq"));
// const Support = lazy(() => import("@/pages/Support"));
// const HelpCenter = lazy(() => import("@/pages/helpCenter"));
// const privacy_policy = lazy(() => import("@/pages/Privacy&Poliicy"));
// const Terms_Service = lazy(() => import("@/pages/Terms&Service"));
// const Cookies = lazy(() => import("@/pages/Cookies"));
// const Contact = lazy(() => import("@/pages/Contact"));
// const ExchangeRate = lazy(() => import("@/pages/Calculator"));
// const Solution = lazy(() => import("@/pages/Solution"));
// const Personal = lazy(() => import("@/pages/Personal"));
// const BusinessSolution = lazy(() => import("@/pages/business-solution"));

// const with_suspense = (LazyComponent) => (
//   <Suspense fallback={<Loader />}>
//     <LazyComponent />
//   </Suspense>
// );

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorScreen />,
//     children: [
//       { index: true, element: with_suspense(Home) },
//       { path: "solution", element: with_suspense(Solution) },
//       { path: "Personal", element: with_suspense(Personal) },
//       { path: "business", element: with_suspense(Home) },
//       { path: "BusinessSolution", element: with_suspense(BusinessSolution) },
//       { path: "about", element: with_suspense(About) },
//       { path: "Faq", element: with_suspense(Faq) },
//       { path: "Support", element: with_suspense(Support) },
//       { path: "Cookies", element: with_suspense(Cookies) },
//       { path: "help_center", element: with_suspense(HelpCenter) },
//       { path: "privacy_policy", element: with_suspense(privacy_policy) },
//       { path: "Terms_Service", element: with_suspense(Terms_Service) },
//       { path: "contact", element: with_suspense(Contact) },
//       { path: "ExchangeRate", element: with_suspense(ExchangeRate) },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <CssBaseline />
//     <RouterProvider router={router} fallbackElement={<Loader />} />
//   </React.StrictMode>,
// );


import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
// 1. Import createHashRouter instead of createBrowserRouter
import { createHashRouter, RouterProvider } from "react-router-dom";
import Loader from "@/components/common/Loader";
import ErrorScreen from "@/components/common/ErrorScreen";
import "./index.css";

// Route-level code splitting
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Faq = lazy(() => import("@/pages/Faq"));
const Support = lazy(() => import("@/pages/Support"));
const HelpCenter = lazy(() => import("@/pages/helpCenter"));
const privacy_policy = lazy(() => import("@/pages/Privacy&Poliicy"));
const Terms_Service = lazy(() => import("@/pages/Terms&Service"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const Contact = lazy(() => import("@/pages/Contact"));
const ExchangeRate = lazy(() => import("@/pages/Calculator"));
const Solution = lazy(() => import("@/pages/Solution"));
const Personal = lazy(() => import("@/pages/Personal"));
const BusinessSolution = lazy(() => import("@/pages/business-solution"));

const with_suspense = (LazyComponent) => (
  <Suspense fallback={<Loader />}>
    <LazyComponent />
  </Suspense>
);

// 2. Change createBrowserRouter to createHashRouter
export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: with_suspense(Home) },
      { path: "solution", element: with_suspense(Solution) },
      { path: "personal", element: with_suspense(Personal) }, // Lowercased for consistency
      { path: "business", element: with_suspense(Home) },
      { path: "business-solution", element: with_suspense(BusinessSolution) }, // Lowercased
      { path: "about", element: with_suspense(About) },
      { path: "faq", element: with_suspense(Faq) }, // Lowercased
      { path: "support", element: with_suspense(Support) }, // Lowercased
      { path: "cookies", element: with_suspense(Cookies) }, // Lowercased
      { path: "help_center", element: with_suspense(HelpCenter) },
      { path: "privacy_policy", element: with_suspense(privacy_policy) },
      { path: "terms_service", element: with_suspense(Terms_Service) }, // Lowercased
      { path: "contact", element: with_suspense(Contact) },
      { path: "exchange-rate", element: with_suspense(ExchangeRate) }, // Lowercased
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} fallbackElement={<Loader />} />
  </React.StrictMode>,
);
