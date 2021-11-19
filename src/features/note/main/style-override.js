export default {
  "@global": {
    "#block-menu-container": {
      // The popover of "+" button for rich markdown editor
      zIndex: 900, // need to bring up otherwise will be blocked by the note panel/modal
    },
    "#emoji-menu-container": {
      zIndex: 900,
    },
    "div[offset]": {
      // similar as the above, to bring the covered element up
      zIndex: 900,
    },
  },
};
