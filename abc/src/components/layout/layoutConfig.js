import { ROUTES } from "@/constants/routes";

export const layoutConfig = {
  "/": {
    navbar: true,
    footer: true,
    layout: "public",
  },

  "/about": {
    navbar: true,
    footer: true,
    layout: "about",
  },

  "/contact": {
    navbar: true,
    footer: true,
    layout: "contact",
  },
  "/help_center": {
    navbar: true,
    footer: true,
    layout: "help_center",
  },

  "/ExchangeRate": {
    navbar: true,
    footer: true,
    layout: ROUTES.EXCHANGE_RATE,
  },

  "*": {
    navbar: true,
    footer: true,
    layout: "public",
  },
};