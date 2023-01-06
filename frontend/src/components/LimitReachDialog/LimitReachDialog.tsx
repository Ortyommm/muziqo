import React, { useEffect, useState } from "react";
import { eventBus, EventsEnum } from "@/utils/eventBus";
import { Dialog, DialogTitle } from "@mui/material";

function LimitReachDialog() {
  const [open, setOpen] = useState(false);
  function onLimitReach() {
    setOpen(true);
  }

  useEffect(() => {
    eventBus.on(EventsEnum.limitReach, onLimitReach);
    return () => eventBus.off(EventsEnum.limitReach, onLimitReach);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogTitle>You have reached the time limit for today!</DialogTitle>
    </Dialog>
  );
}

export default LimitReachDialog;
