import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
} from "@mui/material";

export default function Login({ open, handleClose }) {

    const [tab, setTab] = useState(0); // 0: Login, 1: Register

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleTabChange = (e, newValue) => setTab(newValue);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login", loginData);
        // TODO: API call
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Register", registerData);
        // TODO: API call
    };

    return (
        <Box textAlign="center" mt={10}>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        textColor="text.primary"
                        indicatorColor={tab === 1 ? "primary" : "secondary"}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleLogin} sx={{
                        display: tab === 0 ? "block" : "none",
                        mt: 2
                    }}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            margin="normal"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({ ...loginData, email: e.target.value })
                            }
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({ ...loginData, password: e.target.value })
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </Box>

                    <Box component="form" onSubmit={handleRegister} sx={{
                        display: tab === 1 ? "block" : "none",
                        mt: 2
                    }}>
                        <TextField
                            label="Full Name"
                            fullWidth
                            required
                            margin="normal"
                            value={registerData.name}
                            onChange={(e) =>
                                setRegisterData({ ...registerData, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            margin="normal"
                            value={registerData.email}
                            onChange={(e) =>
                                setRegisterData({ ...registerData, email: e.target.value })
                            }
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData({ ...registerData, password: e.target.value })
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="text.secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}