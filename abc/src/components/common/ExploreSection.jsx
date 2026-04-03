import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function ExploreSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        // bgcolor: "Background.main",
        backgroundColor: "#e3eeff",
        py: { xs: 10, md: 14 },
        borderBottom: "1px solid var(--color-surface-border)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Box sx={{ flex: { md: "1 1 50%" }, maxWidth: { md: "50%" } }}>
            <Typography
              // variant="main_header"
              sx={(theme) => ({
                ...theme.typography.main_header,
                mb: 2,
              })}
            >
              Explore what's possible with CoBanq
            </Typography>
            <Typography
              variant="body1"
              sx={(theme) => ({
                ...theme.typography.main_text,
                opacity: 0.9,
                mb: 3,
                maxWidth: 480,
              })}
            >
              Multi-currency accounts, global payouts, and APIs for developers.
              Talk to our team to find the right solution.
            </Typography>
            <Button
              onClick={() => navigate(ROUTES.CONTACT)} // href="/contact"
              variant="contained"
              sx={{
                background: "#053685",
                borderRadius: "10px",
                mt: 4,
                "&:hover": { bgcolor: "#5f7a8b" },
                textTransform: "none",
              }}
            >
              Get in touch
            </Button>
          </Box>
          <Box
            sx={{
              flex: { md: "0 0 auto" },
              width: { xs: "100%", md: "45%" },
              maxWidth: 480,
            }}
          >
            <Box
              component="img"
              src="https://burqfx.com/public_assets/business_assets/images_v2/header7.png"
              // src="https://burqfx.com/public_assets/business_assets/images/globe.png"
              // src="https://burqfx.com/public_assets/business_assets/images_v2/header4.png"
              alt="CoBanq"
              loading="lazy"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: 10,
                // borderRadius: 33,
                // border: "1px solid var(--color-surface-border)",
                // boxShadow: " 24px 88px rgba(247, 233, 233, 1)",
                // boxShadow: "0 24px 48px rgba(226, 222, 222, 1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
