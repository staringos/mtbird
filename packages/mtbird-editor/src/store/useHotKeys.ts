import { useState, useEffect } from "react";
import { IContext } from "./types";
import hotkeys from "hotkeys-js";

const useHotKeys = (context: IContext) => {
  const [hasHotKeyRegistered, setHotKeyRegistered] = useState(false);

  const handleHotKey = (event: any, handler: any) => {
    switch (handler.key) {
      case "delete":
      case "backspace":
        context.actions.deleteComponent();
        break;
      case "left":
        context.actions.moveComponent(-10, 0);
        event.preventDefault();
        break;
      case "right":
        context.actions.moveComponent(10, 0);
        event.preventDefault();
        break;
      case "top":
        context.actions.moveComponent(0, -10);
        event.preventDefault();
        break;
      case "bottom":
        context.actions.moveComponent(0, 10);
        event.preventDefault();
        break;
      case "ctrl+z":
      case "command+z":
        context.actions.prevStep();
        break;
      case "ctrl+shift+z":
      case "command+shift+z":
        context.actions.nextStep();
        break;
    }
  };

  const registerHotkeys = () => {
    hotkeys.unbind();
    hotkeys(
      "ctrl+s,command+s,ctrl+shift+z,command+shift+z,ctrl+a,command+a,ctrl+c,command+c,command+shift+c,command+shift+v,ctrl+v,command+v,ctrl+z,command+z,delete,backspace,esc,up,down,left,right",
      handleHotKey
    );
    setHotKeyRegistered(true);
  };

  useEffect(() => {
    registerHotkeys();
  }, [context.state.currentComponent]);

  useEffect(
    () => () => {
      hotkeys.unbind();
    },
    []
  );

  return hasHotKeyRegistered;
};

export default useHotKeys;
