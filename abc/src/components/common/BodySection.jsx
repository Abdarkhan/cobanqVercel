import React from "react";
import { Box, Container, Typography } from "@mui/material";

const BodySection = () => {
    return (
        <Box
            sx={{
                bgcolor: "Background.main",
                color: "text.tertairy",
                py: { xs: 10, md: 14 },
                borderBottom: "1px solid var(--color-surface-border)",
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography 
                        // variant="main_header"
                         sx={(theme) => theme.typography.main_header}
                         textAlign="left">
                            Simplifying business payments
                        </Typography>

                        <Typography  sx={(theme) => theme.typography.main_text}>
                            With CoBanq business accounts, you can seamlessly hold, exchange,
                            and manage funds across currencies, making international payments,
                            foreign exchange, and cash flow easier than ever.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: { md: "0 0 auto" },
                            width: { xs: "100%", md: "45%" },
                            maxWidth: 480,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://burqfx.com/public_assets/business_assets/images_v2/header4.png"
                            alt="CoBanq"
                            loading="lazy"
                            sx={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: 2,
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "justify",
                        gap: 6,
                        mt: 10,
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "100%", md: "45%" },
                            maxWidth: 480,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://burqfx.com/public_assets/business_assets/images_v2/header5.png"
                            alt="CoBanq"
                            sx={{
                                width: "100%",
                                borderRadius: 2,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        />
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            textAlign: "justify",
                        }}
                    // sx={{ textAlign: "left" }}
                    >
                        <Typography sx={(theme) => theme.typography.main_header}>
                            Business accounts
                        </Typography>

                        <Typography  sx={(theme) => theme.typography.main_text}>
                            With CoBanq business accounts, you can seamlessly hold, exchange, and manage funds across currencies, making international payments, foreign exchange, and cash flow easier than ever.
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 6,
                        mt: 10,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography sx={(theme) => theme.typography.main_header} textAlign="left" >
                            FX rates that work for you
                        </Typography>

                        <Typography sx={(theme) => theme.typography.main_text}>
                            Let your users access competitive, transparent foreign exchange rates—built into every transfer, no extra negotiation needed.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: { md: "0 0 auto" },
                            width: { xs: "100%", md: "45%" },
                            maxWidth: 480,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://burqfx.com/public_assets/business_assets/images_v2/header6.png"
                            alt="CoBanq"
                            loading="lazy"
                            sx={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: 2,
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default BodySection;