import { layoutConfig } from "@/components/layout/layoutConfig";

export const getLayoutConfig = (pathname) => {
  const routes = Object.keys(layoutConfig);

  const matchedRoute = routes.find((route) => {
    if (route === "*") return false;
    return pathname === route;
  });

  return layoutConfig[matchedRoute] || layoutConfig["*"];
};
