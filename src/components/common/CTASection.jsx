import React, { useRef } from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { motion, useInView } from "framer-motion";


function Reveal({ children, delay = 0, direction = "up", once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const hidden = {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : hidden}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CTASection() {
  const paymentSolution = [
    {
      image:
        "https://burqfx.com/public_assets/business_assets/images_v2/header3.png",
      title: "Multi-currency accounts",
      desc: "Separate overseas bank accounts can be a costly and cumbersome way of doing business. With CoBanq, one account allows you to send and receive up to 46 currencies from one account.",
    },
    {
      image:
        "https://burqfx.com/public_assets/business_assets/images_v2/header2.png",
      title: "Mass payments",
      desc: "Streamline large scale payments to suppliers, staff, and partners, across the globe. Mass Payments supports efficient bulk transfers in 73 currencies.",
    },
    // {
    //   image:
    //     "https://burqfx.com/public_assets/business_assets/images_v2/header2.png",
    //   title: "Lorem Ipsum",
    //   desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    // },
  ];

  return (
    <Box
      sx={{
        // bgcolor: "Background.main",
        backgroundColor: "#E3EEFF",
        p: 5,
        py: { xs: 8, md: 10 },
        borderBottom: "1px solid var(--color-surface-border)",
      }}
    >
      <Container maxWidth="xl" sx={{ textAlign: "center", }}>
        <Typography
          variant="main_header"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "24px", sm:'38px', md: "48px" }, fontFamily: '"Inter", Arial, sans-serif', color: "#132E5A" }}
        >
          Payment Solutions
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "2fr", md: "repeat(2, 1fr)" },
            gap: 3,
            mt: 4,
          }}
        >
          {paymentSolution.map((feature, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mx: "auto",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid var(--color-surface-border)",
                  bgcolor: "Background.secondary",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                    borderColor: "rgba(30,120,255,0.2)",
                  },
                }}
                elevation={0}
              >
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "auto",
                    mb: 2,
                    objectFit: "cover",
                    // borderRadius: 2,
                  }}
                />
                <Box sx={{ p: 2, minHeight: "12em", textAlign: "left" }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      color: "text.tertairy",
                      fontSize: '24px',
                      fontWeight: 600,
                      fontFamily: '"Inter", Arial, sans-serif',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="main_text"
                    sx={{
                      color: "text.tertairy",
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Box>


      </Container>
    </Box>
  );
}
