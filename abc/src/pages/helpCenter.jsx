import React, { useState, useRef } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// Reusable Reveal wrapper
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
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

// Data
const categories = [
  {
    icon: "💱",
    title: "Currency Exchange",
    desc: "Rates, conversions, supported currencies",
  },
  {
    icon: "🏦",
    title: "Account & Billing",
    desc: "Manage your account, payments, invoices",
  },
  {
    icon: "🔒",
    title: "Security & Privacy",
    desc: "2FA, data protection, fraud prevention",
  },
  { icon: "📲", title: "Mobile App", desc: "Setup, features, troubleshooting" },
  {
    icon: "🔗",
    title: "API & Integration",
    desc: "Developer docs, webhooks, sandbox",
  },
  {
    icon: "🌍",
    title: "International",
    desc: "Global coverage, regulations, limits",
  },
];

const faqs = [
  {
    q: "How do I exchange currency on CoBanQ?",
    a: "Simply enter the amount you want to exchange, select your source and target currencies, and confirm the transaction. Rates are updated in real-time and you'll see the exact amount before confirming.",
  },
  {
    q: "What currencies does CoBanQ support?",
    a: "CoBanQ supports 180+ currencies across 6 continents. This includes all major currencies like USD, EUR, GBP, JPY as well as emerging market currencies like PKR, BDT, NGN, and more.",
  },
  {
    q: "How long does a transfer take?",
    a: "Most transfers are completed within minutes. Bank transfers may take 1–3 business days depending on your bank and country. You'll receive real-time notifications at every step.",
  },
  {
    q: "Are there any hidden fees?",
    a: "Never. CoBanQ is committed to full transparency. All fees are shown upfront before you confirm any transaction. There are no hidden charges, no surprises.",
  },
  {
    q: "How do I reset my password?",
    a: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox. For security reasons, the reset link expires after 30 minutes.",
  },
  {
    q: "Is my money safe with CoBanQ?",
    a: "Yes. Your funds are held in segregated accounts with tier-1 banks. We use bank-grade AES-256 encryption and are fully regulated. We also offer optional 2FA for added account security.",
  },
];

const guides = [
  { icon: "🚀", title: "Getting Started", time: "5 min read" },
  { icon: "💸", title: "Making Your First Transfer", time: "3 min read" },
  { icon: "📊", title: "Reading Live Rate Charts", time: "4 min read" },
  { icon: "🔑", title: "Setting Up 2FA Security", time: "2 min read" },
];

// FAQ Item
function FaqItem({ q, a, border }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          // background: surface,
          // border: `1px solid ${open ? "text.accent" + "44" : border}`,
          borderRadius: "12px",
          p: 3,
          mb: 2,
          cursor: "pointer",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: open ? `0 8px 30px ${"text.accent"}18` : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 15,
              color: "text.tertairy",
              flex: 1,
            }}
          >
            {q}
          </Typography>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: open ? "text.accent" : "transparent",
                // border: `1.5px solid ${open ? "text.accent" : border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.tertairy",
                transition: "all 0.3s",
              }}
            >
              +
            </Box>
          </motion.div>
        </Box>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <Typography
                sx={{
                  color: "text.tertairy",
                  fontSize: 14,
                  lineHeight: 1.8,
                  mt: 2,
                  pt: 2,
                  borderTop: `1px solid white`,
                }}
              >
                {a}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
}

