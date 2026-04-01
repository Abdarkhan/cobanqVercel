import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useColorMode } from "@/theme/ThemeContext";
import { ICONS } from "@/constants/icons";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_BG_SCROLL_RANGE = 400;
const OPACITY_STEP = 0.04;

const NAV_LINKS = [
  { label: "Solutions", path: "/solution" },
  { label: "About Us", path: "/about" },
  { label: "Calculator", path: "/ExchangeRate" },
  { label: "Contact-Us", path: "/contact" },
];

// ─── Account Type Modal ───────────────────────────────────────────────────────
function AccountTypeModal({ open, onClose, mode }) {
  const navigate = useNavigate();

  const isLogin = mode === "login";

  const title = isLogin ? "Log In" : "Create Account";
  const subtitle = isLogin
    ? "Choose your account type to continue"
    : "Choose the type of account you want to create";

  const options = [
    {
      icon: <PersonIcon sx={{ fontSize: 40, color: "#1e78ff" }} />,
      title: "Personal Account",
      desc: isLogin
        ? "Access your personal money transfer account with competitive rates"
        : "Create a personal account for fast and secure money transfers",
      href: isLogin ? "https://burqfx.com/mod" : "https://burqfx.com/signup",
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 40, color: "#1e78ff" }} />,
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
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 0,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Cards */}
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {options.map((opt) => (
            <Card
              key={opt.title}
              variant="outlined"
              sx={{
                borderRadius: 2,
                transition: "border-color 0.2s, box-shadow 0.2s",
                "&:hover": {
                  borderColor: "#1e78ff",
                  boxShadow: "0 4px 20px rgba(30,120,255,0.15)",
                },
              }}
            >
              <CardActionArea
                component="a"
                href={opt.href}
                onClick={onClose}
                sx={{ p: 2, display: "flex", alignItems: "flex-start", gap: 2 }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: "rgba(30,120,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {opt.icon}
                </Box>
                <CardContent sx={{ p: "0 !important" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {opt.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {opt.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ─── AppHeader ────────────────────────────────────────────────────────────────
export default function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toggleColorMode, mode } = useColorMode();
  const { scrollY } = useScroll();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null); // "login" | "register" | null
  const [bgOpacity, setBgOpacity] = useState(0);

  const is_home = pathname === "/";
  const last_opacity_ref = useRef(0);

  // ── Scroll-based background opacity ──────────────────────────────────────
  const nav_bg_opacity = useTransform(scrollY, [0, NAV_BG_SCROLL_RANGE], [0, 1]);

  useMotionValueEvent(nav_bg_opacity, "change", (latest) => {
    if (!is_home) { setBgOpacity(1); return; }
    const clamped = Math.min(1, Math.max(0, latest));
    if (
      Math.abs(clamped - last_opacity_ref.current) >= OPACITY_STEP ||
      clamped === 0 ||
      clamped === 1
    ) {
      last_opacity_ref.current = clamped;
      setBgOpacity(clamped);
    }
  });

  useEffect(() => {
    if (!is_home) { setBgOpacity(1); return; }
    const y = typeof window !== "undefined" ? window.scrollY : 0;
    setBgOpacity(Math.min(1, Math.max(0, y / NAV_BG_SCROLL_RANGE)));
  }, [pathname]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMobileOpen(false);
  };

  const isSolutionsActive =
    pathname === "/solution" || pathname === "/BusinessSolution";

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100,
        borderBottom: "1px solid white",
      }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "Background.navebg",
            height: '70px',
            color: "white",
            backdropFilter: is_home
              ? bgOpacity > 0 ? "saturate(160%) blur(14px)" : "none"
              : "saturate(160%) blur(14px)",
            WebkitBackdropFilter: is_home
              ? bgOpacity > 0 ? "saturate(160%) blur(14px)" : "none"
              : "saturate(160%) blur(14px)",
            borderBottom: `1px solid rgba(255,255,255,${is_home ? 0.08 * bgOpacity : 0.08})`,
            boxShadow: "none",
            transition: "backdrop-filter 0.2s ease",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 64, md: 72 } }}>

            {/* ── Logo Block ─────────────────────────────────────────────── */}
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
              {/* Logo + Since 2003 */}
              <Box
                sx={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  // border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 5,
                  px: 1.5,
                  py: 0.5,
                }}
                onClick={() => goTo("/")}
              >
                <img src={ICONS.Logo} alt="Logo" width={120} height={32} />
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: "1rem",
                    fontWeight: 400,
                    opacity: 0.75,
                    color: "white",
                    mt: 0.5,
                  }}
                >
                  Since 2003
                </Typography>
              </Box>

              {/* Personal / Business toggle */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 0.5,
                  // border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 5,
                  px: 1,
                  py: 0.5,
                  ml: 1,
                }}
              >
                {[
                  // { label: "Personal", path: "/personal" },
                  { label: "Business", path: "/business" },
                ].map((tab) => {
                  const isActive = pathname === tab.path;
                  return (
                    <Typography
                      key={tab.label}
                      variant="body2"
                      onClick={() => goTo(tab.path)}
                      sx={{
                        fontSize: "16.5px",
                        cursor: "pointer",
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 4,
                        fontWeight: "bold",
                        bgcolor: isActive ? "#E3EEFF" : "transparent",
                        color: isActive ? "#132E5A" : "white",
                        // bgcolor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                        "&:hover": { scale: 1.05 },
                        transition: "all 0.2s",
                      }}
                    >
                      {tab.label}
                    </Typography>
                  );
                })}
              </Box>
            </Box>

            {/* ── Desktop Nav Links + Actions ────────────────────────────── */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
              {NAV_LINKS.map((item) => {
                const is_active =
                  pathname === item.path ||
                  (item.label === "Solutions" && isSolutionsActive);

                return (
                  <Typography
                    key={item.label}
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      px: 2,
                      py: 0.6,
                      borderRadius: 1.5,
                      color: is_active ? "black" : "white",
                      fontWeight: 700,
                      bgcolor: is_active ? "#E2EEFF" : "transparent",
                      "&:hover": { bgcolor: "#E2EEFF", color: "black" },
                      transition: "background 0.2s ease",
                    }}
                    onClick={() => goTo(item.path)}
                  >
                    {item.label}
                  </Typography>
                );
              })}

              {/* Theme toggle */}
              <IconButton onClick={toggleColorMode} size="small">
                {mode === "light"
                  ? <LightMode sx={{ color: "white" }} />
                  : <DarkMode sx={{ color: "white" }} />}
              </IconButton>

              {/* Log In */}
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => setModalMode("login")}
                sx={{
                  ml: 1,
                  color: "white",
                  fontWeight: "bold",
                 borderRadius: '10px',
                  "&:hover": { bgcolor: "#304c79ff" },
                }}
              >
                Log in
              </Button>

              {/* Register */}
              <Button
                variant="contained"
                startIcon={<PersonAddAltIcon />}
                onClick={() => setModalMode("register")}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: '10px',
                  "&:hover": { bgcolor: "#304c79ff" },
                }}
              >
                Register
              </Button>
            </Box>

            {/* ── Mobile Icons ───────────────────────────────────────────── */}
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5 }}>
              <IconButton onClick={toggleColorMode}>
                {mode === "light"
                  ? <LightMode sx={{ color: "white" }} />
                  : <DarkMode sx={{ color: "white" }} />}
              </IconButton>
              <IconButton sx={{ color: "white" }} onClick={() => setMobileOpen(true)}>
                <Menu />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* ── Mobile Drawer ────────────────────────────────────────────────────── */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {/* Close button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        {/* Section: Account Type */}
        <Typography
          variant="overline"
          sx={{ px: 2, color: "text.secondary", letterSpacing: 1.5, fontWeight: 700 }}
        >
          Account Type
        </Typography>
        <List dense sx={{ px: 1 }}>
          {[
            // { label: "Personal", path: "/personal" },
            { label: "Business", path: "/business" },
          ].map((tab) => (
            <ListItem
              button
              key={tab.label}
              onClick={() => goTo(tab.path)}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                // bgcolor: pathname === tab.path ? "rgba(30,120,255,0.1)" : "transparent",
              }}
            >
              <ListItemText primary={tab.label} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Section: Account Actions */}
        <Typography
          variant="overline"
          sx={{ px: 2, color: "text.secondary", letterSpacing: 1.5, fontWeight: 700 }}
        >
          Account Actions
        </Typography>
        <Box sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={() => { setMobileOpen(false); setModalMode("login"); }}
            sx={{borderRadius: '10px', fontWeight: "bold" }}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<PersonAddAltIcon />}
            onClick={() => { setMobileOpen(false); setModalMode("register"); }}
            sx={{ borderRadius: '10px', fontWeight: "bold" }}
          >
            Register
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Section: Navigation */}
        <Typography
          variant="overline"
          sx={{ px: 2, color: "text.secondary", letterSpacing: 1.5, fontWeight: 700 }}
        >
          Navigation
        </Typography>
        <List dense sx={{ px: 1 }}>
          {NAV_LINKS.map((item) => {
            const is_active =
              pathname === item.path ||
              (item.label === "Solutions" && isSolutionsActive);
            return (
              <ListItem
                button
                key={item.label}
                onClick={() => goTo(item.path)}
                sx={{
                  bgcolor: is_active ? "rgba(30,120,255,0.1)" : "transparent",
                  borderRadius: 1.5,
                  mb: 0.5,
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* ── Account Type Modal (Login / Register) ────────────────────────────── */}
      <AccountTypeModal
        open={Boolean(modalMode)}
        onClose={() => setModalMode(null)}
        mode={modalMode}
      />
    </>
  );
}