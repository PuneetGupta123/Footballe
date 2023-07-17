import React from "react";
import Grid from "@mui/material/Grid";
import { Topbar } from "./topbar/Topbar";
import { QuestionCard } from "./questionCard/QuestionCard";
import { HintSection } from "./hintSection/HintSection";

function App() {
  return (
    <div>
      <Topbar />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <QuestionCard />
        </Grid>
        <Grid item xs={4}>
          <HintSection />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
