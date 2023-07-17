// React imports
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FlagIcon from "@mui/icons-material/Flag";
import IconButton from "@mui/material/IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Modal from "@mui/material/Modal";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Typography from "@mui/material/Typography";

import {
  dismissHint,
  fetchHints,
  selectHint,
} from "../features/hints/hintsSlice";

import {
  isDateInLocalStorageTodayDate,
  addTodayDateToLocalStorage,
  removeDateFromLocalStorage,
} from "../DateUtils";

import {
  initLocalStorageWithHintsState,
  getHintsStateFromLocalStorage,
  removeHintsStateFromLocalStorage,
  updateHintsStateInLocalStorage,
} from "../HintsUtil";

import { modalStyle } from "../CssUtils";

export function HintSection() {
  const hintFromServer = useSelector(selectHint);
  const dispatch = useDispatch();

  const onClick = (id) => {
    // Cache the hint clicked
    setSelectedHint(id);

    // open the confirmation dialog to access hint
    if (hints[id].locked) handleOpen();
    else dispatch(fetchHints(id));
  };

  const onAccessHint = (id) => {
    // dispatch to get hint
    dispatch(fetchHints(id));
    // close the confirmation dialog
    handleClose();
    // update the hints state
    setHints(
      hints.map((hint) => {
        if (hint.id === id + 1) {
          return { ...hint, disabled: false };
        }

        if (hint.id === id) {
          return { ...hint, locked: false };
        }

        return hint;
      })
    );

    updateHintsStateInLocalStorage(
      hints.map((hint) => {
        if (hint.id === id + 1) {
          return { locked: hint.locked, disabled: false };
        }

        if (hint.id === id) {
          return { disabled: hint.disabled, locked: false };
        }

        return { disabled: hint.disabled, locked: hint.locked };
      })
    );
  };

  if (!isDateInLocalStorageTodayDate()) {
    removeDateFromLocalStorage();
    removeHintsStateFromLocalStorage();
    addTodayDateToLocalStorage();
    initLocalStorageWithHintsState();
  }

  var hintsState = getHintsStateFromLocalStorage();

  const initialHints = [
    {
      id: 0,
      text: "Last Club of the player",
      image: <SportsSoccerIcon />,
      disabled: hintsState[0].disabled,
      locked: hintsState[0].locked,
    },
    {
      id: 1,
      text: "Country of the player",
      image: <FlagIcon />,
      disabled: hintsState[1].disabled,
      locked: hintsState[1].locked,
    },
    {
      id: 2,
      text: "Surprise Hint",
      image: <LightbulbIcon />,
      disabled: hintsState[2].disabled,
      locked: hintsState[2].locked,
    },
  ];

  // Hints Specific state
  const [hints, setHints] = useState(initialHints);
  const [selectedHint, setSelectedHint] = useState(0);

  // Modal Specific state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(hintFromServer);

  return (
    <div>
      <Card sx={{ mt: 5, mr: 5 }} variant="outlined">
        <CardContent>
          <List
            sx={{ bgcolor: "background.paper" }}
            component="nav"
            subheader={<ListSubheader component="div">Hints</ListSubheader>}
          >
            {hints.map((hint) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => onClick(hint.id)}
                      disabled={hint.disabled}
                    >
                      {hint.locked ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                  }
                  key={hint.id}
                >
                  <ListItemIcon>{hint.image}</ListItemIcon>
                  <ListItemText primary={hint.text} />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
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
            Do you really want to access the hint?
          </Typography>
          <Divider sx={{ textAlign: "center" }} />
          <Button
            variant="contained"
            sx={{ flexGrow: 1, mt: 2, ml: 20 }}
            color="info"
            onClick={() => {
              handleClose();
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            sx={{ flexGrow: 1, mt: 2, ml: 2, mr: 2 }}
            color="warning"
            onClick={() => {
              onAccessHint(selectedHint);
            }}
          >
            Access Hint
          </Button>
        </Box>
      </Modal>

      <Modal
        open={hintFromServer.hint.length > 0}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
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
            {hintFromServer.hint}
          </Typography>
          <Divider sx={{ textAlign: "center" }} />
          <Button
            variant="contained"
            sx={{ flexGrow: 1, mt: 2, ml: 20 }}
            color="info"
            onClick={() => {
              dispatch(dismissHint());
            }}
          >
            Dismiss
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
