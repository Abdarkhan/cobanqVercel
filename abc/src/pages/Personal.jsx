import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// ─── Reveal──
function Reveal({ children, delay = 0, direction = "up", once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const hidden = {
    opacity: 0,
    y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    x: direction === "left" ? 70 : direction === "right" ? -70 : 0,
    scale: direction === "scale" ? 0.9 : 1,
  };
  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : hidden}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter──
function Counter({ to, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

//  Plan Card
function PlanCard({ name, price, desc, features, highlight, delay, navigate }) {
  return (
    <Reveal delay={delay} direction="up">
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ height: "40em" }}
      >
        <Box
          sx={{
            p: { xs: 3.5, md: 4.5 },
            borderRadius: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            bgcolor: "Background.secondary",
            ...(highlight
              ? {
                  background:
                    "linear-gradient(145deg, rgba(30,120,255,0.18) 0%, rgba(0,222,180,0.1) 100%)",
                  border: "1px solid rgba(30,120,255,0.35)",
                  boxShadow: "0 0 60px rgba(30,120,255,0.15)",
                }
              : {
                  border: "1px solid rgba(255,255,255,0.07)",
                }),
            "&::before": highlight
              ? {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                }
              : {},
          }}
        >
          {highlight && (
            <Chip
              label="Most Popular"
              size="small"
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                bgcolor: "rgba(30,120,255,0.2)",
                color: "text.accent",
                border: "1px solid rgba(30,120,255,0.3)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            />
          )}
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "text.accent",
              mb: 2,
            }}
          >
            {name}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", gap: 1, mb: 1.5 }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: 36, md: 44 },
                lineHeight: 1,
                letterSpacing: "-2px",
                color: "text.tertairy",
              }}
            >
              {price}
            </Typography>
            {price !== "Custom" && (
              <Typography sx={{ color: "text.accent", fontSize: 14, mb: 0.5 }}>
                / month
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              fontSize: 13,
              color: "text.accent",
              lineHeight: 1.65,
              mb: 3.5,
              width: "20em",
            }}
          >
            {desc}
          </Typography>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3 }} />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mb: 4,
            }}
          >
            {features.map((f) => (
              <Box
                key={f}
                sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    mt: "2px",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    flexShrink: 0,
                    bgcolor: highlight
                      ? "rgba(0,222,180,0.15)"
                      : "rgba(255,255,255,0.06)",
                    border: highlight
                      ? "1px solid rgba(0,222,180,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                  }}
                >
                  ✓
                </Box>
                <Typography
                  sx={{ fontSize: 13, color: "text.accent", lineHeight: 1.5 }}
                >
                  {f}
                </Typography>
              </Box>
            ))}
          </Box>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              // onClick={() => navigate("/contact")}
              onClick={() => navigate(ROUTES.CONTACT)}
              fullWidth
              variant={highlight ? "contained" : "outlined"}
              sx={{
                py: 1.5,
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: 14,
                textTransform: "none",
                ...(highlight
                  ? {
                      background:
                        "linear-gradient(135deg,#1E78FF 0%,#00DEB4 100%)",
                      boxShadow: "0 8px 28px rgba(30,120,255,0.35)",
                    }
                  : {
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "text.tertairy",
                      "&:hover": {
                        border: "1px solid rgba(255,255,255,0.35)",
                        bgcolor: "Background.secondary",
                      },
                    }),
              }}
            >
              Get Started →
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Reveal>
  );
}

// Use Case Card
function UseCaseCard({ icon, title, desc, tag, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 3.5 },
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.07)",
            bgcolor: "Background.secondary",
            height: "21em",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backdropFilter: "blur(8px)",
            cursor: "default",
            transition: "border-color 0.3s",
            "&:hover": { borderColor: "rgba(30,120,255,0.3)" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: 32 }}>{icon}</Typography>
            <Chip
              label={tag}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                color: "text.accent",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.05em",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 15, md: 17 },
              letterSpacing: "-0.2px",
              color: "text.tertairy",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 13, md: 14 },
              color: "text.accent",
              lineHeight: 1.7,
            }}
          >
            {desc}
          </Typography>
        </Box>
      </motion.div>
    </Reveal>
  );
}

