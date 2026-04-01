
import App from "./App";
import ReactDOM from "react-dom/client";
import { ROUTES } from "@/constants/routes";
import React, { Suspense, lazy } from "react";
import Loader from "@/components/common/Loader";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorScreen from "@/components/common/ErrorScreen";
import { createHashRouter, RouterProvider } from "react-router-dom";
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
      { path: ROUTES.SOLUTION, element: with_suspense(Solution) },
      { path: ROUTES.PERSONAL, element: with_suspense(Personal) },
      { path: ROUTES.BUSINESS, element: with_suspense(Home) },
      { path: ROUTES.BUSINESS_SOLUTION, element: with_suspense(BusinessSolution) },
      { path: ROUTES.ABOUT, element: with_suspense(About) },
      { path: ROUTES.FAQ, element: with_suspense(Faq) },
      { path: ROUTES.SUPPORT, element: with_suspense(Support) },
      { path: ROUTES.COOKIES, element: with_suspense(Cookies) },
      { path: ROUTES.HELP_CENTER, element: with_suspense(HelpCenter) },
      { path: ROUTES.PRIVACY_POLICY, element: with_suspense(privacy_policy) },
      { path: ROUTES.TERMS_SERVICE, element: with_suspense(Terms_Service) },
      { path: ROUTES.CONTACT, element: with_suspense(Contact) },
      { path: ROUTES.EXCHANGE_RATE, element: with_suspense(ExchangeRate) },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} fallbackElement={<Loader />} />
  </React.StrictMode>,
);
