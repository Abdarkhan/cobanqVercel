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
} from "@mui/material";
import { ROUTES } from "@/constants/routes";
import AccountTypeModal from "../modal/AccountTypeModal";

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_BG_SCROLL_RANGE = 400;
const OPACITY_STEP = 0.04;

const NAV_LINKS = [
  { label: "Solutions",   path: ROUTES.SOLUTION },
  { label: "About Us",    path: ROUTES.ABOUT },
  { label: "Calculator",  path: ROUTES.EXCHANGE_RATE },
  { label: "Contact-Us",  path: ROUTES.CONTACT },
];

// ─── AppHeader ────────────────────────────────────────────────────────────────
export default function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toggleColorMode, mode } = useColorMode();
  const { scrollY } = useScroll();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalMode, setModalMode]   = useState(null); // "login" | "register" | null
  const [bgOpacity, setBgOpacity]   = useState(0);

  const is_home = pathname === "/";
  const last_opacity_ref = useRef(0);

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
      <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100, borderBottom: "1px solid white" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "Background.navebg",
            height: "70px",
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
              <Box
                sx={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 1, borderRadius: 5, px: 1.5, py: 0.5 }}
                onClick={() => goTo("/")}
              >
                <img src={ICONS.Logo} alt="Logo" width={120} height={32} />
                <Typography sx={{ fontStyle: "italic", fontSize: "1rem", fontWeight: 400, opacity: 0.75, color: "white", mt: 0.5 }}>
                  Since 2003
                </Typography>
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5, borderRadius: 5, px: 1, py: 0.5, ml: 1 }}>
                {[{ label: "Business", path: "/business" }].map((tab) => {
                  const isActive = pathname === tab.path;
                  return (
                    <Typography
                      key={tab.label}
                      variant="body2"
                      onClick={() => goTo(tab.path)}
                      sx={{
                        fontSize: "16.5px", cursor: "pointer", px: 1.5, py: 0.4, borderRadius: 4, fontWeight: "bold",
                        bgcolor: isActive ? "#E3EEFF" : "transparent",
                        color:   isActive ? "#132E5A" : "white",
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
              {NAV_LINKS.map((navItem) => {
                const is_active =
                  pathname === navItem.path ||
                  (navItem.label === "Solutions" && isSolutionsActive);
                return (
                  <Typography
                    key={navItem.label}
                    variant="body1"
                    sx={{
                      cursor: "pointer", px: 2, py: 0.6, borderRadius: 1.5, fontWeight: 700,
                      color:  is_active ? "black" : "white",
                      bgcolor: is_active ? "#E2EEFF" : "transparent",
                      "&:hover": { bgcolor: "#E2EEFF", color: "black" },
                      transition: "background 0.2s ease",
                    }}
                    onClick={() => goTo(navItem.path)}
                  >
                    {navItem.label}
                  </Typography>
                );
              })}

              <IconButton onClick={toggleColorMode} size="small">
                {mode === "light"
                  ? <LightMode sx={{ color: "white" }} />
                  : <DarkMode  sx={{ color: "white" }} />}
              </IconButton>

              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => setModalMode("login")}
                sx={{ ml: 1, color: "white", fontWeight: "bold", borderRadius: "10px", "&:hover": { bgcolor: "#304c79ff" } }}
              >
                Log in
              </Button>

              <Button
                variant="contained"
                startIcon={<PersonAddAltIcon />}
                onClick={() => setModalMode("register")}
                sx={{ color: "white", fontWeight: "bold", borderRadius: "10px", "&:hover": { bgcolor: "#304c79ff" } }}
              >
                Register
              </Button>
            </Box>

            {/* ── Mobile Icons ───────────────────────────────────────────── */}
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5 }}>
              <IconButton onClick={toggleColorMode}>
                {mode === "light"
                  ? <LightMode sx={{ color: "white" }} />
                  : <DarkMode  sx={{ color: "white" }} />}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)}><Close /></IconButton>
        </Box>

        <Typography variant="overline" sx={{ px: 2, color: "text.secondary", letterSpacing: 1.5, fontWeight: 700 }}>
          Account Type
        </Typography>
        <List dense sx={{ px: 1 }}>
          {[{ label: "Business", path: "/business" }].map((tab) => (
            <ListItem button key={tab.label} onClick={() => goTo(tab.path)} sx={{ borderRadius: 1.5, mb: 0.5 }}>
              <ListItemText primary={tab.label} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography variant="overline" sx={{ px: 2, color: "text.secondary", letterSpacing: 1.5, fontWeight: 700 }}>
          Account Actions
        </Typography>
        <Box sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            variant="contained" fullWidth startIcon={<LoginIcon />}
            onClick={() => { setMobileOpen(false); setModalMode("login"); }}
            sx={{ borderRadius: "10px", fontWeight: "bold" }}
          >
            Log In
          </Button>
          <Button
            variant="outlined" fullWidth startIcon={<PersonAddAltIcon />}
            onClick={() => { setMobileOpen(false); setModalMode("register"); }}
            sx={{ borderRadius: "10px", fontWeight: "bold" }}
          >
            Register
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="overline" sx={{ px: 2, color: "text.secondary", letterSpacing: 1.5, fontWeight: 700 }}>
          Navigation
        </Typography>
        <List dense sx={{ px: 1 }}>
          {NAV_LINKS.map((navItem) => {
            const is_active =
              pathname === navItem.path ||
              (navItem.label === "Solutions" && isSolutionsActive);
            return (
              <ListItem
                button key={navItem.label} onClick={() => goTo(navItem.path)}
                sx={{ bgcolor: is_active ? "rgba(30,120,255,0.1)" : "transparent", borderRadius: 1.5, mb: 0.5 }}
              >
                <ListItemText primary={navItem.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* ── Account Type Modal ───────────────────────────────────────────────── */}
      <AccountTypeModal
        open={Boolean(modalMode)}
        onClose={() => setModalMode(null)}
        mode={modalMode}
      />
    </>
  );
}