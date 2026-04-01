import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GlobalAlert from "@/components/modal/GlobalAlert";

// ── Reusable fade-up wrapper
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

function PhonePill({ label, number }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          py: 2,
          cursor: "pointer",
          "&:hover .arrow": { opacity: 1, x: 0 },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(212,168,67,0.12)",
            border: "1px solid rgba(212,168,67,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          📞
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: "text.accent",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              mb: 0.3,
            }}
          >
            {label}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.tertairy", fontWeight: 600 }}>
            {number}
          </Typography>
        </Box>
        <motion.span
          className="arrow"
          initial={{ opacity: 0, x: -6 }}
          style={{ color: "text.accent", fontSize: 18 }}
        >
          →
        </motion.span>
      </Box>
    </motion.div>
  );
}
export default function ContactLayers() {
  const [alert, setAlert] = useState({ open: false });

  const showAlert = (config) => setAlert({ open: true, ...config });
  const closeAlert = () => setAlert({ open: false });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ bgcolor: "Background.main", color: "text.tertairy" }}>
      <Box
        sx={{
          position: "relative",
          py: { xs: 10, md: 14 },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left */}
            <Grid item xs={12} md={6}>
              <Reveal delay={0}>
                <Typography
                  sx={{
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 1,
                      background: "text.accent",
                      display: "inline-block",
                    }}
                  />
                  Support
                </Typography>
              </Reveal>

              <Reveal delay={0.1}>
                <Typography
                  sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: { xs: 52, md: 72 },
                    lineHeight: 0.95,
                    letterSpacing: 1,
                    mb: 3,
                    color: "text.tertairy",
                  }}
                >
                  Chat with{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                      // background: "linear-gradient(90deg, #000616, #053684)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    us
                  </Box>
                </Typography>
              </Reveal>

              <Reveal delay={0.2}>
                <Typography
                  sx={{
                    color: "text.accent",
                    lineHeight: 1.8,
                    mb: 4,
                    maxWidth: 420,
                    fontSize: 15,
                  }}
                >
                  The quickest way to get in touch. Connect with our team in
                  seconds. We support you in more than 100 languages.
                </Typography>
              </Reveal>

              <Reveal delay={0.3}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      background: "#053685",
                      borderRadius: '10px',
                      // background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    }}
                    onClick={() =>
                      showAlert({
                        type: "warning",
                        icon: "⚠️",
                        title: "Chat Support is Not Available Yet",
                        desc: "Please try again later.",
                        confirmText: "Okay",
                      })
                    }
                  >
                    💬 Start Chat Now
                  </Button>
                </motion.div>
              </Reveal>
            </Grid>

            {/* Right — image with floating card */}
            <Grid item xs={12} md={6}>
              <Reveal delay={0.2} direction="left">
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                      // border: "1px solid rgba(48, 131, 114, 0.1)",
                      bgcolor: "Background.secondary",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://help.xe.com/hc/theming_assets/01JC0D55ZK2HJA5NSY299V3M42"
                      alt="Chat support"
                      sx={{
                        width: "100%",
                        height: 340,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>

                  {/* Floating status badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ position: "absolute", bottom: -20, left: 30 }}
                  >
                    <Box
                      sx={{
                        background: "#0c1620",
                        border: "1px solid rgba(0,212,170,0.2)",
                        borderRadius: "12px",
                        px: 2.5,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "text.accent",
                          animation: "pulse 2s infinite",
                        }}
                      />
                      <Typography
                        sx={{ fontSize: 13, fontWeight: 600, color: "#e8f4f0" }}
                      >
                        Avg. response: 2 min
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: "Background.main",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Image side */}
            <Grid item xs={12} md={6}>
              <Reveal delay={0} direction="right">
                <Box
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid rgba(212,168,67,0.12)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
                    alt="Call support"
                    sx={{
                      width: "100%",
                      height: 380,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Reveal>
            </Grid>

            {/* Phone numbers */}
            <Grid item xs={12} md={6}>
              <Reveal delay={0.1}>
                <Typography
                  sx={{
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: "text.accent",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 1,
                      background: "text.accent",
                      display: "inline-block",
                    }}
                  />
                  Phone Support
                </Typography>
              </Reveal>

              <Reveal delay={0.15}>
                <Typography
                  sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: { xs: 52, md: 68 },
                    lineHeight: 0.95,
                    letterSpacing: 1,
                    mb: 4,
                  }}
                >
                  Give us a{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                      // background: "linear-gradient(90deg, #000616, #053684)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    call
                  </Box>
                </Typography>
              </Reveal>

              <Reveal delay={0.2}>
                <Typography
                  sx={{
                    color: "text.accent",
                    mb: 4,
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  Speak directly with our team. Available in English for all
                  account types.
                </Typography>
              </Reveal>

              {[
                { label: "Personal Accounts · UK", number: "+44 20 7946 0958" },
                {
                  label: "Personal Accounts · US",
                  number: "+1 (800) 946-3039",
                },
                {
                  label: "Enterprise Solutions (API)",
                  number: "+1 111-222-3333",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={0.25 + i * 0.08}>
                  <PhonePill {...item} />
                </Reveal>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Email sections start */}
      <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Reveal delay={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
                minHeight: { md: 600 },
              }}
            >

              {/* ── LEFT PANEL — Info ──────────────────────────────────────────── */}
              <Box
                sx={{
                  flex: "0 0 38%",
                  background: "linear-gradient(160deg, #0a1628 0%, #053685 60%, #0a1628 100%)",
                  p: { xs: 4, md: 6 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative circles */}
                <Box sx={{
                  position: "absolute", bottom: -80, right: -80,
                  width: 260, height: 260, borderRadius: "50%",
                  background: "rgba(30,120,255,0.15)",
                  pointerEvents: "none",
                }} />
                <Box sx={{
                  position: "absolute", top: -40, left: -40,
                  width: 160, height: 160, borderRadius: "50%",
                  background: "rgba(0,222,180,0.08)",
                  pointerEvents: "none",
                }} />

                {/* Top content */}
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography sx={{
                    fontSize: 11, letterSpacing: 3,
                    textTransform: "uppercase",
                    color: "rgba(0,222,180,0.8)", mb: 2,
                  }}>
                    Get in Touch
                  </Typography>

                  <Typography sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: { xs: 44, md: 56 },
                    lineHeight: 1,
                    color: "#fff",
                    mb: 1.5,
                  }}>
                    Send a{" "}
                    <Box component="span" sx={{
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                      Message
                    </Box>
                  </Typography>

                  <Typography sx={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 14, lineHeight: 1.8, mt: 2, maxWidth: 280,
                  }}>
                    Fill out the form and our team will get back to you within 24 hours.
                  </Typography>
                </Box>

                {/* Contact details */}
                <Box sx={{ position: "relative", zIndex: 1, mt: 5 }}>
                  {[
                    {
                      icon: <ForwardToInboxIcon />,
                      // icon: "📧", 
                      label: "Email us at", value: "support@cobanq.com"
                    },
                    {
                      icon: <PermPhoneMsgIcon />,
                      // icon: "📞", 
                      label: "Call us", value: "+44 20 7946 0958"
                    },
                    {
                      icon: <LocationOnIcon />,
                      // icon: "📍",
                      label: "Our office", value: "London, United Kingdom"
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                    >
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: 2,
                        mb: 3,
                      }}>
                        <Box sx={{
                          width: 40, height: 40, borderRadius: "10px",
                          background: "#fff5f5",
                          border: "1px solid rgba(255,255,255,0.12)",
                          display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: 18, flexShrink: 0,
                        }}>
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography sx={{
                            fontSize: 10, letterSpacing: 1.5,
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.4)", mb: 0.3,
                          }}>
                            {item.label}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: "#e8f4f0", fontWeight: 600 }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                {/* Social icons row */}
                <Box sx={{ display: "flex", gap: 1.5, mt: 2, position: "relative", zIndex: 1 }}>
                  {[<CameraAltIcon />, <LinkedInIcon />, <TwitterIcon />, <YouTubeIcon />].map((icon, i) => (
                    // {/* {["📸", "💼", "🐦", "▶️"].map((icon, i) => ( */ }
                    < motion.div key={i} whileHover={{ y: -3, scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                      <Box sx={{
                        width: 36, height: 36, borderRadius: "8px",
                        background: "#fff5f5",
                        border: "4px solid rgba(255, 255, 255, 0.12)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 16,
                        cursor: "pointer",
                        transition: "background 0.2s",
                        "&:hover": { background: "white" },
                      }}>
                        {icon}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>

              {/* ── RIGHT PANEL — Form ─────────────────────────────────────────── */}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "Background.secondary",
                  p: { xs: 4, md: 6 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                >
                  {/* Name + Email row */}
                  <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3, mb: 3,
                  }}>
                    <Box>
                      <Typography sx={{
                        fontSize: 11, letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "text.accent", mb: 1,
                      }}>
                        Full Name
                      </Typography>
                      <TextField
                        fullWidth
                        required
                        name="name"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                        sx={{ borderRadius: "12px" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{
                        fontSize: 11, letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "text.accent", mb: 1,
                      }}>
                        Email Address
                      </Typography>
                      <TextField
                        fullWidth
                        required
                        name="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                        sx={{ borderRadius: "12px" }}
                      />
                    </Box>
                  </Box>

                  {/* Subject */}
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{
                      fontSize: 11, letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "text.accent", mb: 1,
                    }}>
                      Subject
                    </Typography>
                    <TextField
                      fullWidth
                      name="subject"
                      placeholder="How can we help?"
                      sx={{ borderRadius: "12px" }}
                    />
                  </Box>

                  {/* Message */}
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{
                      fontSize: 11, letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "text.accent", mb: 1,
                    }}>
                      Message
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      required
                      name="message"
                      placeholder="Tell us how we can help..."
                      value={formState.message}
                      onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                      sx={{ borderRadius: "12px" }}
                    />
                  </Box>

                  {/* Submit */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Box sx={{
                            background: "rgba(0,212,170,0.1)",
                            border: "1px solid rgba(0,212,170,0.3)",
                            borderRadius: "8px",
                            px: 4, py: 1.8,
                            color: "text.accent",
                            fontWeight: 700, fontSize: 14, letterSpacing: 1,
                          }}>
                            ✓ Message Sent!
                          </Box>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="btn"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                              background: "#053685",
                              color: "#fff",
                              py: 1.75,
                              fontSize: "18px",
                              fontWeight: 600,
                              borderRadius: "10px",
                              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                              "&:hover": {
                                scale: 1.03,
                                // background: "rgba(255,255,255,0.95)",
                                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                                // color: "#000616",
                              },
                            }}
                          >
                            Send Message →
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>
              </Box>

            </Box>
          </Reveal>
        </Container>
      </Box>
      {/* Emial sections End */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          borderTop: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Reveal delay={0}>
            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: 48, md: 64 },
                letterSpacing: 1,
                mb: 2,
                color: "text.tertairy",
              }}
            >
              Follow our{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                  // background: "linear-gradient(90deg, #000616, #053684)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Journey
              </Box>
            </Typography>
          </Reveal>

          <Reveal delay={0.1}>
            <Typography sx={{ color: "text.tertairy", mb: 6, fontSize: 15 }}>
              Stay updated with the latest rates, news, and features.
            </Typography>
          </Reveal>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "Instagram",
                icon: <CameraAltIcon />,
                // icon: "📸",
                color: "#e1306c",
                handle: "@cobanq",
              },
              {
                name: "LinkedIn",
                icon: <LinkedInIcon />,
                // icon: "💼",
                color: "#0077b5",
                handle: "@cobanq",
              },
              {
                name: "Twitter",
                icon: <TwitterIcon />,
                // icon: "🐦",
                color: "#1da1f2",
                handle: "@cobanq",
              },
              {
                name: "YouTube",
                icon: <YouTubeIcon />,
                // icon: "▶️",
                color: "#ff0000",
                handle: "@cobanq",
              },
            ].map((s, i) => (
              <Reveal key={s.name} delay={0.1 + i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Box
                    sx={{
                      bgcolor: "Background.secondary",
                      border: `1px solid ${s.color}22`,
                      borderRadius: "16px",
                      px: 4,
                      py: 3,
                      cursor: "pointer",
                      minWidth: 150,
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        borderColor: `${s.color}66`,
                        boxShadow: `0 16px 40px ${s.color}18`,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 28, mb: 1 }}>
                      {s.icon}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 700, color: "text.tertairy", mb: 0.5 }}
                    >
                      {s.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "text.tertairy" }}>
                      {s.handle}
                    </Typography>
                  </Box>
                </motion.div>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>
      <GlobalAlert {...alert} onConfirm={closeAlert} onCancel={closeAlert} />
    </Box >
  );
}