import { Box, Typography, Container } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import { use_reveal } from "../hooks/use_scroll_animation";
import FolderIcon from "@mui/icons-material/Folder";
import BoltIcon from "@mui/icons-material/Bolt";
import SyncLockIcon from "@mui/icons-material/SyncLock";
/* ─── Card Configs ─── */
const CARDS = {
  debit: {
    label: "Debit Card",
    icon: <FolderIcon />,
    number: "5412 •••• •••• 4242",
    holder: "ALEX JOHNSON",
    expiry: "08 / 29",
    network: "mastercard",
    bg: `
      radial-gradient(ellipse at 10% 80%, rgba(139,0,0,0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 90% 20%, rgba(200,100,0,0.25) 0%, transparent 50%),
      linear-gradient(135deg, #0a0a1a 0%, #111827 40%, #1a1025 70%, #0d0d1f 100%)
    `,

    badge: "PLATINUM",
    badgeColor: "linear-gradient(90deg,#c0a060,#e8d5a0)",
  },
  smart: {
    label: "Smart Card",
    icon: <BoltIcon />,
    number: "4716 •••• •••• 8831",
    holder: "ALEX JOHNSON",
    expiry: "11 / 30",
    network: "visa",
    bg: `
      radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(20,184,166,0.3) 0%, transparent 50%),
      linear-gradient(135deg, #030712 0%, #0f172a 50%, #0d1117 100%)
    `,

    badge: "SMART",
    badgeColor: "linear-gradient(90deg,#6366f1,#14b8a6)",
  },
  virtual: {
    label: "Virtual Card",
    icon: <SyncLockIcon />,
    number: "3782 •••• •••• 0005",
    holder: "ALEX JOHNSON",
    expiry: "03 / 27",
    network: "amex",
    bg: `
      radial-gradient(ellipse at 30% 70%, rgba(234,179,8,0.28) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 10%, rgba(251,191,36,0.18) 0%, transparent 50%),
      linear-gradient(135deg, #0c0a00 0%, #1a1500 45%, #0f0c00 100%)
    `,

    badge: "VIRTUAL",
    badgeColor: "linear-gradient(90deg,#d97706,#fbbf24)",
  },
};

/* ─── Network Logos ─── */
function MastercardLogo() {
  return (
    <Box sx={{ position: "relative", width: 60, height: 36 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%,#ff5f00,#eb001b)",
          position: "absolute",
          left: 0,
          boxShadow: "0 2px 10px rgba(235,0,27,0.5)",
        }}
      />
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "radial-gradient(circle at 60% 40%,#ffcb36,#f79e1b)",
          position: "absolute",
          left: 22,
          opacity: 0.92,
          boxShadow: "0 2px 10px rgba(247,158,27,0.4)",
        }}
      />
    </Box>
  );
}

function VisaLogo() {
  return (
    <Typography
      sx={{
        fontFamily: '"Times New Roman",serif',
        fontWeight: 900,
        fontSize: "1.45rem",
        color: "#fff",
        letterSpacing: "-0.03em",
        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
      }}
    >
      VISA
    </Typography>
  );
}

function AmexLogo() {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.4,
        border: "1.5px solid rgba(255,255,255,0.55)",
        borderRadius: "4px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "monospace",
          fontWeight: 800,
          fontSize: "0.72rem",
          color: "#fff",
          letterSpacing: "0.1em",
        }}
      >
        AMEX
      </Typography>
    </Box>
  );
}

function NetworkLogo({ network }) {
  if (network === "mastercard") return <MastercardLogo />;
  if (network === "visa") return <VisaLogo />;
  return <AmexLogo />;
}

