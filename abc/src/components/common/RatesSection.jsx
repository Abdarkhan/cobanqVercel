import { useRef, useState } from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// ─── Reveal wrapper
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const hidden = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
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

// ─── Data
const rates = [
  {
    currency: "USD",
    flag: "🇺🇸",
    name: "US Dollar",
    buy: "278.50",
    sell: "281.20",
    change: "+0.34%",
  },
  {
    currency: "EUR",
    flag: "🇪🇺",
    name: "Euro",
    buy: "300.10",
    sell: "304.50",
    change: "+0.12%",
  },
  {
    currency: "GBP",
    flag: "🇬🇧",
    name: "British Pound",
    buy: "350.00",
    sell: "355.20",
    change: "-0.08%",
  },
  {
    currency: "AED",
    flag: "🇦🇪",
    name: "UAE Dirham",
    buy: "75.20",
    sell: "76.40",
    change: "+0.05%",
  },
  {
    currency: "SAR",
    flag: "🇸🇦",
    name: "Saudi Riyal",
    buy: "74.10",
    sell: "75.30",
    change: "+0.19%",
  },
  {
    currency: "CAD",
    flag: "🇨🇦",
    name: "Canadian Dollar",
    buy: "204.30",
    sell: "207.10",
    change: "-0.22%",
  },
];

// ─── Single rate row
function RateRow({ rate, index }) {
  const [hovered, setHovered] = useState(false);
  const isUp = rate.change.startsWith("+");

  return (
    <Reveal delay={0.08 + index * 0.07}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2.5,
            borderRadius: 2,
            mb: 1.5,
            cursor: "pointer",
            transition: "all 0.25s ease",
            color: "text.tertairy",
            bgcolor: "Background.secondary",
            border: "1px solid var(--color-surface-border)",
            "&:hover": {
              borderColor: "rgba(30,120,255,0.25)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            },
          }}
        >
          {/* Currency name + flag */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            >
              {rate.flag}
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}
              >
                {rate.currency}
              </Typography>
              <Typography
                sx={{ fontSize: 11, letterSpacing: 0.5, opacity: 0.75 }}
              >
                {rate.name}
              </Typography>
            </Box>
          </Box>

          {/* Buy */}
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                mb: 0.3,
                opacity: 0.75,
              }}
            >
              Buy
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              {rate.buy}
            </Typography>
          </Box>

          {/* Sell */}
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                mb: 0.3,
                opacity: 0.75,
              }}
            >
              Sell
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              {rate.sell}
            </Typography>
          </Box>

          {/* Change badge */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <motion.div
              animate={hovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1.5,
                  py: 0.6,
                  borderRadius: "20px",
                  fontSize: 12,
                  fontWeight: 700,
                  background: isUp
                    ? "rgba(74,222,128,0.12)"
                    : "rgba(248,113,113,0.12)",
                  color: isUp ? "#16a34a" : "#dc2626",
                  border: `1px solid ${isUp ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
                }}
              >
                {isUp ? "▲" : "▼"} {rate.change}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Reveal>
  );
}

// ─── Main Component
export default function RatesSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "Background.main",
        borderBottom: "1px solid white",
      }}
    >
      {/* Decorative blurred glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(30,120,255,0.15) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="md">
        {/* ── Header ── */}
        <Reveal delay={0}>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            {/* Live indicator pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "inline-block", marginBottom: 16 }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.7,
                  borderRadius: "50px",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  bgcolor: "rgba(0,212,170,0.12)",
                  border: "1px solid rgba(0,212,170,0.25)",
                  color: "text.tertairy",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    color: "text.tertairy",
                  }}
                />
                Live Rates
              </Box>
            </motion.div>

            <Typography
              sx={{
                fontSize: { xs: 32, md: 48 },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
                color: "text.tertairy",
              }}
            >
              Today's{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                  // background: "linear-gradient(90deg, #000616, #053684)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Exchange Rates
              </Box>
            </Typography>

            <Typography sx={{ mt: 1.5, fontSize: 15, color: "text.tertairy" }}>
              Updated every 60 seconds · PKR base currency
            </Typography>
          </Box>
        </Reveal>

        {/* ── Table header row ── */}
        <Reveal delay={0.1}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              px: { xs: 2, md: 4 },
              pb: 1.5,
              mb: 1,
              borderBottom: "1px solid var(--color-surface-border)",
            }}
          >
            {["Currency", "Buy (PKR)", "Sell (PKR)", "24h Change"].map((h) => (
              <Typography
                key={h}
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "text.tertairy",
                }}
              >
                {h}
              </Typography>
            ))}
          </Box>
        </Reveal>

        {/* ── Rows ── */}
        {rates.map((rate, i) => (
          <RateRow key={rate.currency} rate={rate} index={i} />
        ))}

        {/* ── Footer note ── */}
        <Reveal delay={0.5}>
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid var(--color-surface-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, color: "text.tertairy" }}>
              * Rates are indicative and subject to change without notice.
            </Typography>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.tertairy",
                }}
                onClick={() => {
                  navigate(ROUTES.EXCHANGE_RATE);
                  window.scrollTo(0, 0);
                }}
              >
                View all currencies
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Typography>
            </motion.div>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
