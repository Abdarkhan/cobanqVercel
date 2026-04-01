import { use_reveal } from "@/components/hooks/use_scroll_animation";
import { PeopleAlt } from "@mui/icons-material";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

// const GRADIENT = "linear-gradient(135deg, #000616 0%, #053685 100%)";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = (y) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function About() {
  const heading = use_reveal({ y: 50, duration: 0.8 });

  return (
    <>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient,
          // background: "GRADIENT",
          minHeight: "60vh",

          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Heading */}
            <motion.div variants={item(40)}>
              <Typography
                variant="main_header"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "2.8rem", sm: "3.5rem", md: "64px" },
                  fontWeight: 900,
                  color: "#fff",
                  mb: 3,
                }}
              >
                Our{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily: '"Inter","Arial",sans-serif',
                    // fontStyle: "italic",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #7eb8ff, #b8d4ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  company
                </Box>
              </Typography>
            </motion.div>

            {/* Text */}
            <motion.div variants={item(30)}>
              <Typography
                variant="main_text"
                color="#fff"
              >
                Established in 2003, CoBanq Ltd is a UK-based financial
                institution committed to delivering efficient and transparent
                cross-border payment solutions. We serve both individuals and
                businesses with a focus on speed, security, and
                cost-effectiveness.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 6,
          py: 8,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* ── Left: Dark card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0 }}
        >
          <Box
            sx={{
              width: { xs: 280, sm: 400, md: 500, lg: 680 },
              height: { xs: 280, sm: 400, md: 480, lg: 580 },
              borderRadius: "16px",
              bgcolor: "#0e1628",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {[300, 230, 165, 110].map((size, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  border: `1px solid rgba(255,255,255,${0.04 + i * 0.025})`,
                  bgcolor: `rgba(255,255,255,${i * 0.018})`,
                }}
              />
            ))}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "rgba(94,143,255,0.12)",
              }}
            >
              <PeopleAlt sx={{ fontSize: 46, color: "#5e8fff" }} />
            </Box>
          </Box>
        </motion.div>

        {/* ── Right: Text ── */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={item(40)}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1.9rem", md: "56px" },
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  mb: 4,
                }}
              >
                Licensing &amp; Regulation
              </Typography>
            </motion.div>

            <motion.div variants={item(30)}>
              <Typography
                sx={{ lineHeight: 1.85, fontSize: "18px", mb: 3 }}
              >
                CoBanq Ltd is fully authorized and regulated by the Financial Conduct
                Authority (FCA) under the Payment Services Regulations 2017 for the
                provision of payment services.
              </Typography>
            </motion.div>

            <motion.div variants={item(28)}>
              <Typography
                sx={{ lineHeight: 1.85, fontSize: "18px", mb: 3 }}
              >
                Our FCA Registration Number is{" "}
                <Box component="span" sx={{ fontWeight: 700, fontSize: "18px" }}>508565</Box>
                , and our Company Registration Number is{" "}
                <Box component="span" sx={{ fontWeight: 700, fontSize: "18px" }}>04995400</Box>
                . Our registered office is located at 37th Floor, 1 Canada Square, London E14 5AA.
              </Typography>
            </motion.div>

            <motion.div variants={item(26)}>
              <Typography
                sx={{ lineHeight: 1.85, fontSize: "18px", mb: 5 }}
              >
                For regulatory or compliance inquiries, please contact us at{" "}
                <Box
                  component="a"
                  href="mailto:admin@cobanq.com"
                  sx={{
                    color: "#7eb8ff",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  admin@cobanq.com
                </Box>
                .
              </Typography>
            </motion.div>
          </motion.div>
        </Box>
      </Box>
      <Box sx={{ bgcolor: '#000616', p: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

        <motion.div
          ref={heading.ref}
          initial={heading.initial}
          animate={heading.animate}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

            <Typography variant="main_header" color="#271397ff" sx={{ fontSize: '64px' }} >
              OUR MISSION
            </Typography>
            <Typography variant="main_header" color="#fff" sx={{ fontSize: '18px', fontWeight: 400, textAlign: 'center', lineHeight: 1.6 }} >
              Our mission is to power global payments by connecting a worldwide network through robust digital infrastructure. We are dedicated to making cross-border transfers simple, seamless, and accessible for everyone, enabling individuals, businesses, and institutions to move money efficiently and securely across borders, regardless of geography or financial system.
            </Typography>
          </Box>
        </motion.div>
      </Box>
      <Divider sx={{ my: 0.000001 }} />
      {/* <Box
        sx={{
          background: GRADIENT,
          minHeight: "60vh",

          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={item(40)}>
              <Typography
                variant="main_header"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "2.8rem", sm: "3.5rem", md: "64px" },
                  fontWeight: 900,
                  color: "#fff",
                  mb: 3,
                }}
              >
                OUR MISSION
              </Typography>
            </motion.div>

            <motion.div variants={item(30)}>
              <Typography
                variant="main_text"
                color="#fff"
              >
                Our mission is to power global payments by connecting a worldwide network through robust digital infrastructure. We are dedicated to making cross-border transfers simple, seamless, and accessible for everyone, enabling individuals, businesses, and institutions to move money efficiently and securely across borders, regardless of geography or financial system.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box> */}
    </>
  );
}