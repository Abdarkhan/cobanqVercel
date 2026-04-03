import React, { useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion, useInView } from "framer-motion";
import { use_reveal } from "@/components/hooks/use_scroll_animation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const BORDER = "rgba(255,255,255,0.08)";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = (y) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
});

function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

const SOLUTIONS = [
  {
    image: "https://burqfx.com/public_assets/business_assets/icons/API.svg",
    title: "B2B",
    desc: "Provides businesses with robust cross-border payment solutions, designed for scale, compliance, and speed. From global payouts to supplier settlements, our platform simplifies how money moves across borders.",
  },
  {
    image: "https://burqfx.com/public_assets/business_assets/icons/bank_solutions.svg",
    title: "Correspondent Banking Partnerships",
    desc: "We work with regulated financial institutions and money service businesses to expand payout corridors, support last-mile delivery, and provide local settlement and liquidity. Let's partner on global disbursements.",
  },
  {
    image: "https://burqfx.com/public_assets/business_assets/icons/fintech.svg",
    title: "Fintech Collaborations",
    desc: "From payment apps to digital banks, we offer embedded FX, compliance-ready processing, white-label tools, and revenue-sharing models to help you launch and scale global payments.",
  },
];

export default function Solution() {
  const navigate = useNavigate();

  const heading = use_reveal({ y: 50, duration: 0.8 });

  return (
    <Box sx={{ bgcolor: '#e3eeff', color: "#e3eeff" }}>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient,
          // background: GRADIENT,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 4,
              py: { xs: 14, md: 18 },
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <motion.div variants={container} initial="hidden" animate="visible">

              <motion.div variants={item(40)}>
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2rem", sm: "2.8rem", md: "64px" },
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                    mb: 3,
                    maxWidth: 900,
                    mx: "auto",
                  }}
                >
                  LET'S BUILD THE FUTURE OF{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(90deg, #7eb8ff, #b8d4ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Global Payments
                  </Box>{" "}
                  – TOGETHER
                </Typography>
              </motion.div>

              <motion.div variants={item(30)}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.85,
                    maxWidth: 680,
                    mx: "auto",
                    mb: 5,
                    fontWeight: 400,
                  }}
                >
                  At CoBanq, we believe that collaboration drives innovation.
                  That's why we actively seek strategic partnerships with
                  fintechs, financial institutions, and correspondent banks to
                  scale the reach and impact of seamless cross-border payments.
                </Typography>
              </motion.div>

              <motion.div variants={item(24)}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    // href="/contact"
                     onClick={() => navigate(ROUTES.CONTACT)}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                    sx={{
                      background: "#053685",
                      color: "#fff",
                      py: 1.75,
                      // px: 4,
                      fontSize: "18px",
                      fontWeight: 600,
                      borderRadius: '10px',
                      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                      "&:hover": {
                        background: "rgba(255,255,255,0.95)",
                        color: "#000616",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    Get in touch
                  </Button>
                </motion.div>
              </motion.div>

            </motion.div>
          </Box>
        </Container>
      </Box>

      <Box>
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 10, md: 14 } }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,

              }}
            >
              {SOLUTIONS.map((sol, i) => (
                <Reveal key={sol.title} delay={i * 0.1}>
                  <Box
                    sx={{
                      p: 2,
                      height: "100%",
                      bgcolor: "white",
                      color: "#000616",
                      border: `1px solid ${BORDER}`,
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "border-color 0.3s, background 0.3s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(255,255,255,0.18)",
                      },
                    }}
                  >
                    {/* card image */}
                    <Box
                      component="img"
                      src={sol.image}
                      alt={sol.title}
                      sx={{
                        width: "30%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* card text */}
                    <Box sx={{ p: 3.5 }}>
                      <Typography
                        sx={(theme) => ({
                          ...theme.typography.main_header,
                          // fontWeight: 800,
                          fontSize: "1.1rem",
                          mb: 1.5,
                        })}
                      >
                        {sol.title}
                      </Typography>
                      <Typography
                        sx={(theme) => ({
                          ...theme.typography.main_text,
                        })}
                      >
                        {sol.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          // bgcolor: "Background.main",
          backgroundColor: "#ffffffff",
          color: "#000000ff",
          // py: { xs: 10, md: 14 },
          borderBottom: "1px solid var(--color-surface-border)",
        }}
      >
        <Container maxWidth="xl">
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
                  ...theme.typography.main_header, mb: 2,
                })}
              >
                Why partner with
                <br />CoBanq?
              </Typography>
              <Typography
                variant="body1"
                sx={(theme) => ({
                  ...theme.typography.main_text,
                  opacity: 0.9,
                  mb: 3,
                  maxWidth: 680,
                })}
              >
                As an FCA-regulated firm, we offer a trusted platform with a robust compliance infrastructure. Our global payout network spans 30+ corridors, providing you with extensive reach. Choose from flexible integration models, including platform, white-label, or correspondent formats all supported by scalable infrastructure designed for volume, reliability, and speed. We also provide dedicated partnership support, from onboarding to long-term growth strategy.
              </Typography>
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
                src="https://burqfx.com/public_assets/business_assets/images/handshake.png"
                alt="CoBanq"
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 33,
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
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          display: "flex",
          justifyContent: "center",
          px: 2,
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid white",
        }}
      >
        <Box
          sx={{
            bgcolor: "Background.main",
            borderRadius: 4,
            py: { xs: 4, md: 10 },
            // maxWidth: 800,
            width: "100%",
            textAlign: "center",
          }}
        >
          <motion.div
            ref={heading.ref}
            initial={heading.initial}
            animate={heading.animate}
          >
            {/* Heading */}
            <Typography
              //   variant="h4"
              sx={(theme) => ({
                ...theme.typography.main_header,
                color: "text.tertairy",
                // fontSize: { xs: "28px", md: "2.2rem" },
                lineHeight: 1.1,
                mb: "48px",
              })}
            >
              Become a CoBanq partner
            </Typography>
          </motion.div>
          {/* Description */}
          <Typography
            sx={(theme) => ({
              ...theme.typography.main_text,
              color: "text.secondary",
              mb: 4,
            })}
          >
            Ready to explore a strategic collaboration?
          </Typography>
          <Button
            // href="/contact"
            onClick={() => navigate(ROUTES.CONTACT)}
            variant="contained"
            sx={{
              background: "#053685",
              borderRadius: '10px',
              mt: 4,
              "&:hover": { bgcolor: "#5f7a8b" },
              textTransform: "none",
            }}
          >
            Let's grow together.
          </Button>
        </Box>
      </Box>

    </Box>
  );
}