import { configureStore } from "@reduxjs/toolkit";
import footballersReducer from "../features/footballers/footballerSlice";
import hintsReducer from "../features/hints/hintsSlice";
export const store = configureStore({
  reducer: {
    footballers: footballersReducer,
    hints: hintsReducer,
  },
});
