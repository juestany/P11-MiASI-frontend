import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

// Komponent LanguageSelector umożliwia wybór języka programowania
const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
    return (
        // Kontrolka formularza dla rozwijanego menu
        <FormControl fullWidth>
            {/* Etykieta dla listy rozwijanej */}
            <InputLabel id="language-select-label" sx={{ color: "#003366" }}>
                Wybierz język
            </InputLabel>
            {/* Lista rozwijana Select */}
            <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedLanguage} // Aktualnie wybrany język
                onChange={(e) => setSelectedLanguage(e.target.value)} // Aktualizacja wyboru języka
                label="Wybierz język"
                sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    padding: "10px 15px",
                    color: "#000",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#003366", // Kolor obramowania
                    },
                    "& .MuiSelect-icon": {
                        color: "#003366", // Kolor ikony strzałki
                    },
                }}
            >
                {/* Opcja wyboru języka Python */}
                <MenuItem value="python">
                    <Box display="flex" alignItems="center">
                        <img src="/images/python.png" alt="Python" style={{ width: 20, marginRight: 10 }} />
                        Python
                    </Box>
                </MenuItem>
                {/* Opcja wyboru języka Java */}
                <MenuItem value="java">
                    <Box display="flex" alignItems="center">
                        <img src="/images/java.png" alt="Java" style={{ width: 20, marginRight: 10 }} />
                        Java
                    </Box>
                </MenuItem>
                {/* Opcja wyboru języka C */}
                <MenuItem value="c">
                    <Box display="flex" alignItems="center">
                        <img src="/images/c.png" alt="C" style={{ width: 20, marginRight: 10 }} />
                        C
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
