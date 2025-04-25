import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

/**
 * LanguageSelector component allows the user to select the target programming language
 * for pseudocode translation. It supports Python and Java options.
 *
 * Props:
 * - selectedLanguage (string): currently selected language
 * - setSelectedLanguage (function): function to update the selected language
 */
const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
    return (
        // Wrapper for the dropdown list styled using MUI
        <FormControl fullWidth>
            {/* Dropdown label */}
            <InputLabel id="language-select-label" sx={{ color: "#003366" }}>
                Wybierz język
            </InputLabel>

            {/* Language dropdown menu */}
            <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedLanguage} // current selected value
                onChange={(e) => setSelectedLanguage(e.target.value)} // updates selected language
                label="Wybierz język"
                sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    padding: "10px 15px",
                    color: "#000",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#003366", // outline color
                    },
                    "& .MuiSelect-icon": {
                        color: "#003366", // dropdown icon color
                    },
                }}
            >
                {/* Python option */}
                <MenuItem value="python">
                    <Box display="flex" alignItems="center">
                        <img src="/images/python.png" alt="Python" style={{ width: 20, marginRight: 10 }} />
                        Python
                    </Box>
                </MenuItem>

                {/* Java option */}
                <MenuItem value="java">
                    <Box display="flex" alignItems="center">
                        <img src="/images/java.png" alt="Java" style={{ width: 20, marginRight: 10 }} />
                        Java
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
