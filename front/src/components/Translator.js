import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { CloudUpload, FileDownload } from "@mui/icons-material";
import LanguageSelector from "./LanguageSelector";
import OutputBox from "./OutputBox";

// Komponent Translator umożliwia tłumaczenie pseudokodu na wybrany język programowania
const Translator = ({ selectedLanguage, setSelectedLanguage }) => {
    const [inputCode, setInputCode] = useState(""); // Stan przechowujący wprowadzony pseudokod
    const [outputCode, setOutputCode] = useState(""); // Stan przechowujący przetłumaczony kod
    const [fileFormat, setFileFormat] = useState("txt"); // Stan określający format pliku do pobrania

    // Ustawienie formatu pliku w zależności od wybranego języka
    useEffect(() => {
        setFileFormat(getFileExtension(selectedLanguage));
    }, [selectedLanguage]);

    // Funkcja zwracająca odpowiednie rozszerzenie pliku dla wybranego języka
    function getFileExtension(language) {
        if (language === "python") return "py";
        if (language === "java") return "java";
        return "txt";
    }

    // Obsługa wczytywania pliku tekstowego z pseudokodem
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputCode(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    // Funkcja tłumacząca pseudokod na wybrany język
    const translateCode = () => {
        let translatedCode = "";
        if (selectedLanguage === "python") {
            translatedCode = "# Python Code\nprint('Hello, world!')";
        } else if (selectedLanguage === "java") {
            translatedCode = "// Java Code\nSystem.out.println('Hello, world!');";
        } 
        setOutputCode(translatedCode);
    };

    // Funkcja umożliwiająca pobranie przetłumaczonego kodu jako pliku
    const downloadFile = () => {
        const blob = new Blob([outputCode], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `translated_code.${fileFormat}`;
        link.click();
    };

    // Obsługa zmiany formatu pliku
    const handleFormatChange = (event) => {
        setFileFormat(event.target.value);
    };

    return (
        // Główny kontener komponentu
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#f5f5f5", p: 2 }}>
            <Paper sx={{ p: 3, width: "100%", maxWidth: 800, textAlign: "center", bgcolor: "#ffffff", borderRadius: 2 }} elevation={3}>

                {/* Pole do wpisania pseudokodu oraz przycisk Załaduj plik */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <TextField
                        label="Wpisz pseudokod"
                        multiline
                        fullWidth
                        rows={6}
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        sx={{ mt: 3, backgroundColor: "#f0f0f0", borderRadius: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        sx={{
                            mt: 3,
                            ml: 2,
                            background: "#252856",
                            "&:hover": { background: "#003366" },
                            whiteSpace: "nowrap",
                            width: "35%",
                            borderRadius: "20px",
                        }}
                    >
                        <CloudUpload sx={{ mr: 1 }} />
                        Załaduj plik
                        <input type="file" accept=".txt" onChange={handleFileUpload} hidden />
                    </Button>
                </Box>

                {/* Wybór języka i przycisk Tłumacz */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                    <FormControl fullWidth sx={{ width: "71%" }}>
                        <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={translateCode}
                        sx={{
                            width: "26%",
                            borderRadius: "20px",
                            padding: "7px 20px",
                            background: "#252856",
                            "&:hover": { background: "#003366" },
                        }}
                    >
                        Tłumacz
                    </Button>
                </Box>

                {/* Wyjściowe pole z przetłumaczonym kodem */}
                <OutputBox outputCode={outputCode} />

                {/* Wybór formatu pliku i przycisk pobierania */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                    <FormControl fullWidth sx={{ width: "30%" }}>
                        <InputLabel id="file-format-label">Wybierz format pliku</InputLabel>
                        <Select
                            labelId="file-format-label"
                            id="file-format-select"
                            value={fileFormat}
                            onChange={handleFormatChange}
                            label="Wybierz format pliku"
                        >
                            {selectedLanguage === "python" && <MenuItem value="py">.py</MenuItem>}
                            {selectedLanguage === "java" && <MenuItem value="java">.java</MenuItem>}
                            <MenuItem value="txt">.txt</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={downloadFile}
                        sx={{
                            ml: 2,
                            borderRadius: "30px",
                            padding: "10px 20px",
                            background: "#252856",
                            "&:hover": { background: "#003366" },
                        }}
                        disabled={!outputCode || !fileFormat}
                    >
                        <FileDownload sx={{ mr: 1 }} />
                        Pobierz plik z kodem
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Translator;
