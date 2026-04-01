import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
            <Typography variant="h6" mt={2}>
                Loading...
            </Typography>
        </Box>
    );
}