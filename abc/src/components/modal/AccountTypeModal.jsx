import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Close, ChevronRight } from "@mui/icons-material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LoginIcon from "@mui/icons-material/Login";

export default function AccountTypeModal({ open, onClose, mode }) {
    const isLogin = mode === "login";

    const title = isLogin ? "Log In" : "Create Account";
    const titleIcon = isLogin
        ? <LoginIcon sx={{ fontSize: 26 }} />
        : <PersonAddAltIcon sx={{ fontSize: 26 }} />;
    const subtitle = isLogin
        ? "Choose your account type to continue"
        : "Choose the type of account you want to create";

    const options = [
        {
            icon: <PersonAddAltIcon sx={{ fontSize: 28, color: "#fff" }} />,
            iconBg: "linear-gradient(135deg, #7c5be0 0%, #4f8ef7 100%)",
            title: "Personal Account",
            desc: isLogin
                ? "Access your personal money transfer account with competitive rates"
                : "Create a personal account for fast and secure money transfers",
            href: isLogin ? "https://burqfx.com/mod" : "https://burqfx.com/signup",
        },
        {
            icon: <BusinessCenterIcon sx={{ fontSize: 28, color: "#fff" }} />,
            iconBg: "linear-gradient(135deg, #1a3a6e 0%, #1e5bb5 100%)",
            title: "Business Account",
            desc: isLogin
                ? "Manage your business transactions and enterprise payments"
                : "Set up a business account for your company's financial needs",
            href: "https://business.cobanq.com/",
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    p: 0,
                    overflow: "hidden",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                    // background: "linear-gradient(160deg, #eef3ff 0%, #ffffff 45%)",
                },
            }}
        >
            {/* ── Header ───────────────────────────────────────────────── */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 4,
                    pb: 1.5,
                    px: 3,
                    position: "relative",
                    borderBottom: "1px solid #e5eaf3",
                    backgroundColor: "#e3eeff"
                }}
            >
                {/* Close button */}
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        bgcolor: "rgba(0,0,0,0.07)",
                        width: 30,
                        height: 30,
                        "&:hover": { bgcolor: "rgba(0,0,0,0.13)" },
                    }}
                >
                    <Close sx={{ fontSize: 16 }} />
                </IconButton>

                {/* Title */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                    <Box sx={{ color: "#1e4db7", display: "flex", alignItems: "center" }}>
                        {titleIcon}
                    </Box>
                    <Typography sx={(theme) => ({
                        ...theme.typography.main_header,
                        color: "text.secondary",
                        fontSize: { xs: "22px", sm: '26px', md: "30px" },
                    })}>
                        {/* sx={{ fontSize: "1.35rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}> */}
                        {title}
                    </Typography>
                </Box>


            </Box>

            {/* ── Option Cards ─────────────────────────────────────────── */}
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: "13px",
                    // background: opt.iconBg,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2.5,
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                {/* Subtitle */}
                <Typography sx={(theme) => ({
                    ...theme.typography.main_text,
                    color: "text.secondary",
                    fontSize: { xs: '12px', sm: '14px', md: '15px' },
                })}>
                    {subtitle}
                </Typography>
                <DialogContent sx={{ px: 2.5, pb: 3, pt: 1.5 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {options.map((opt) => (
                            <Box
                                key={opt.title}
                                component="a"
                                href={opt.href}
                                onClick={onClose}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: "14px",
                                    border: "1.5px solid #e5eaf3",
                                    bgcolor: "#fff",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
                                    "&:hover": {
                                        borderColor: "#4f8ef7",
                                        boxShadow: "0 4px 18px rgba(79,142,247,0.15)",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                {/* Gradient Icon Box */}
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: "13px",
                                        background: opt.iconBg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                    }}
                                >
                                    {opt.icon}
                                </Box>

                                {/* Text */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e4db7", mb: 0.3 }}>
                                        {opt.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.45 }}>
                                        {opt.desc}
                                    </Typography>
                                </Box>

                                {/* Arrow */}
                                <ChevronRight sx={{ color: "#9ca3af", fontSize: 22, flexShrink: 0 }} />
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    );
}