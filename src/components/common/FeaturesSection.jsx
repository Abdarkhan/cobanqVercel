import { Box, Container, Typography } from "@mui/material";

const features = [
  {
    image: "https://burqfx.com/public_assets/business_assets/images_v2/carousel/Download%201080x1080%201.png",
    title: "Dedicated support",
    desc: "Get the answers you need anytime with our 24/7 customer support team.",
  },
  {
    image: "https://burqfx.com/public_assets/business_assets/images_v2/carousel/Download%201080x1080%201-1.png",
    title: "Privacy and data",
    desc: "Your privacy matters. We use advanced encryptions to safeguard your data.",
  },
  {
    image: "https://burqfx.com/public_assets/business_assets/images_v2/carousel/Download%201080x1080%201-2.png",
    title: "International safeguarding",
    desc: "Your funds are safely protected under leading bank-grade security.",
  },
];

export default function FeaturesSection() {
  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: "#e3eeff",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {features.map((item) => (
            <Box
              key={item.title}
              sx={{
                bgcolor: "#ffffffff",
                borderRadius: "20px",
                p: 5,
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Box >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "24px",
                  mb: 1,
                  // color: "#1e293b",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#475569", fontSize: "0.95rem" }}
              >
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}