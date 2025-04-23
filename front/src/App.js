import React, { useState } from "react";
import { CssBaseline, Container, Grid, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Translator from "./components/Translator";
import { blueGrey } from "@mui/material/colors";

function App() {
    // Stan przechowujący aktualnie wybrany język programowania
    const [selectedLanguage, setSelectedLanguage] = useState("python");

    // Definicja motywu aplikacji z wykorzystaniem Material-UI
    const theme = createTheme({
        palette: {
            mode: "light", // Tryb jasny
            primary: {
                main: "#252856", // Główny kolor aplikacji
            },
            secondary: {
                main: blueGrey[500], // Kolor dodatkowy
            },
            background: {
                default: "#f5f5f5", // Kolor tła aplikacji
                paper: "#ffffff", // Kolor tła dla komponentów
            },
            text: {
                primary: "#000000", // Kolor tekstu
            },
        },
        typography: {
            fontFamily: "'Lato', sans-serif", // Czcionka aplikacji
            h1: {
                fontWeight: "600", // Waga czcionki nagłówka
                fontSize: "3rem", // Rozmiar czcionki nagłówka
                color: "#252856", // Kolor nagłówka
                textAlign: "center", // Wyśrodkowanie nagłówka
            },
        },
    });

    return (
        // Udostępnienie motywu aplikacji dla komponentów
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Resetowanie domyślnych styli przeglądarki */}
            <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
                {/* Nagłówek aplikacji z logo */}
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: 2 }}>
                    <img src="/images/logo.png" alt="Logo" style={{ width: 60, height: 60, marginRight: 10 }} />
                    <Typography variant="h1" gutterBottom>
                        Translator Pseudokodu
                    </Typography>
                </Box>

                {/* Główny komponent aplikacji - Translator */}
                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                    <Grid item xs={12}>
                        <Translator selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