const stagger_item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Main Component
const HelpCenter = () => {
  const navigate = useNavigate();

  const [searchVal, setSearchVal] = useState("");

  return (
    <Box
      sx={{
        bgcolor: "Background.main",
        color: "text.tertairy",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        {/* Glow orbs */}
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: "15%",
            width: 350,
            height: 350,
            // background: `radial-gradient(circle, ${dark ? "rgba(124,159,212,0.12)" : "rgba(255,255,255,0.08)"} 0%, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            left: "10%",
            width: 280,
            height: 280,
            // background: `radial-gradient(circle, ${dark ? "rgba(124,159,212,0.08)" : "rgba(255,255,255,0.06)"} 0%, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md">
          <Reveal delay={0}>
            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: "text.accent",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 24,
                  height: 1.5,
                  background: "currentColor",
                  display: "inline-block",
                }}
              />
              Support Center
              <Box
                component="span"
                sx={{
                  width: 24,
                  height: 1.5,
                  background: "currentColor",
                  display: "inline-block",
                }}
              />
            </Typography>
          </Reveal>

          <Reveal delay={0.1}>
            <Typography
              sx={{
                fontSize: { xs: 38, md: 58 },
                fontWeight: 700,
                color: "text.tertairy",
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              How can we{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                help you?
              </Box>
            </Typography>
          </Reveal>

          <Reveal delay={0.2}>
            <Typography sx={{ color: "text.tertairy", fontSize: 16, mb: 5 }}>
              Search our knowledge base or browse topics below
            </Typography>
          </Reveal>

          {/* Search Bar */}
          <Reveal delay={0.3}>
            <Box sx={{ position: "relative", maxWidth: 580, mx: "auto" }}>
              <Box
                component="input"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search for answers... e.g. 'how to transfer money'"
                sx={{
                  width: "100%",
                  // background: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.95)",
                  // border: `1.5px solid ${dark ? "rgba(124,159,212,0.3)" : "rgba(255,255,255,0.4)"}`,
                  borderRadius: "50px",
                  px: 3,
                  pr: 14,
                  py: 2,
                  // fontSize: 15, color: dark ? "#fff" : "#0d1117",
                  outline: "none",
                  fontFamily: "inherit",
                  backdropFilter: "blur(12px)",
                  // "&::placeholder": { color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)" },
                  // "&:focus": { borderColor: dark ? "#7c9fd4" : "rgba(255,255,255,0.9)" },
                  transition: "border-color 0.3s",
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: "absolute",
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Button
                  sx={{
                    background: "text.accent",
                    color: "text.accent",
                    borderRadius: "50px",
                    px: 3,
                    py: 1,
                    fontSize: 13,
                    fontWeight: 600,
                    minWidth: "auto",
                    "&:hover": { background: "text.accent", opacity: 0.9 },
                  }}
                >
                  Search
                </Button>
              </motion.div>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* CATEGORIES GRID */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Reveal delay={0}>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "text.accent",
                  mb: 2,
                }}
              >
                Browse Topics
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 28, md: 40 },
                  fontWeight: 700,
                  color: "text.tertairy",
                }}
              >
                What do you need{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  help with?
                </Box>
              </Typography>
            </Box>
          </Reveal>

          <Grid
            container
            spacing={3}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "2fr", md: "repeat(6, 1fr)" },
              gap: 3,
            }}
          >
            {categories.map((cat, i) => (
              <Grid item xs={12} sm={6} md={2} key={i}>
                <motion.div key={cat} variants={stagger_item}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      // border: '1px solid',
                      borderColor: "rgba(255,255,255,0.08)",
                      bgcolor: "Background.secondary",
                      color: "text.tertairy",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "rgba(37, 99, 235, 0.4)",
                        transform: "scale(1.1)",
                      },
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        // background: accentSoft,
                        border: `1px solid ${"text.accent"}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        mb: 2.5,
                      }}
                    >
                      {cat.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        mb: 0.8,
                        color: "text.tertairy",
                      }}
                    >
                      {cat.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.tertairy",
                        fontSize: 13,
                        lineHeight: 1.6,
                      }}
                    >
                      {cat.desc}
                    </Typography>
                    <Box
                      sx={{
                        mt: 2.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.accent",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      View articles
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Box>
                  </Box>
                </motion.div>
                {/* </Reveal> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ borderTop: `1px solid white` }} />

      {/* FAQ SECTION */}
      <Box
        sx={{ py: { xs: 8, md: 12 }, position: "relative", overflow: "hidden" }}
      >
        <Container
          maxWidth="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Grid container spacing={8} > */}
          {/* Row 1 — Centered Label */}
          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
              }}
            >
              <Reveal delay={0}>
                <Typography
                  sx={{
                    fontSize: { xs: 30, md: 40 },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    mb: 2.5,
                    color: "text.tertairy",
                  }}
                >
                  Common{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Questions
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    color: "text.tertairy",
                    lineHeight: 1.8,
                    fontSize: 15,
                    mb: 4,
                  }}
                >
                  Can't find your answer here? Our support team is available
                  24/7.
                </Typography>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    // href="/contact"
                    onClick={() => navigate(ROUTES.CONTACT)}
                    variant="contained"
                    size="large"
                    sx={{
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    }}
                  >
                    Contact Support →
                  </Button>
                </motion.div>
              </Reveal>
            </Box>
          </Grid>

          {/* </Grid> */}
          {/* Row 2 — FAQ list full width */}
          <Grid item xs={12} sx={{ mt: { xs: 1, md: 4 } }}>
            {faqs.map((item, i) => (
              <Reveal key={i} delay={0.05 + i * 0.06}>
                <FaqItem {...item} />
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ borderTop: `1px solid white` }} />

      {/* GUIDES */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Reveal delay={0}>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "text.accent",
                  mb: 2,
                }}
              >
                Learn
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 28, md: 40 },
                  fontWeight: 700,
                  color: "text.tertiary",
                }}
              >
                Quick Start{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Guides
                </Box>
              </Typography>
            </Box>
          </Reveal>

          <Grid container spacing={3}>
            {guides.map((g, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Reveal delay={0.08 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 280 }}
                  >
                    <Box
                      sx={{
                        // background: surface,
                        bgcolor: "Background.secondary",
                        color: "text.tertairy",
                        borderRadius: "16px",
                        p: 3,
                        cursor: "pointer",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          borderColor: "text.accent" + "55",
                          boxShadow: `0 16px 40px ${"text.accent"}15`,
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: 32, mb: 2 }}>
                        {g.icon}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: 15,
                          mb: 1,
                          color: "text.tertairy",
                        }}
                      >
                        {g.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "text.tertairy",
                          letterSpacing: 1,
                        }}
                      >
                        {g.time}
                      </Typography>
                    </Box>
                  </motion.div>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* STILL NEED HELP — Contact Options */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Reveal delay={0}>
            <Typography
              sx={{
                fontSize: { xs: 28, md: 40 },
                fontWeight: 700,
                mb: 2,
                color: "text.tertairy",
              }}
            >
              Still need{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                help?
              </Box>
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Typography
              sx={{
                color: "text.tertairy",
                fontSize: 15,
                mb: 6,
                lineHeight: 1.7,
              }}
            >
              Our support team is ready around the clock — reach us your way.
            </Typography>
          </Reveal>

          <Grid container spacing={2.5} justifyContent="center">
            {[
              {
                icon: "💬",
                label: "Live Chat",
                sub: "Avg. 2 min reply",
                color: "#00d4aa",
              },
              {
                icon: "📧",
                label: "Email Us",
                sub: "support@cobanq.com",
                color: "#7c9fd4",
              },
              {
                icon: "📞",
                label: "Call Us",
                sub: "+1 800-cobanq",
                color: "#d4a843",
              },
            ].map((item, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Reveal delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Box
                      sx={{
                        // background: surface,
                        bgcolor: "Background.secondary",
                        color: "text.tertairy",
                        borderRadius: "16px",
                        p: 3,
                        cursor: "pointer",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          borderColor: item.color + "55",
                          boxShadow: `0 12px 36px ${item.color}18`,
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 30, mb: 1.5, color: "text.tertairy" }}
                      >
                        {item.icon}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 15,
                          mb: 0.5,
                          color: "text.tertairy",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "text.tertairy" }}>
                        {item.sub}
                      </Typography>
                    </Box>
                  </motion.div>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HelpCenter;
