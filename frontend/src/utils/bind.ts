import React, { ChangeEvent } from "react";

export const textFieldBind = (
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  return {
    value: state,
    onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      if (!event.target) return;
      setState((event.target as HTMLInputElement).value);
    },
  };
};
