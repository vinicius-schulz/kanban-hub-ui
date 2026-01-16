import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        py: 6,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {message ?? "Carregando..."}
      </Typography>
    </Box>
  );
};
