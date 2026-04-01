import React, { useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const GlobalAlert = ({
  open = false,
  title = "",
  desc = "",
  icon = null,
  type = "info",
  confirmText = "OK",
  cancelText = null,
  onConfirm,
  onCancel,
  closeOnBackdrop = true,
}) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC key closes
  // useEffect(() => {
  //   const handler = (e) => {
  //     if (e.key === "Escape" && open && onCancel) onCancel();
  //   };
  //   window.addEventListener("keydown", handler);
  //   return () => window.removeEventListener("keydown", handler);
  // }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── BACKDROP ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => closeOnBackdrop && onCancel && onCancel()}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "Background.tertiary",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* ── CARD ── */}
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
              delay: 0.04,
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              pointerEvents: "none",
            }}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: 420,
                borderRadius: "24px",
                bgcolor: "Background.secondary",
                boxShadow: `0 32px 80px rgba(0, 0, 0, 0.55)`,
                p: { xs: 4, md: 5 },
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                // inner glow
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-40%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  height: "160%",
                  pointerEvents: "none",
                },
              }}
            >
              {/* Close X */}
              {onCancel && (
                <IconButton
                  onClick={onCancel}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    color: "text.accent",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4l8 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>
              )}

              {/* ── ICON ── */}
              {icon && (
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                    delay: 0.15,
                  }}
                >
                  <Box
                    sx={{
                      width: 76,
                      height: 76,
                      borderRadius: "50%",
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      fontSize: 36,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {icon}
                  </Box>
                </motion.div>
              )}

              {/* ── TITLE ── */}
              {title && (
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 20, md: 24 },
                    letterSpacing: "-0.4px",
                    color: "text.tertairy",
                    mb: desc ? 1.5 : 3,
                    position: "relative",
                    zIndex: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
              )}

              {/* ── DESC ── */}
              {desc && (
                <Typography
                  sx={{
                    color: "text.accent",
                    fontSize: { xs: 13, md: 15 },
                    lineHeight: 1.75,
                    mb: 4,
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 320,
                    mx: "auto",
                  }}
                >
                  {desc}
                </Typography>
              )}

              {/* ── BUTTONS ── */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexDirection: cancelText ? "row" : "column",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Cancel */}
                {cancelText && (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ flex: 1 }}
                  >
                    <Button
                      fullWidth
                      onClick={onCancel}
                      sx={{
                        py: 1.4,
                        borderRadius: "100px",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: "none",
                        border: "1px solid rgba(255,255,255,0.13)",
                        color: "text.tertairy",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.28)",
                        },
                      }}
                    >
                      {cancelText}
                    </Button>
                  </motion.div>
                )}

                {/* Confirm */}
                <motion.div
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ flex: cancelText ? 1 : "unset" }}
                >
                  <Button
                    fullWidth={!!cancelText}
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                      py: 1.4,
                      px: cancelText ? undefined : 6,
                      borderRadius: "100px",
                      fontWeight: 700,
                      fontSize: 14,
                      textTransform: "none",
                      background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                    }}
                  >
                    {confirmText}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlobalAlert;
