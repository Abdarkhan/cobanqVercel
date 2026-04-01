import { Box, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ScaleIcon from '@mui/icons-material/Scale';
import { ROUTES } from "@/constants/routes";

// ─── Support Cards Data (exact from burqfx.com/support) ──────────────────────
const supportCards = [
    {
        icon: <AirplanemodeActiveIcon />,
        // icon: "🚀",
        title: "Getting Started",
        desc: "Learn how to create an account, verify your identity, and make your first transfer.",
        faqSection: "getting-started",
        gradient: "linear-gradient(135deg, rgba(30,120,255,0.12), rgba(30,120,255,0.04))",
        iconBg: "rgba(30,120,255,0.15)",
        accent: "#1E78FF",
    },
    {
        icon: <CurrencyExchangeIcon />,
        // icon: "💸",
        title: "Sending Money",
        desc: "Everything you need to know about sending money, exchange rates, and transfer times.",
        faqSection: "sending-money",
        gradient: "linear-gradient(135deg, rgba(0,222,180,0.12), rgba(0,222,180,0.04))",
        iconBg: "rgba(0,222,180,0.15)",
        accent: "#00DEB4",
    },
    {
        icon: <AccountBalanceIcon />,
        // icon: "🏢",
        title: "Business Solutions",
        desc: "Discover our business payment solutions, mass payouts, and integration options.",
        faqSection: null, // navigates to /solutions
        gradient: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.04))",
        iconBg: "rgba(139,92,246,0.15)",
        accent: "#8B5CF6",
    },
    {
        icon: <LockOutlineIcon />,
        // icon: "🔒",
        title: "Account & Security",
        desc: "Learn about account security, password recovery, and two-factor authentication.",
        faqSection: "security",
        gradient: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))",
        iconBg: "rgba(245,158,11,0.15)",
        accent: "#F59E0B",
    },
    {
        icon: <MonetizationOnIcon />,
        // icon: "💰",
        title: "Fees & Pricing",
        desc: "Understand our fee structure, pricing, and how to get the best rates.",
        faqSection: "fees",
        gradient: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))",
        iconBg: "rgba(16,185,129,0.15)",
        accent: "#10B981",
    },
    {
        icon: <ScaleIcon />,
        // icon: "⚖️",
        title: "Legal & Compliance",
        desc: "Information about our licenses, regulations, and compliance requirements.",
        faqSection: "legal",
        gradient: "linear-gradient(135deg, rgba(239,68,68,0.10), rgba(239,68,68,0.03))",
        iconBg: "rgba(239,68,68,0.12)",
        accent: "#EF4444",
    },
];

