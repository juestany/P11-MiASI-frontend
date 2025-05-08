import React from "react";
import { Box, Paper } from "@mui/material";

/**
 * OutputBox component is responsible for displaying the translated code
 * in a stylized and scrollable container. It ensures proper formatting
 * by using a <pre> block to preserve indentation and line breaks.
 *
 * Props:
 * - outputCode (string): the translated code to be displayed
 */
const OutputBox = ({ outputCode }) => {
    return (
        // Outer container that centers the content and adds spacing at the top
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
            {/* Paper component provides a styled card-like box with padding and border radius */}
            <Paper
                sx={{
                    p: 3,
                    width: "100%",
                    maxWidth: 800,
                    textAlign: "left", // Left-align to preserve code structure
                    bgcolor: "#ffffff",
                    borderRadius: 2,
                    fontFamily: "monospace", // Use monospaced font for code readability
                    overflowX: "auto", // Horizontal scroll if code is too wide
                }}
                elevation={3}
            >
                {/* Inner box with background for the code content */}
                <Box sx={{backgroundColor: "#f0f0f0", p: 2, borderRadius: 1}}>
                    {/* Render the code with preserved spacing and indentation */}
                    <pre style={{backgroundColor: "#f0f0f0"}}>
  {outputCode.split("\n").map((line, i) => (
      <div key={i}>
          <span style={{color: "gray"}}>{line.replace(/ /g, "·")}</span>
      </div>
  ))}
</pre>


                </Box>
            </Paper>
        </Box>
    );
};

export default OutputBox;
