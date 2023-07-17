// React imports
import * as React from "react";
import { useState } from "react";
import axios from "axios";

// MUI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { modalStyle } from "../CssUtils";

const initialFValues = {
  footballerName: "",
};

export function Form() {
  const [values, setValues] = useState(initialFValues);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const response = await axios.post(
        "https://353a-130-248-113-29.ngrok-free.app/api/v1/result",
        values
      );
      const data = await response.data;
      setShowResult(true);
      if (data.correct === "true") {
        setResult(true);
      } else {
        setResult(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="outlined-start-adornment"
          label="Your Answer here"
          name="footballerName"
          value={values.footballerName}
          onChange={handleInputChange}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Footballer Name</InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          sx={{ flexGrow: 1, ml: 5 }}
        >
          Submit
        </Button>
      </form>

      <Modal
        open={showResult}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            {result ? "Hell Yeah" : "Hell No"}
          </Typography>
          <Divider sx={{ textAlign: "center" }} />
          <Button
            variant="contained"
            sx={{ flexGrow: 1, mt: 2, ml: 20 }}
            color="info"
            onClick={() => {
              setShowResult(false);
              setResult(false);
            }}
          >
            Dismiss
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
