import { useMediaQuery, useTheme } from "@mui/material";

const useFooterHeight = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.values.sm}px)`
  );
  return isDesktop ? 64 : 150;
};

export default useFooterHeight;