// ─── Support Card Component ───────────────────────────────────────────────────
function SupportCard({ card, onClick }) {
    return (
        <Box
            onClick={onClick}
            sx={(theme) => ({
                bgcolor: "Background.main",
                borderRadius: 3,
                p: { xs: 3, md: 3.5 },
                cursor: "pointer",
                border: "1px solid",
                borderColor: theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.07)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 32px ${card.accent}22`,
                    borderColor: `${card.accent}55`,
                    "& .arrow-icon": {
                        opacity: 1,
                        transform: "translateX(0px)",
                    },
                    "& .card-bg": {
                        opacity: 1,
                    },
                },
            })}
        >
            {/* Hover background tint */}
            <Box
                className="card-bg"
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: card.gradient,
                    opacity: 0,
                    transition: "opacity 0.22s",
                    pointerEvents: "none",
                    borderRadius: "inherit",
                }}
            />

            {/* Icon */}
            <Box
                sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    background: card.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    mb: 2.5,
                    position: "relative",
                }}
            >
                {card.icon}
            </Box>

            {/* Title → main_header font */}
            <Typography
                sx={(theme) => ({
                    fontFamily: theme.typography.main_header?.fontFamily,
                    fontWeight: 700,
                    fontSize: { xs: "16px", md: "17px" },
                    color: "text.tertairy",
                    mb: 1,
                    position: "relative",
                })}
            >
                {card.title}
            </Typography>

            {/* Description → main_text */}
            <Typography
                sx={(theme) => ({
                    ...theme.typography.main_text,
                    fontSize: { xs: "13px", sm: "14px" },
                    color: "text.secondary",
                    lineHeight: 1.65,
                    position: "relative",
                })}
            >
                {card.desc}
            </Typography>

            {/* Arrow → appears on hover */}
            <Box
                className="arrow-icon"
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    opacity: 0,
                    transform: "translateX(-6px)",
                    transition: "opacity 0.22s, transform 0.22s",
                    color: card.accent,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
            </Box>
        </Box>
    );
}

// ─── Main Support Page ────────────────────────────────────────────────────────
const Support = () => {
    const navigate = useNavigate();

    const handleCardClick = (card) => {
        if (card.faqSection) {
            // Navigate to FAQ page, then scroll to the section
            navigate(ROUTES.FAQ);
            // Small timeout lets the page mount before scrolling
            setTimeout(() => {
                const el = document.getElementById(card.faqSection);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 120);
        } else {
            navigate(ROUTES.SOLUTION);
        }
    };

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

                {/* Badge */}
                <Box
                    sx={{
                        display: "inline-block",
                        px: "14px",
                        py: "5px",
                        mb: 2.5,
                        borderRadius: "20px",
                        background: "rgba(59,130,246,0.15)",
                        border: "1px solid rgba(59,130,246,0.35)",
                        color: "#7eb8f7",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        position: "relative",
                    }}
                >
                    Support Center
                </Box>

                {/* H1 → main_header */}
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
                    How can we{" "}
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(90deg, #1E78FF 0%, #00DEB4 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        help you?
                    </Box>
                </Typography>

                {/* Subtitle → main_text */}
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.main_text,
                        color: "rgba(255,255,255,0.60)",
                        maxWidth: "460px",
                        mx: "auto",
                        mb: 6,
                        position: "relative",
                    })}
                >
                    Find answers to common questions or get in touch with our support team.
                </Typography>
            </Box>

            {/* ══ CARDS GRID  */}
            <Box
                sx={{
                    maxWidth: "900px",
                    mx: "auto",
                    px: { xs: 2, md: 3 },
                    pt: 6,
                    pb: 4,
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: { xs: 2, md: 2.5 },
                    }}
                >
                    {supportCards.map((card) => (
                        <SupportCard
                            key={card.title}
                            card={card}
                            onClick={() => handleCardClick(card)}
                        />
                    ))}
                </Box>
            </Box>

                <Box
                    sx={(theme) => ({
                        background: theme.palette.gradient,
                        py: { xs: 5, md: 6 },
                        px: { xs: 3, md: 5 },
                        textAlign: "center",
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

                    {/* Title */}
                    <Typography
                        sx={(theme) => ({
                            fontFamily: theme.typography.main_header?.fontFamily,
                            fontWeight: 700,
                            fontSize: { xs: "20px", md: "26px" },
                            color: "text.main",
                            mb: 1.5,
                            position: "relative",
                        })}
                    >
                        Need more help?
                    </Typography>

                    {/* Sub */}
                    <Typography
                        sx={(theme) => ({
                            ...theme.typography.main_text,
                            fontSize: { xs: "13px", sm: "15px" },
                            color: "rgba(255,255,255,0.60)",
                            mb: 4,
                            position: "relative",
                        })}
                    >
                        Our support team is available 24/7 to assist you with any questions or concerns.
                    </Typography>

                    {/* CTA */}
                    <Box
                        component="a"
                        href="/contact"
                        sx={(theme) => ({
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            bgcolor: "primary.main",
                            color: "#fff",
                            px: 4,
                            py: 1.5,
                            borderRadius: `${theme.shape.borderRadius}px`,
                            fontSize: theme.typography.button?.fontSize ?? "0.9rem",
                            fontWeight: theme.typography.button?.fontWeight ?? 600,
                            textTransform: theme.typography.button?.textTransform ?? "none",
                            fontFamily: theme.typography.fontFamily,
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
                        <ArrowForwardIcon sx={{ fontSize: 17 }} />
                    </Box>
                </Box>
        </Box>
    );
};

export default Support;