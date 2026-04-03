import { useState } from "react";
import { Box, Typography, Stack, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ScaleIcon from "@mui/icons-material/Scale";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqData = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: <AirplanemodeActiveIcon />,
    // icon: "🚀",
    items: [
      {
        q: "What is CoBanq?",
        a: "CoBanq is a modern financial platform that makes international money transfers and payments seamless, secure, and affordable.",
      },
      {
        q: "How do I create an account?",
        a: "Simply click the 'Register' button, fill in your details, verify your identity, and you can start making transfers in minutes.",
      },
      {
        q: "What documents do I need to verify my identity?",
        a: "You'll need a valid government-issued ID (passport, driver's license, or national ID card) and proof of address (utility bill or bank statement less than 3 months old).",
      },
    ],
  },
  {
    id: "sending-money",
    label: "Sending Money",
    icon: <CurrencyExchangeIcon />,

    // icon: "💸",
    items: [
      {
        q: "Which countries can I send money to?",
        a: "We support transfers to multiple countries including India, Nigeria, Philippines, Pakistan, Bangladesh, and many more.",
      },
      {
        q: "How long do transfers take?",
        a: "Most transfers are processed within 24 hours, with real-time tracking available through your account dashboard.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept bank transfers, debit cards, and credit cards. Payment methods may vary by country.",
      },
    ],
  },
  {
    id: "security",
    label: "Account & Security",
    icon: <LockOutlineIcon />,
    items: [
      {
        q: "How do you protect my account?",
        a: "We use bank-level encryption, two-factor authentication, and regular security audits to keep your account safe.",
      },
      {
        q: "What should I do if I forget my password?",
        a: "Click the 'Forgot Password' link on the login page. We'll send you instructions to reset your password securely.",
      },
      {
        q: "How can I enable two-factor authentication?",
        a: "Go to Account Settings > Security and follow the steps to enable 2FA using your preferred authentication method.",
      },
    ],
  },
  {
    id: "fees",
    label: "Fees & Pricing",
    icon: <MonetizationOnIcon />,
    // icon: "💰",
    items: [
      {
        q: "What are the fees?",
        a: "Our fees vary by destination and amount. We always display the exact fee and exchange rate before you confirm your transfer.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No, we believe in complete transparency. All fees and exchange rates are shown upfront before you make a transfer.",
      },
      {
        q: "Do you offer better rates for larger transfers?",
        a: "Yes, we offer preferential rates for larger transfers. Contact our business team for more information.",
      },
    ],
  },
  {
    id: "legal",
    label: "Legal & Compliance",
    icon: <ScaleIcon />,
    // icon: "⚖️",
    items: [
      {
        q: "Is CoBanq regulated?",
        a: "Yes, we are fully regulated and licensed to operate in all the countries we serve. Our operations comply with all relevant financial regulations.",
      },
      {
        q: "How do you handle my data?",
        a: "We follow strict data protection regulations and never share your information with unauthorized parties. Read our Privacy Policy for details.",
      },
      {
        q: "What are your AML policies?",
        a: "We have robust Anti-Money Laundering (AML) policies and conduct thorough verification checks to prevent financial crime.",
      },
    ],
  },
];

// ─── Single Accordion Item ────────────────────────────────────────────────────
function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={(theme) => ({
        bgcolor: "Background.main",
        borderRadius: 2,
        mb: 1,
        overflow: "hidden",
        border: "1px solid",
        borderColor: open
          ? "primary.main"
          : theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.08)",
        boxShadow: open
          ? "0 4px 20px rgba(5,54,132,0.10)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      })}
    >
      {/* Question row */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          px: 2.5,
          py: 2,
          cursor: "pointer",
          userSelect: "none",
          gap: 2,
        }}
      >
        <Typography
          sx={(theme) => ({
            ...theme.typography.main_text,
            fontSize: { xs: "14px", sm: "15px" },
            fontWeight: 600,
            color: "text.tertairy",
            flex: 1,
          })}
        >
          {q}
        </Typography>

        <IconButton
          size="small"
          disableRipple
          sx={(theme) => ({
            flexShrink: 0,
            bgcolor: open
              ? "primary.main"
              : theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(5,54,132,0.06)",
            color: open ? "#fff" : "primary.main",
            width: 30,
            height: 30,
            transition: "background 0.2s, transform 0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            "&:hover": {
              bgcolor: open ? "primary.main" : "rgba(5,54,132,0.12)",
            },
          })}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>

      {/* Answer */}
      <Collapse in={open} timeout={220}>
        <Box
          sx={(theme) => ({
            px: 2.5,
            pb: 2.5,
            borderTop: "1px solid",
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.06)",
            pt: 2,
          })}
        >
          <Typography
            sx={(theme) => ({
              ...theme.typography.main_text,
              fontSize: { xs: "13px", sm: "14.5px" },
              color: "text.secondary",
            })}
          >
            {a}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}

