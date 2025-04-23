import React from "react";
import { Box, Paper } from "@mui/material";

// Komponent OutputBox przyjmuje właściwość outputCode i wyświetla ją w sformatowanym bloku
const OutputBox = ({ outputCode }) => {
    return (
        // Główny kontener, który centruje zawartość i dodaje margines górny
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
            {/* Papierowy kontener z zaokrąglonymi rogami i cieniem dla lepszego wyglądu */}
            <Paper sx={{ p: 3, width: "100%", maxWidth: 800, textAlign: "center", bgcolor: "#ffffff", borderRadius: 2 }} elevation={3}>
                {/* Wewnętrzne pudełko zawierające kod, z tłem i zaokrąglonymi rogami */}
                <Box sx={{ backgroundColor: "#f0f0f0", p: 2, borderRadius: 1 }}>
                    <pre>{outputCode}</pre> {/* Wyświetlanie kodu w formacie pre */}
                </Box>
            </Paper>
        </Box>
    );
};

export default OutputBox;
