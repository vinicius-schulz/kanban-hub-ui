import { Box, CircularProgress, Typography } from "@mui/material";

type LoadingStateProps = {
  label?: string;
};

export const LoadingState = ({ label = "Carregando..." }: LoadingStateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={6}
      gap={2}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};
