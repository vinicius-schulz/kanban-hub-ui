import { Box, Container, Typography } from "@mui/material";
import React from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const PageLayout = ({ title, subtitle, children }: PageLayoutProps) => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {children}
    </Container>
  );
};
