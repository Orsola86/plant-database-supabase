const gridStyles = {
  ".default-grid-gap": {
    gap: "0.8rem",
    "@screen md": { gap: "1.6rem" },
    "@screen lg": { gap: "3.2rem" },
  },

  ".default-grid": {
    "@apply default-grid-gap": {},
    display: "grid",
    height: "100%",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  },

  ".default-grid-y-gap": {
    "@apply default-grid": {},
    rowGap: "4rem",
  },
};

export default gridStyles;
