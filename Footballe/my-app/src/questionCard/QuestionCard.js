// React imports
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// MUI imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// Code imports
import {
  fetchFootballers,
  selectFootballers,
} from "../features/footballers/footballerSlice";
import { Form } from "../form/Form";

export function QuestionCard() {
  // define selector and instance of dispatch function
  const footballers = useSelector(selectFootballers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFootballers());
  }, [dispatch]);

  return (
    <div>
      <Card
        sx={{ minWidth: 275, m: 5, maxHeight: 600, overflow: "auto" }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Identify the football player who has played with all these
            footballers :
          </Typography>
          <ul>
            {footballers.map((items, i) => {
              return (
                <div key={i}>
                  {items.map((item, j) => {
                    return (
                      <li key={j}>
                        <Link href={item.link} target="_blank">
                          {item.footballerName}
                        </Link>
                        <br />
                      </li>
                    );
                  })}
                </div>
              );
            })}
          </ul>
        </CardContent>
      </Card>
      <Box sx={{ flexGrow: 1, m: 5 }}>
        <Form />
      </Box>
    </div>
  );
}
