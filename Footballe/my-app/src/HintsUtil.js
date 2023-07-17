const initialHints = [
  {
    disabled: false,
    locked: true,
  },
  {
    disabled: true,
    locked: true,
  },
  {
    disabled: true,
    locked: true,
  },
];

export const initLocalStorageWithHintsState = () => {
  localStorage.setItem("hintsState", JSON.stringify(initialHints));
};

export const getHintsStateFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("hintsState"));
};

export const removeHintsStateFromLocalStorage = () => {
  localStorage.removeItem("hintsState");
};

export const updateHintsStateInLocalStorage = (hints) => {
  console.log(hints);
  localStorage.setItem("hintsState", JSON.stringify(hints));
};
