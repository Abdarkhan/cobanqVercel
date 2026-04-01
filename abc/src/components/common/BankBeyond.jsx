import { Box, Typography, Button, Stack } from "@mui/material";

export default function BankBeyond() {
    return (
        // <Box
        //   sx={{
        //     bgcolor: "#0B2265", // dark blue background
        //     py: { xs: 8, md: 12 },
        //     display: "flex",
        //     justifyContent: "center",
        //     px: 2,
        //   }}
        // >
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                display: "flex",
                justifyContent: "center",
                px: 2,
                position: "relative",
                overflow: "hidden",
                bgcolor: "Background.secondary",
                borderBottom: "1px solid white",
            }}
        >
            <Box
                sx={{
                    bgcolor: "Background.main",
                    borderRadius: 4,
                    py: { xs: 4, md: 10 },
                    // maxWidth: 800,
                    width: "100%",
                    textAlign: "center",
                }}
            >
                {/* Heading */}
                <Typography
                    //   variant="h4"
                    sx={(theme) => ({
                        ...theme.typography.main_header,
                        // fontSize: "4rem",
                        color: "text.tertairy",
                        fontWeight: 700,
                        // fontSize: { xs: "28px", md: "2.2rem" },
                        lineHeight: 1.1,
                        mb: "48px",
                    })}
                >
                    Bank Beyond{" "}
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(90deg,#1E78FF,#00DEB4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    > Borders. Anytime,</Box>
                    Anywhere.
                </Typography>

                {/* Description */}
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.main_text,
                        color: "text.secondary",
                        mb: 4,
                    })}
                >
                    Download the CoBanq app to send money globally, manage currencies, and
                    track transfers — all from the palm of your hand. Fast. Secure. Built
                    for the world you live in.
                </Typography>

                {/* App Store buttons */}
                <Stack
                    direction="row"
                    spacing={0}
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    <Button
                        // variant="contained"
                        sx={{
                            height: 50,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://burqfx.com/public_assets/img/download_apple.png"
                            alt="Google Play"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Button>
                    <Button
                        // variant="contained"
                        sx={{
                            height: 50,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