// ─── Main FAQ Page ────────────────────────────────────────────────────────────
export default function Faq() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "Background.secondary",
        minHeight: "100vh",
      }}
    >
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <Box
        sx={(theme) => ({
          background: theme.palette.gradient,
          pt: { xs: 8, md: 12 },
          pb: 0,
          px: 2,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        })}
      >
        {/* Glow overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 120%, rgba(59,130,246,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Typography
          component="h1"
          sx={(theme) => ({
            ...theme.typography.main_header,
            color: "text.main",
            fontWeight: 700,
            lineHeight: 1.15,
            mb: 2,
            position: "relative",
          })}
        >
          Frequently Asked{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #1E78FF 0%, #00DEB4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Questions
          </Box>
        </Typography>

        {/* ── Subtitle → theme.typography.main_text ── */}
        <Typography
          sx={(theme) => ({
            ...theme.typography.main_text,
            color: "rgba(255,255,255,0.60)",
            maxWidth: "500px",
            mx: "auto",
            mb: 5,
            position: "relative",
          })}
        >
          Everything you need to know about CoBanq. Can&apos;t find an answer?{" "}
          <Box
            component="a"
            // href="/contact"
            onClick={() => navigate(ROUTES.CONTACT)}
            sx={{ color: "#7eb8f7", cursor: "pointer", fontWeight: 600 }}
          >
            Get in touch.
          </Box>
        </Typography>

        {/* ── Jump Nav Pills ── */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={1.25}
          sx={{ position: "relative", pb: 6 }}
        >
          {faqData.map((sec) => (
            <Box
              key={sec.id}
              component="button"
              onClick={() => {
                const el = document.getElementById(sec.id);
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              sx={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.85)",
                px: "18px",
                py: "9px",
                borderRadius: "30px",
                fontSize: "13.5px",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                outline: "none",
                fontFamily: "inherit",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s",
                "&:hover": {
                  background: "rgba(59,130,246,0.25)",
                  borderColor: "rgba(59,130,246,0.5)",
                  color: "#fff",
                },
              }}
            >
              {sec.icon} {sec.label}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ══ FAQ SECTIONS */}
      <Box
        sx={{
          maxWidth: "780px",
          mx: "auto",
          // px: { xs: 2, md: 3 },
          pt: 6,
        }}
      >
        {faqData.map((section) => (
          <Box key={section.id} id={section.id} sx={{ mb: 7 }}>
            {/* Section header */}
            <Stack
              direction="row"
              alignItems="center"
              gap={1.5}
              sx={(theme) => ({
                mb: 3,
                pb: 2,
                borderBottom: "2px solid",
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.08)",
              })}
            >
              {/* Icon badge — gradient bg */}
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  background: theme.palette.text.secondary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                })}
              >
                {section.icon}
              </Box>

              {/* Section title → main_header font */}
              <Typography
                component="h2"
                sx={(theme) => ({
                  fontFamily: theme.typography.main_header?.fontFamily,
                  fontWeight: 700,
                  fontSize: { xs: "18px", md: "22px" },
                  color: "text.tertairy",
                  letterSpacing: "-0.01em",
                  m: 0,
                })}
              >
                {section.label}
              </Typography>
            </Stack>

            {/* Accordion items */}
            {section.items.map((item, idx) => (
              <AccordionItem key={idx} q={item.q} a={item.a} />
            ))}
          </Box>
        ))}
      </Box>

      {/* ── Contact Strip ── */}
      <Box
        sx={(theme) => ({
          background: theme.palette.gradient,
          // borderRadius: 4,
          py: { xs: 5, md: 6 },
          px: { xs: 3, md: 5 },
          textAlign: "center",
          mt: 2,
          position: "relative",
          overflow: "hidden",
        })}
      >
        {/* Glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 120%, rgba(0,222,180,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Title → main_header */}
        <Typography
          sx={(theme) => ({
            fontFamily: theme.typography.main_header?.fontFamily,
            fontWeight: 700,
            fontSize: { xs: "20px", md: "24px" },
            color: "text.main",
            mb: 1,
            position: "relative",
          })}
        >
          Still have questions?
        </Typography>

        {/* Sub → main_text */}
        <Typography
          sx={(theme) => ({
            ...theme.typography.main_text,
            fontSize: { xs: "13px", sm: "14px" },
            color: "rgba(255,255,255,0.60)",
            mb: 4,
            position: "relative",
          })}
        >
          Our support team is available 24/7 to help you with anything.
        </Typography>

        {/* CTA button */}
        <Box
          component="a"
          //   href="/contact"
          onClick={() => navigate(ROUTES.CONTACT)}
          sx={(theme) => ({
            display: "inline-block",
            bgcolor: "primary.main",
            color: "text.main",
            px: 4,
            py: 1.5,
            borderRadius: `${theme.shape.borderRadius}px`,
            textDecoration: "none",
            position: "relative",
            transition: "opacity 0.2s, transform 0.2s",
            "&:hover": {
              opacity: 0.88,
              transform: "translateY(-1px)",
            },
          })}
        >
          Contact Support
        </Box>
      </Box>
    </Box>
  );
}
