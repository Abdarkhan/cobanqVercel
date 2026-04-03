import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const steps = [
  {
    step: 1,
    title: "Sign up for free",
    desc: "Create your account in minutes with just an email. No paperwork, no hassle.",
  },
  {
    step: 2,
    title: "Get a quote",
    desc: "Choose destination, currencies, and amount. See your rate and fees upfront.",
  },
  {
    step: 3,
    title: "Add your recipient",
    desc: "Enter your recipient’s details—name, account or wallet information.",
  },
  {
    step: 4,
    title: "Verify your identity",
    desc: "Quick verification when needed. We use it to keep your money and data safe.",
  },
  {
    step: 5,
    title: "Confirm & pay",
    desc: "Fund your transfer via bank account, card, or other supported methods.",
  },
  {
    step: 6,
    title: "Track your transfer",
    desc: "Follow your transfer in real time. Get support by chat, phone, or email.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StepsSection() {
  const navigate = useNavigate();

  const ref = useRef(null);
  const in_view = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "Background.main",
        borderBottom: "1px solid var(--color-surface-border)",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={container}
          initial="hidden"
          animate={in_view ? "visible" : "hidden"}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{
                display: "block",
                color: "text.accent",
                letterSpacing: 2,
                fontWeight: 700,
                mb: 1.5,
              }}
            >
              How it works
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "text.tertairy",
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              From sign-up to first transfer
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.tertairy",
                opacity: 0.85,
                maxWidth: 520,
                mx: "auto",
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
              Six simple steps. No hidden fees, no surprises.
            </Typography>
          </Box>

          {/* Steps: desktop = 3-col grid with connector; mobile = stacked */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: { xs: 3, md: 4 },
              position: "relative",
            }}
          >
            {steps.map(({ step, title, desc }) => (
              <motion.div key={step} variants={item}>
                <Box
                  sx={{
                    height: "100%",
                    p: { xs: 3, md: 3.5 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "var(--color-surface-border)",
                    bgcolor: "Background.secondary",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.15)",
                      borderColor: "rgba(5, 54, 132, 0.25)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.06)",
                    },
                    position: "relative",
                  }}
                >
                  {/* Step number badge */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "#000616",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      mb: 2,
                      flexShrink: 0,
                    }}
                  >
                    {step}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "text.tertairy",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.tertairy",
                      opacity: 0.85,
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* CTA hint */}
          <motion.div
            variants={item}
            style={{ textAlign: "center", marginTop: 48 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.tertairy",
                opacity: 0.75,
                fontWeight: 500,
              }}
            >
              Ready to start?{" "}
              <Box
                component="a"
                // href="/contact"
                onClick={() => navigate(ROUTES.CONTACT)}
                sx={{
                  color: "text.accent",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Get in touch →
              </Box>
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
