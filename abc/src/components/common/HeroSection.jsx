import { useRef, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import hero from "../../assets/hero.png";
import AccountTypeModal from "../modal/AccountTypeModal";

const GRADIENT = "linear-gradient(135deg, #000616 0%, #053685 100%)";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = (y) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function HeroSection() {
  const [modalMode, setModalMode] = useState(null); // "register" | null

  const section_ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section_ref,
    offset: ["start start", "end start"],
  });

  const preview_y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.85], [48, 0, -24, -60]);
  const preview_scale = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.7, 1], [0.88, 1, 1.02, 1, 0.96]);
  const preview_opacity = useTransform(scrollYProgress, [0, 0.12, 0.2, 0.88, 1], [0.5, 1, 1, 1, 0.6]);
  const preview_rotate_x = useTransform(scrollYProgress, [0, 0.25], [10, 0]);
  const preview_shadow = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.4, 0.85]);
  const preview_box_shadow = useTransform(
    preview_shadow,
    (v) =>
      `0 ${30 + v * 50}px ${60 + v * 40}px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)`,
  );

  return (
    <Box
      ref={section_ref}
      sx={{
        minHeight: { xs: "100vh", md: "140vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: GRADIENT,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(5,54,132,0.4) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,6,22,0.5) 0%, transparent 40%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          pointerEvents: "none",
          opacity: 0.6,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 }, mt: { xs: 0, sm: 4, md: 0 } }}
      >
        <motion.div variants={container} initial="hidden" animate="visible">

          <motion.div variants={item(40)}>
            <Typography
              component="h1"
              sx={{
                color: "#fff",
                mb: 2,
                mx: "auto",
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "80px" },
                fontWeight: 900,
                fontFamily: '"Inter", Arial, sans-serif',
                lineHeight: 1.1,
              }}
            >
              Powering the flow<br /> of{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #7eb8ff, #b8d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                global capital
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={item(30)}>
            <Typography
              sx={(theme) => ({
                ...theme.typography.main_text,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 600,
                mx: "auto",
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.6,
              })}
            >
              At CoBanq, we use smart technology and a global network to make
              international transfers effortless, from personal remittances to
              enterprise FX, so your money moves faster and more affordably.
            </Typography>
          </motion.div>

          <motion.div
            variants={item(24)}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            {/* ── Open an Account → opens Register modal ── */}
            <Button
              variant="contained"
              size="large"
              onClick={() => setModalMode("register")}
              sx={{
                background: "#053685",
                color: "#fff",
                py: 1.75,
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "10px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                "&:hover": {
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  color: "#000616",
                },
              }}
            >
              Open an account
            </Button>
          </motion.div>

          <motion.div
            variants={item(80)}
            style={{ marginTop: 36, perspective: "1000px" }}
          >
            <motion.div
              style={{
                y: preview_y,
                scale: preview_scale,
                opacity: preview_opacity,
                rotateX: preview_rotate_x,
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                borderRadius: 8,
              }}
            >
              <motion.div style={{ boxShadow: preview_box_shadow }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={hero} alt="App preview" decoding="async" style={{ width: "100%" }} />
                </Box>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </Container>

      {/* ── Account Type Modal ─────────────────────────────────────────── */}
      <AccountTypeModal
        open={Boolean(modalMode)}
        onClose={() => setModalMode(null)}
        mode={modalMode}
      />
    </Box>
  );
}