/* ─── Chip ─── */
function Chip() {
  return (
    <Box
      sx={{
        width: 44,
        height: 32,
        borderRadius: "5px",
        background: "linear-gradient(145deg,#d4a843,#f5c842,#c8921a,#e8b832)",
        position: "relative",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.4),inset 0 1px 2px rgba(255,255,255,0.3)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {[5, 13, 21].map((top) => (
        <Box
          key={top}
          sx={{
            position: "absolute",
            left: 5,
            right: 5,
            top,
            height: "1px",
            background: "rgba(0,0,0,0.2)",
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          top: 5,
          bottom: 5,
          left: "50%",
          width: "1px",
          background: "rgba(0,0,0,0.2)",
          transform: "translateX(-50%)",
        }}
      />
    </Box>
  );
}

/* ─── Card Face ─── */
function CardFace({ config }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        background: config.bg,
        p: "22px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow:
          "0 32px 64px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.08),inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
          borderRadius: "20px",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.05) 50%,transparent 70%)",
          pointerEvents: "none",
          borderRadius: "20px",
        }}
      />

      {/* Row 1 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontFamily: '"Playfair Display",serif',
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            COBANQ
          </Typography>
          <Box
            sx={{
              display: "inline-block",
              mt: "4px",
              px: "6px",
              py: "1px",
              borderRadius: "3px",
              background: config.badgeColor,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.5rem",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "rgba(0,0,0,0.75)",
                letterSpacing: "0.15em",
              }}
            >
              {config.badge}
            </Typography>
          </Box>
        </Box>
        <NetworkLogo network={config.network} />
      </Box>

      {/* Row 2 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Chip />
        <Box sx={{ position: "relative", width: 22, height: 22 }}>
          {[10, 16, 22].map((s, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: s,
                height: s,
                border: "1.5px solid rgba(255,255,255,0.4)",
                borderRadius: "50%",
                borderLeft: "none",
                borderBottom: "none",
                transform: "rotate(45deg)",
                top: `${(22 - s) / 2}px`,
                left: `${(22 - s) / 2}px`,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Row 3 */}
      <Box>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.88)",
            fontFamily: '"Courier Prime","Courier New",monospace',
            fontSize: { xs: "0.9rem", sm: "1.05rem" },
            letterSpacing: "0.2em",
            mb: "8px",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          {config.number}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.48rem",
                letterSpacing: "0.15em",
                mb: "2px",
              }}
            >
              CARD HOLDER
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: '"Courier Prime",monospace',
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              {config.holder}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.48rem",
                letterSpacing: "0.15em",
                mb: "2px",
              }}
            >
              EXPIRES
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: '"Courier Prime",monospace',
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              {config.expiry}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ─── Main Export ─── */
export default function CardsSection() {
  const heading = use_reveal({ y: 50, duration: 0.8 });
  const [active, setActive] = useState("debit");
  const config = CARDS[active];
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [14, -14]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), {
    stiffness: 200,
    damping: 25,
  });
  const glareX = useTransform(mouseX, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-1, 1], ["0%", "100%"]);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <Box
      sx={{
        py: { xs: 12, md: 16 },
        bgcolor: "Background.main",
        borderBottom: "1px solid var(--color-surface-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <motion.div
          ref={heading.ref}
          initial={heading.initial}
          animate={heading.animate}
        >
          <Typography
            component="h2"
            sx={{
              textAlign: "center",
              mb: 1.5,
              color: "text.tertairy",
              fontFamily: '"Outfit", "DM Sans", sans-serif',
              fontSize: { xs: "2.2rem", md: "3rem" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Smart payments made{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                // background: "linear-gradient(90deg, #000616, #053684)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              simple
            </Box>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.tertairy",
              maxWidth: 440,
              mx: "auto",
              mb: 5,
              fontSize: "1rem",
              lineHeight: 1.8,
              fontFamily: '"DM Sans", "Outfit", sans-serif',
            }}
          >
            Choose the card that fits your lifestyle. Switch anytime.
          </Typography>
        </motion.div>

        {/* Tab Switcher */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            mb: 8,
            flexWrap: "wrap",
          }}
        >
          {Object.entries(CARDS).map(([key, c]) => (
            <motion.button
              key={key}
              onClick={() => setActive(key)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background:
                  active === key ? "rgba(255,255,255,0.1)" : "transparent",
                border:
                  active === key
                    ? "1px solid rgba(255,255,255,0.22)"
                    : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "100px",
                padding: "10px 22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                outline: "none",
                backdropFilter: "blur(10px)",
                transition: "background 0.25s, border-color 0.25s",
                position: "relative",
              }}
            >
              {active === key && (
                <motion.div
                  layoutId="tab-indicator"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span style={{ fontSize: "1rem" }}>{c.icon}</span>
              <Typography
                sx={{
                  fontFamily: '"DM Sans",sans-serif',
                  fontSize: "0.85rem",
                  fontWeight: active === key ? 600 : 400,
                  color: "text.tertairy",
                  letterSpacing: "0.02em",
                  position: "relative",
                }}
              >
                {c.label}
              </Typography>
            </motion.button>
          ))}
        </Box>

        {/* Card + Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 6, md: 8 },
            justifyContent: "center",
          }}
        >
          {/* 3D Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: 420,
              perspective: "1200px",
              flexShrink: 0,
            }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                aspectRatio: "1.586 / 1",
                borderRadius: "20px",
                cursor: "pointer",
                position: "relative",
              }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, rotateY: -20, scale: 0.94 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 20, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <CardFace config={config} />
                </motion.div>
              </AnimatePresence>

              {/* Glare */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "20px",
                  background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.09) 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
