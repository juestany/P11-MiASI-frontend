import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Box,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
    Tooltip,
} from "@mui/material";
import { CloudUpload, FileDownload, ContentCopy } from "@mui/icons-material";
import LanguageSelector from "./LanguageSelector";

/**
 * Translator component allows users to:
 * - input or upload pseudocode
 * - select the target programming language
 * - translate pseudocode using the backend (Spring Boot + ANTLR)
 * - display the translated code
 * - copy or download the result
 *
 * Props:
 * - selectedLanguage (string): current language selection (e.g., 'python' or 'java')
 * - setSelectedLanguage (function): updates the selected language
 */
const Translator = ({ selectedLanguage, setSelectedLanguage }) => {
    const [inputCode, setInputCode] = useState("");         // User's pseudocode input
    const [outputCode, setOutputCode] = useState("");       // Translated output from backend
    const [fileFormat, setFileFormat] = useState("txt");    // Selected file download format
    const [errorMessage, setErrorMessage] = useState("");   // Error message displayed in UI
    const [copySuccess, setCopySuccess] = useState("");     // Temporary message after copying code

    // Automatically update file extension when language changes
    useEffect(() => {
        setFileFormat(getFileExtension(selectedLanguage));
    }, [selectedLanguage]);

    // Returns file extension based on selected programming language
    function getFileExtension(language) {
        if (language === "python") return "py";
        if (language === "java") return "java";
        return "txt";
    }

    /**
     * Handles uploaded file from the user.
     * Validates format and updates inputCode.
     */
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== "text/plain") {
            setErrorMessage("Nieprawidłowy format pliku. Wgraj plik tekstowy (.txt).");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result.trim();
            if (!content) {
                setErrorMessage("Wgrany plik jest pusty.");
            } else {
                setInputCode(content);
                setErrorMessage("");
            }
        };
        reader.readAsText(file);
    };

    /**
     * Sends pseudocode to the backend and receives translated code.
     * Validates input before sending.
     */
    const translateCode = async () => {
        if (!inputCode.trim()) {
            setErrorMessage("Wprowadź pseudokod lub załaduj plik.");
            return;
        }

        if (inputCode.length > 5000) {
            setErrorMessage("Pseudokod jest zbyt długi (maks. 5000 znaków).");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/translate?lang=${selectedLanguage}`, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: inputCode,
            });

            if (!response.ok) throw new Error("Błąd serwera");

            const translatedCode = await response.text();
            setOutputCode(translatedCode);
            setErrorMessage("");
        } catch (error) {
            console.error("Błąd:", error);
            setErrorMessage("Wystąpił błąd podczas tłumaczenia.");
        }
    };

    /**
     * Downloads the translated code as a file.
     */
    const downloadFile = () => {
        const blob = new Blob([outputCode], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `kod.${fileFormat}`;
        link.click();
    };

    /**
     * Copies the translated code to the clipboard and shows success feedback.
     */
    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputCode).then(() => {
            setCopySuccess("Skopiowano!");
            setTimeout(() => setCopySuccess(""), 2000);
        });
    };

    // Handles user selection of output file format
    const handleFormatChange = (event) => {
        setFileFormat(event.target.value);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#f5f5f5", p: 2 }}>
            <Paper sx={{ p: 3, width: "100%", maxWidth: 800, textAlign: "center", bgcolor: "#ffffff", borderRadius: 2 }} elevation={3}>

                {/* Input field and file upload */}
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
                        Wgraj plik
                        <input type="file" accept=".txt" onChange={handleFileUpload} hidden />
                    </Button>
                </Box>

                {/* Language selection and translation trigger */}
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

                {/* Error message display */}
                {errorMessage && (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Box>
                )}

                {/* Output display with copy option */}
                {outputCode && (
                    <Box sx={{ mt: 3, position: "relative" }}>
                        <Paper
                            sx={{
                                p: 3,
                                width: "100%",
                                maxWidth: 800,
                                textAlign: "left",
                                bgcolor: "#ffffff",
                                borderRadius: 2,
                                fontFamily: "monospace",
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                            }}
                            elevation={3}
                        >
                            <pre style={{ margin: 0 }}>{outputCode}</pre>
                        </Paper>
                        <Tooltip title="Skopiuj kod">
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={copyToClipboard}
                                sx={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    borderRadius: 5,
                                    padding: "2px 10px",
                                }}
                            >
                                <ContentCopy fontSize="small" sx={{ mr: 1 }} />
                                {copySuccess || "Kopiuj"}
                            </Button>
                        </Tooltip>
                    </Box>
                )}

                {/* File format selection and download */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                    <FormControl fullWidth sx={{ width: "30%" }}>
                        <InputLabel id="file-format-label">Format pliku</InputLabel>
                        <Select
                            labelId="file-format-label"
                            id="file-format-select"
                            value={fileFormat}
                            onChange={handleFormatChange}
                            label="Format pliku"
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
                        Pobierz
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Translator;
