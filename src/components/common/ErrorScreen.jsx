import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorScreen({ error }) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 3,
                bgcolor: "Background.main",
            }}
        >
            <Typography variant="h4" color="error" gutterBottom>
                Oops! Something went wrong.
            </Typography>
            {error && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {error.message || error.toString()}
                </Typography>
            )}
            <Button variant="contained" onClick={() => navigate("/")}>
                Go Home
            </Button>
        </Box>
    );
}