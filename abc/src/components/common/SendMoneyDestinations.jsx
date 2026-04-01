import React, { useState } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

const allDestinations = [
  { country: "United Arab Emirates", code: "ae" },
  { country: "Albania", code: "al" },
  { country: "Argentina", code: "ar" },
  { country: "Australia", code: "au" },
  { country: "Barbados", code: "bb" },
  { country: "Bahrain", code: "bh" },
  { country: "Bangladesh", code: "bd" },
  { country: "Bosnia", code: "ba" },
  { country: "Belgium", code: "be" },
  { country: "Bulgaria", code: "bg" },
  { country: "Bahamas", code: "bs" },
  { country: "Brunei Darussalam", code: "bn" },
  { country: "Canada", code: "ca" },
  { country: "Colombia", code: "co" },
  { country: "Czechia", code: "cz" },
  { country: "Switzerland", code: "ch" },
  { country: "Costa Rica", code: "cr" },
  { country: "Germany", code: "de" },
  { country: "Chile", code: "cl" },
  { country: "Cape Verde", code: "cv" },
  { country: "Djibouti", code: "dj" },
  { country: "Dominican Republic", code: "do" },
  { country: "Egypt", code: "eg" },
  { country: "Ecuador", code: "ec" },
  { country: "Estonia", code: "ee" },
  { country: "Finland", code: "fi" },
  { country: "France", code: "fr" },
  { country: "Greece", code: "gr" },
  { country: "Ghana", code: "gh" },
  { country: "Guatemala", code: "gt" },
  { country: "Guyana", code: "gy" },
];

export default function SendMoneyDestinations() {
  const [visibleCountries, setVisibleCountries] = useState(10);

  const handleShowMore = () => {
    setVisibleCountries(allDestinations.length);
  };

  const handleShowLess = () => {
    setVisibleCountries(10);
  };

  return (
    <Box
      sx={{
        bgcolor: "Background.main",
        py: 10,
        // borderBottom: "1px solid white",
        borderBottom: "1px solid var(--color-surface-border)",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          // variant="main_header"
          fontWeight="bold"
          sx={(theme) => ({
            ...theme.typography.main_header,
            color: theme.palette.text.primary,
          })}
          gutterBottom
        >
          Send fast and securely to{" "}
          {/* Send Money{" "} */}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Global Destinations
          </Box>
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "gray" }}>
          Connecting the world
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {allDestinations
            .slice(0, visibleCountries)
            .map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textTransform: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f4f4f4",
                    },
                    boxShadow: "none",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Flag image from flagcdn.com - always renders correctly */}
                    <img
                      src={`https://flagcdn.com/w40/${destination.code}.png`}
                      srcSet={`https://flagcdn.com/w80/${destination.code}.png 2x`}
                      width="28"
                      height="20"
                      alt={`${destination.country} flag`}
                      loading="lazy"
                      style={{ objectFit: "cover", borderRadius: "3px" }}
                    />
                    <Typography variant="body1">{`Send money to ${destination.country}`}</Typography>
                  </Box>
                </Button>
              </Grid>
            ))}
        </Grid>

        {/* "Read More" button */}
        {visibleCountries < allDestinations.length && (
          <Button
            variant="contained"
            sx={{
              background: "#053685",
              borderRadius: '10px',
              mt: 4,
              // bgcolor: "#7a9db5",
              // background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
              "&:hover": { bgcolor: "#5f7a8b" },
              textTransform: "none",
            }}
            onClick={handleShowMore}
          >
            Read More
          </Button>
        )}

        {/* "Read Less" button */}
        {visibleCountries > 10 && (
          <Button
            variant="contained"
            sx={{
              background: "#053685",
              borderRadius: '10px',
              mt: 4,
              // background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
              "&:hover": { bgcolor: "#5f7a8b" },
              textTransform: "none",
            }}
            onClick={handleShowLess}
          >
            Read Less
          </Button>
        )}
      </Container>
    </Box>
  );
}
