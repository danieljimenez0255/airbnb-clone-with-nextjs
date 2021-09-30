export const handleClick = (e, refs, setActiveBorder, setPhoneInput) => {
  if (refs?.one && refs.two) {
    if (!refs?.one?.contains(e.target) && !refs?.two?.contains(e.target)) {
      setActiveBorder(0);
      setPhoneInput(false);
    }
    return;
  } else {
    if (!refs?.three?.contains(e.target)) {
      setActiveBorder(0);
      setPhoneInput(false);
    }
    return;
  }
};

export const listScroll = (e, activeBorder, setScrollCheck) => {
  if (window.scrollY > 100 && activeBorder === 1) {
    setScrollCheck(false);
  } else {
    setScrollCheck(true);
  }
};

export const checkMouse = (e) => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  e?.target?.style?.setProperty("--x", x + "px");
  e?.target?.style?.setProperty("--y", y + "px");
};
