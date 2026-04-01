import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Individual App Card ───────────────────────────────────────────────────────
function AppCard({
  bg,
  currency,
  amount,
  label,
  txIcon,
  txLabel,
  txTime,
  txAmount,
  isPositive,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: 240,
        height: 360,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
        flexShrink: 0,
        userSelect: "none",
        bgcolor: "Background.main",
      }}
    >
      {/* Background image */}
      <Box
        component="img"
        src={bg}
        alt=""
        loading="lazy"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark gradient overlay — bottom half */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Balance info — centered */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          color: "#fff",
          width: "100%",
          px: 2,
        }}
      >
        <Typography
          sx={{ fontSize: 13, opacity: 0.85, mb: 0.5, fontWeight: 400 }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: 38,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-1px",
          }}
        >
          {currency}
          {amount}
        </Typography>

        {/* Accounts pill */}
        <Box
          sx={{
            display: "inline-block",
            mt: 1.5,
            px: 2.5,
            py: 0.6,
            borderRadius: "50px",
            background: "rgba(255,255,255,0.92)",
            color: "#111",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Accounts
        </Box>
      </Box>

      {/* Transaction strip — bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* Icon circle */}
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6c63ff, #3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {txIcon}
        </Box>

        {/* Label + time */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "#111",
              lineHeight: 1.2,
            }}
          >
            {txLabel}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#888" }}>{txTime}</Typography>
        </Box>

        {/* Amount */}
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: isPositive ? "#16a34a" : "#dc2626",
            flexShrink: 0,
          }}
        >
          {isPositive ? "+" : ""}
          {txAmount}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Card data (CoBanq-relevant: salary, send money, multi-currency)
const CARDS = [
  {
    bg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=480&q=80",
    currency: "€",
    amount: "4,820",
    label: "Personal · EUR",
    txIcon: "💳",
    txLabel: "Transfer to family",
    txTime: "Yesterday, 14:30",
    txAmount: "€250",
    isPositive: false,
  },
  {
    bg: "https://burqfx.com/public_assets/business_assets/images_v2/hero.png",
    currency: "£",
    amount: "8,450",
    label: "Salary · GBP",
    txIcon: "💰",
    txLabel: "Salary credited",
    txTime: "Today, 09:15",
    txAmount: "£3,200",
    isPositive: true,
  },
  {
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&q=80",
    currency: "£",
    amount: "2,180",
    label: "Savings · GBP",
    txIcon: "🏠",
    txLabel: "Rent & utilities",
    txTime: "Due today",
    txAmount: "£890",
    isPositive: false,
  },
];

// ─── Main Hero Section
export default function HeroCard({ bgcolor }) {
  // Scroll container ref — animation triggers WITHIN this section
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring for buttery scroll feel
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // ── Left card: hidden behind center → slides left + rotates
  const leftX = useTransform(smooth, [0, 0.5], [0, -270]);
  const leftRotate = useTransform(smooth, [0, 0.5], [0, -6]);
  const leftScale = useTransform(smooth, [0, 0.5], [0.88, 1]);
  const leftOpacity = useTransform(smooth, [0, 0.15], [0, 1]);

  // ── Center card: entrance from right, stays center
  const centerX = useTransform(smooth, [0, 0.5], [0, 0]);
  const centerScale = useTransform(smooth, [0, 0.5], [1, 1.05]);

  // ── Right card: hidden behind center → slides right + rotates
  const rightX = useTransform(smooth, [0, 0.5], [0, 270]);
  const rightRotate = useTransform(smooth, [0, 0.5], [0, 6]);
  const rightScale = useTransform(smooth, [0, 0.5], [0.88, 1]);
  const rightOpacity = useTransform(smooth, [0, 0.15], [0, 1]);

  // ── Text below fades in as cards spread
  const textOpacity = useTransform(smooth, [0.1, 0.45], [0, 1]);
  const textY = useTransform(smooth, [0.1, 0.45], [30, 0]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        height: "215vh",
        // background: "Background.main",
        bgcolor: "Background.main",
        borderBottom: "1px solid white",
        marginBottom: "10px",
        // marginBottom:{{xs: 0, sm: 0, md: 0, lg: 0, xl: 10}}
      }}
    >
      {/* Sticky viewport — stays in view while user scrolls */}
      <Box
        sx={{
          position: "sticky",
          // top: 40,
          top: { xs: 100, md: 50, lg: 80 },
          bottom: 80,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          // p:"10px"
        }}
      >
        {/* ── CARDS STAGE ── */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 500,
            // padding: "",
            margin: {
              xs: "25em 0em 15em 0em",
              lg: "0em 0em 0em 0em",
            }
            // border:'1px solid red'
          }}
        >
          {/* LEFT card */}
          <motion.div
            style={{
              position: "absolute",
              x: leftX,
              rotate: leftRotate,
              scale: leftScale,
              opacity: leftOpacity,
              zIndex: 1,
              marginTop: "40px",
              transformOrigin: "bottom center",
            }}
          >
            <AppCard {...CARDS[0]} />
          </motion.div>

          {/* CENTER card — entrance animation from right, then stays */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              x: centerX,
              scale: centerScale,
              zIndex: 3,
              marginTop: "50px",
            }}
          >
            <AppCard {...CARDS[1]} />
          </motion.div>

          {/* RIGHT card */}
          <motion.div
            style={{
              position: "absolute",
              x: rightX,
              rotate: rightRotate,
              scale: rightScale,
              opacity: rightOpacity,
              zIndex: 1,
              marginTop: "40px",
              transformOrigin: "bottom center",
            }}
          >
            <AppCard {...CARDS[2]} />
          </motion.div>
        </Box>

        {/* ── SCROLL-REVEALED TEXT ── */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            textAlign: "center",
            marginTop: 48,
            marginBottom: 20,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 28, md: 40 },
              fontWeight: 700,
              color: "text.tertairy",
              letterSpacing: "-1px",
              mb: 1.5,
            }}
          >
            Send in a tap.{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                // background: "linear-gradient(90deg, #000616, #053684)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              There in minutes.
            </Box>{" "}
            Built to protect.
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              color: "#666",
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            One account, no paperwork. Most transfers land same-day with full
            transparency — and the peace of mind that comes from a regulated,
            bank-grade partner.
          </Typography>

          {/* Trust / feature pills */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            {["46+ currencies", "Low fees", "Same-day delivery"].map((pill) => (
              <Box
                key={pill}
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: "50px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#555",
                }}
              >
                {pill}
              </Box>
            ))}
          </Box>

          {/* CTA Button */}
          <Box
            component={motion.button}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            sx={{
              background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
              // background: "linear-gradient(90deg, #000616, #053684)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              px: 4,
              py: 1.6,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.3px",
            }}
          >
            Move your salary →
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
