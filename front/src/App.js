import React, { useState } from "react";
import { CssBaseline, Container, Grid, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Translator from "./components/Translator";
import { blueGrey } from "@mui/material/colors";

/**
 * Root application component.
 * Defines the layout, theme, and provides the language state
 * to the Translator component.
 */
function App() {
    // Application state: selected target language for translation
    const [selectedLanguage, setSelectedLanguage] = useState("python");

    // Define custom theme using Material-UI
    const theme = createTheme({
        palette: {
            mode: "light", // Light mode color scheme
            primary: {
                main: "#252856", // Main branding color
            },
            secondary: {
                main: blueGrey[500], // Secondary accent color
            },
            background: {
                default: "#f5f5f5", // Page background
                paper: "#ffffff",   // Card/Component background
            },
            text: {
                primary: "#000000", // Default text color
            },
        },
        typography: {
            fontFamily: "'Lato', sans-serif", // Global font
            h1: {
                fontWeight: "600",
                fontSize: "3rem",
                color: "#252856",
                textAlign: "center",
            },
        },
    });

    return (
        // Provide the custom theme to all Material-UI components
        <ThemeProvider theme={theme}>
            {/* Normalize and reset browser styles */}
            <CssBaseline />

            {/* Main container with padding */}
            <Container maxWidth="lg" sx={{ paddingTop: 4 }}>

                {/* App header with logo and title */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginBottom: 2 }}
                >
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        style={{ width: 60, height: 60, marginRight: 10 }}
                    />
                    <Typography variant="h1" gutterBottom>
                        Translator Pseudokodu
                    </Typography>
                </Box>

                {/* Main content area with the Translator component */}
                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                    <Grid item xs={12}>
                        <Translator
                            selectedLanguage={selectedLanguage}
                            setSelectedLanguage={setSelectedLanguage}
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
