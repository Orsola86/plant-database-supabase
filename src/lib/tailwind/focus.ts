const focusStyle = {
  ".--focus-style": {
    "@apply focus-visible:outline focus-visible:outline-[0.6rem] focus-visible:outline-offset-0 focus-visible:outline-red-900":
      {},
  },
  ".--link-overlay": {
    "@apply --focus-style absolute inset-0 overflow-hidden whitespace-nowrap":
      {},
  },
};

export default focusStyle;
