import { CONTAINER_PADDING_MAP } from "../../../src/utils/constants";

const containerStyles = {
  ".container": {
    maxWidth: "100%",
    paddingLeft: CONTAINER_PADDING_MAP.sm,
    paddingRight: CONTAINER_PADDING_MAP.sm,
    width: "100%",
    "@screen md": {
      paddingLeft: CONTAINER_PADDING_MAP.md,
      paddingRight: CONTAINER_PADDING_MAP.md,
    },
    "@screen lg": {
      paddingLeft: CONTAINER_PADDING_MAP.lg,
      paddingRight: CONTAINER_PADDING_MAP.lg,
      margin: "0 8rem",
      maxWidth: "calc(100% - 16rem)",
    },
  },
};

export default containerStyles;
