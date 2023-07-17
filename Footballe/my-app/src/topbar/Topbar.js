// React imports
import React from "react";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Topbar() {
  const handleOpen = () => console.log("Hello");

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={handleOpen}
            >
              <InfoIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Footballe
            </Typography>
            <IconButton size="large" edge="start" color="inherit">
              <QueryStatsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
