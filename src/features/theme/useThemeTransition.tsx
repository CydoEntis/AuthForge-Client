import { startTransition as reactStartTransition } from "react";

export const useThemeTransition = () => {
  return {
    startTransition: reactStartTransition,
  };
};