//  Main Component
const Personal = () => {
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const plans = [
    {
      name: "Starter",
      price: "$199",
      desc: "For growing businesses entering international markets for the first time.",
      features: [
        "Up to 50 transactions/month",
        "15 supported currencies",
        "Standard FX rates",
        "Email support",
        "Basic analytics dashboard",
        "REST API access",
      ],
      highlight: false,
    },
    {
      name: "Growth",
      price: "$599",
      desc: "For scaling teams that need speed, volume, and operational visibility.",
      features: [
        "Up to 500 transactions/month",
        "60+ supported currencies",
        "Preferential FX rates",
        "Priority support (24/7)",
        "Advanced analytics & reporting",
        "Webhook & API integrations",
        "Multi-user access",
        "Compliance toolkit",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For institutions requiring dedicated infrastructure and bespoke solutions.",
      features: [
        "Unlimited transactions",
        "180+ currencies & corridors",
        "Institutional FX rates",
        "Dedicated account manager",
        "Custom SLA & uptime guarantee",
        "White-label options",
        "On-premise deployment",
        "Regulatory advisory support",
      ],
      highlight: false,
    },
  ];

  const useCases = [
    {
      icon: "🏭",
      title: "Supply Chain Payments",
      desc: "Pay international suppliers instantly with real-time settlement. Eliminate delays that disrupt production schedules.",
      tag: "Manufacturing",
    },
    {
      icon: "🛒",
      title: "E-Commerce Payouts",
      desc: "Disburse marketplace seller earnings across 180+ countries in their local currency automatically.",
      tag: "Retail",
    },
    {
      icon: "👥",
      title: "Global Payroll",
      desc: "Run cross-border payroll for remote teams with transparent FX rates and same-day delivery.",
      tag: "HR & Workforce",
    },
    {
      icon: "🏦",
      title: "Treasury Management",
      desc: "Centralise multi-currency liquidity, hedge FX exposure, and optimise cash flow across entities.",
      tag: "Finance",
    },
    {
      icon: "📱",
      title: "Fintech Embedding",
      desc: "White-label our payment rails into your product. Launch global payments in days, not months.",
      tag: "Technology",
    },
    {
      icon: "🌍",
      title: "NGO & Aid Disbursement",
      desc: "Send funds directly to beneficiaries in underserved regions — fast, traceable, and cost-efficient.",
      tag: "Non-Profit",
    },
  ];

  const stats = [
    { value: 180, suffix: "+", label: "Countries" },
    { value: 2, suffix: "s", label: "Avg Settlement" },
    { value: 99, suffix: ".9%", label: "Uptime SLA" },
    { value: 60, suffix: "+", label: "Currencies" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "Background.main",
        color: "text.tertairy",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ─ */}
      <Box
        ref={heroRef}
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 3, md: 6 },
          pt: { xs: 10, md: 0 },
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "5%",
              left: "8%",
              width: { xs: 180, md: 500 },
              height: { xs: 180, md: 500 },
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(30,120,255,0.16) 0%,transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "5%",
              width: { xs: 140, md: 380 },
              height: { xs: 140, md: 380 },
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(0,222,180,0.12) 0%,transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(6,12,24,0.7) 100%)",
            }}
          />
        </motion.div>

        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <Reveal delay={0.05}>
            <Chip
              label="Business"
              sx={{
                mb: 4,
                bgcolor: "rgba(0,222,180,0.1)",
                color: "text.accent",
                border: "1px solid rgba(0,222,180,0.22)",
                fontSize: { xs: 11, md: 12 },
                letterSpacing: "0.08em",
                fontWeight: 600,
                px: 1,
              }}
            />
          </Reveal>

          <Reveal delay={0.12}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 30, sm: 44, md: 70, lg: 80 },
                lineHeight: { xs: 1.18, md: 1.04 },
                letterSpacing: { xs: "-0.5px", md: "-2.5px" },
                color: "text.tertairy",
                mb: 3,
              }}
            >
              Powering the flow of{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#1E78FF 0%,#00DEB4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                global capital
              </Box>
            </Typography>
          </Reveal>

          <Reveal delay={0.22}>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: { xs: 15, sm: 18, md: 21 },
                maxWidth: 640,
                mx: "auto",
                lineHeight: 1.75,
                color: "text.accent",
                mb: 5,
              }}
            >
              At CoBanq, we use smart technology and a global network to make
              international transfers effortless, from personal remittances to
              enterprise FX, so your money moves faster and more affordably.
            </Typography>
          </Reveal>

          <Reveal delay={0.3}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  // onClick={() => navigate("/contact")}
                  onClick={() => navigate(ROUTES.CONTACT)}
                  variant="contained"
                  sx={{
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 1.8 },
                    fontSize: { xs: 14, md: 15 },
                    fontWeight: 700,
                    borderRadius: "100px",
                    textTransform: "none",
                    background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    boxShadow: "0 8px 32px rgba(30,120,255,0.35)",
                    "&:hover": {
                      boxShadow: "0 14px 44px rgba(30,120,255,0.5)",
                    },
                  }}
                >
                  Open a Business Account →
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  href="#plans"
                  variant="outlined"
                  sx={{
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 1.8 },
                    fontSize: { xs: 14, md: 15 },
                    fontWeight: 600,
                    borderRadius: "100px",
                    textTransform: "none",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "text.tertairy",
                    "&:hover": {
                      border: "1px solid rgba(255,255,255,0.35)",
                      bgcolor: "Background.secondary",
                    },
                  }}
                >
                  View Plans
                </Button>
              </motion.div>
            </Box>
          </Reveal>
        </Box>

        <motion.div
          style={{ position: "absolute", bottom: 36, zIndex: 1 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <Box
            sx={{
              width: 24,
              height: 40,
              borderRadius: "12px",
              border: "2px solid rgba(255,255,255,0.18)",
              display: "flex",
              justifyContent: "center",
              pt: 1,
            }}
          >
            <Box
              sx={{
                width: 4,
                height: 8,
                borderRadius: "2px",
                bgcolor: "text.accent",
              }}
            />
          </Box>
        </motion.div>
      </Box>

      {/* STATS BAR */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          py: { xs: 6, md: 7 },
          bgcolor: "Background.secondary",
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            {stats.map((s, i) => (
              <Grid
                item
                xs={6}
                md={3}
                key={s.label}
                sx={{ textAlign: "center", p: { xs: 2, md: 3 } }}
              >
                <Reveal delay={i * 0.1} direction="scale">
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: 36, md: 52 },
                      lineHeight: 1,
                      background: "Background.main",
                      color: "text.tertairy",
                      WebkitBackgroundClip: "text",
                      mb: 1,
                    }}
                  >
                    <Counter to={s.value} suffix={s.suffix} />
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 11, md: 13 },
                      color: "text.accent",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </Typography>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── USE CASES */}
      <Box sx={{ py: { xs: 8, md: 14 }, px: { xs: 2, md: 0 } }}>
        <Container maxWidth="lg">
          <Reveal delay={0.05}>
            <Typography
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: 12,
                fontWeight: 600,
                color: "text.accent",
                mb: 2,
              }}
            >
              Industry Solutions
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 800,
                fontSize: { xs: 26, md: 44 },
                letterSpacing: "-1px",
                lineHeight: 1.12,
                color: "text.tertairy",
                mb: { xs: 6, md: 10 },
              }}
            >
              Built for Every{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Business Model
              </Box>
            </Typography>
          </Reveal>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {useCases.map((uc, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={uc.title}
                sx={{ width: "14em" }}
              >
                <UseCaseCard {...uc} delay={0.06 + i * 0.08} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* HOW IT WORKS */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          px: { xs: 2, md: 0 },
          bgcolor: "Background.secondary",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Reveal delay={0.05}>
            <Typography
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: 12,
                fontWeight: 600,
                color: "text.accent",
                mb: 2,
              }}
            >
              How It Works
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 800,
                fontSize: { xs: 26, md: 44 },
                letterSpacing: "-1px",
                color: "text.tertairy",
                mb: { xs: 7, md: 11 },
              }}
            >
              From Onboarding to{" "}
              <Box
                component="span"
                sx={{
                  background: "Background.main",
                  color: "text.tertairy",
                  WebkitBackgroundClip: "text",
                }}
              >
                First Transfer
              </Box>{" "}
              in 48h
            </Typography>
          </Reveal>
          <Grid container spacing={{ xs: 3, md: 0 }} alignItems="stretch">
            {[
              {
                step: "01",
                icon: "📋",
                title: "Apply Online",
                desc: "Complete our digital onboarding form in under 10 minutes. Upload KYB documents and get verified.",
              },
              {
                step: "02",
                icon: "⚙️",
                title: "Configure Your Account",
                desc: "Set up your payment corridors, currency preferences, and integrate via API or dashboard.",
              },
              {
                step: "03",
                icon: "🚀",
                title: "Go Live",
                desc: "Initiate your first cross-border payment. Funds reach beneficiaries within seconds to hours.",
              },
            ].map((item, i) => (
              <Grid
                item
                xs={12}
                md={4}
                key={item.step}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Reveal delay={0.1 + i * 0.12}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      textAlign: { xs: "left", md: "center" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "center" },
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "16px",
                          bgcolor: "rgba(30,120,255,0.1)",
                          border: "1px solid rgba(30,120,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                        }}
                      >
                        {item.icon}
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "text.accent",
                        textTransform: "uppercase",
                        mb: 1,
                      }}
                    >
                      Step {item.step}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 17, md: 20 },
                        mb: 1.5,
                        color: "text.tertairy",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 13, md: 14 },
                        color: "text.accent",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── PRICING── */}
      <Box id="plans" sx={{ py: { xs: 8, md: 14 }, px: { xs: 2, md: 0 } }}>
        <Container maxWidth="lg">
          <Reveal delay={0.05}>
            <Typography
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: 12,
                fontWeight: 600,
                color: "text.accent",
                mb: 2,
              }}
            >
              Pricing
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 800,
                fontSize: { xs: 26, md: 44 },
                letterSpacing: "-1px",
                color: "text.tertairy",
                mb: { xs: 1.5, md: 2 },
              }}
            >
              Transparent, Scalable Pricing
            </Typography>
          </Reveal>
          <Reveal delay={0.15}>
            <Typography
              sx={{
                textAlign: "center",
                color: "text.accent",
                fontSize: { xs: 14, md: 16 },
                mb: { xs: 7, md: 10 },
              }}
            >
              No hidden fees. No surprise markups. Just simple, honest pricing.
            </Typography>
          </Reveal>
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
            {plans.map((plan, i) => (
              <Grid item xs={12} md={4} key={plan.name}>
                {/* ✅ navigate prop pass kiya */}
                <PlanCard
                  {...plan}
                  delay={0.08 + i * 0.1}
                  navigate={navigate}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TRUST STRIP */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          px: { xs: 2, md: 0 },
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="md">
          <Reveal delay={0.05}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: 11, md: 12 },
                color: "text.accent",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                mb: 4,
              }}
            >
              Trusted & Regulated
            </Typography>
          </Reveal>
          <Grid container spacing={2} justifyContent="center">
            {[
              "🏛️  FCA Authorised",
              "🔒  ISO 27001",
              "💳  PCI DSS Level 1",
              "✅  AML Compliant",
              "🌐  SWIFT Partner",
            ].map((badge, i) => (
              <Grid item key={badge}>
                <Reveal delay={0.05 + i * 0.07} direction="scale">
                  <Box
                    sx={{
                      px: { xs: 2, md: 3 },
                      py: { xs: 1, md: 1.2 },
                      borderRadius: "100px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      bgcolor: "Background.secondary",
                      fontSize: { xs: 11, md: 12 },
                      color: "text.accent",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {badge}
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "Background.main",
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
                variant="main_header"
                sx={{ fontWeight: 700, mb: 2, color: "text.tertairy" }}
              >
                Business accounts
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.tertairy",
                  opacity: 0.9,
                  mb: 3,
                  maxWidth: 480,
                  textAlign: "justify",
                }}
              >
                With CoBanq business accounts, you can seamlessly hold,
                exchange, and manage funds across currencies, making
                international payments, foreign exchange, and cash flow easier
                than ever.
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
                src="https://burqfx.com/public_assets/business_assets/images_v2/header5.png"
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

      {/* ── CTA ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 } }}>
        <Container maxWidth="md">
          <Reveal delay={0.1} direction="scale">
            <Box
              sx={{
                borderRadius: "28px",
                p: { xs: 5, md: 9 },
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                bgcolor: "Background.secondary",
                border: "1px solid rgba(30,120,255,0.18)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-60%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  height: "200%",
                  background:
                    "radial-gradient(ellipse,rgba(30,120,255,0.09) 0%,transparent 60%)",
                  pointerEvents: "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 22, md: 40 },
                  letterSpacing: "-0.5px",
                  mb: 2,
                  lineHeight: 1.15,
                  color: "text.tertairy",
                }}
              >
                Ready to Take Your Business{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Global?
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "text.accent",
                  fontSize: { xs: 14, md: 16 },
                  mb: 5,
                  maxWidth: 500,
                  mx: "auto",
                  lineHeight: 1.7,
                }}
              >
                Join thousands of businesses that trust CoBanq to power their
                international payments infrastructure every single day.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    // onClick={() => navigate("/contact")}
                    onClick={() => navigate(ROUTES.CONTACT)}
                    variant="contained"
                    sx={{
                      px: { xs: 5, md: 7 },
                      py: { xs: 1.6, md: 2 },
                      fontSize: { xs: 14, md: 15 },
                      fontWeight: 700,
                      borderRadius: "100px",
                      textTransform: "none",
                      background:
                        "linear-gradient(135deg,#1E78FF 0%,#00DEB4 100%)",
                      boxShadow: "0 12px 40px rgba(30,120,255,0.38)",
                      "&:hover": {
                        boxShadow: "0 18px 52px rgba(30,120,255,0.55)",
                      },
                    }}
                  >
                    Start for Free →
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    // onClick={() => navigate("/contact")}
                    onClick={() => navigate(ROUTES.CONTACT)}
                    variant="outlined"
                    sx={{
                      px: { xs: 5, md: 6 },
                      py: { xs: 1.6, md: 2 },
                      fontSize: { xs: 14, md: 15 },
                      fontWeight: 600,
                      borderRadius: "100px",
                      textTransform: "none",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "text.tertairy",
                      "&:hover": {
                        border: "1px solid rgba(255,255,255,0.35)",
                        bgcolor: "Background.secondary",
                      },
                    }}
                  >
                    Talk to Sales
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};

export default Personal;
