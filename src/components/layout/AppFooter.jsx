import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  // Link,
  Stack,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link, Link as RouterLink } from "react-router-dom";
import { ICONS } from "@/constants/icons";

const FOOTER_LINKS = {
  solutions: {
    title: "Solutions",
    links: [
      { label: "All Solutions", href: "/solution" },
      { label: "Calculator", href: "/ExchangeRate" },
      // { label: "Business Solutions", href: "/solutions" },
      // { label: "Personal Transfers", href: "/solutions" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  help: {
    title: "Help & Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Support Center", href: "/support" },
    ],
  },
};

const SOCIAL = [
  { Icon: Twitter, href: "https://x.com/BurqFx", label: "Twitter" },
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61580726721298", label: "Facebook" },
  { Icon: LinkedIn, href: "https://www.linkedin.com/company/burqfx", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/burqfx", label: "Instagram" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/Terms_Service" },
  { label: "Privacy Policy", href: "/Privacy_Policy" },
];

function InternalLink({ href, sx, children }) {
  return (
    <Link
      component={RouterLink}
      to={href}
      underline="none"
      onClick={() => window.scrollTo(0, 0)}
      style={sx}
    // style={{color:'white'}}
    >
      {children}
    </Link>
  );
}

const AppFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        backgroundColor: "#000616",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* ── Main footer content ── */}
        <Box
          sx={{
            pt: { xs: 8, md: 10 },
            pb: { xs: 6, md: 8 },
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Grid container spacing={{ xs: 5, md: 6 }} sx={{ justifyContent: "space-between" }}>

            <Grid item xs={12} md={4} lg={3}>
              {/* ── Logo — internal link ── */}
              <InternalLink href="/" sx={{ display: "inline-block", mb: 2 }}>
                <Box
                  component="img"
                  src={ICONS.Logo}
                  alt="CoBanq"
                  sx={{ height: 32, width: "auto" }}
                />
              </InternalLink>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: 280,
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                CoBanq is a modern financial platform designed to make
                international money transfers and payments seamless, secure,
                and affordable.
              </Typography>

              {/* ── Social icons — external links, href theek hai ── */}
              <Stack direction="row" spacing={0.5}>
                {SOCIAL.map(({ Icon, href, label }) => (
                  <IconButton
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      bgcolor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "#fff",
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {/* ── Link columns — Solutions / Company / Help & Support ── */}
            {Object.entries(FOOTER_LINKS).map(([key, { title, links }]) => (
              <Grid item xs={6} md={2} lg={4} key={key}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    fontWeight: 700,
                    display: "block",
                    mb: 2,
                  }}
                >
                  {title}
                </Typography>
                <Stack spacing={1.25}>
                  {links.map(({ label, href }) => (
                    <InternalLink
                      key={label}
                      href={href}
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        transition: "color 0.2s",
                        textDecoration: "none",
                        "&:hover": { color: "#fff" },
                      }}
                    >
                      {label}
                    </InternalLink>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── Bottom bar — copyright left, legal links right ── */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}
          >
            &copy; {new Date().getFullYear()} CoBanq. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "rgba(255,255,255,0.15)" }}
              />
            }
          >
            {LEGAL_LINKS.map(({ label, href }) => (
              <InternalLink
                key={label}
                href={href}
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.8rem",
                  transition: "color 0.2s",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                {label}
              </InternalLink>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;