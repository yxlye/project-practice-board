import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import logo from "../../public/tms_logo.png";
import Page from "../components/Page";

function HomePage() {
  return (
    <Page title="Home">
      <Box display="flex" sx={{ justifyContent: "center", alignItems: "center", height: "85vh" }}>
        <Box flex-direction="column">
          <Box display="flex" sx={{ justifyContent: "center", alignItems: "center" }}>
            <img src={logo} width={150} height={150} alt="Logo" />
          </Box>
          <Typography variant="h2" sx={{ textAlign: "center", m: "2rem" }}>
            Task Management
          </Typography>
          <Typography variant="h2" sx={{ textAlign: "center", m: "2rem" }}>
            System
          </Typography>
        </Box>
      </Box>
    </Page>
  );
}

export default HomePage;
