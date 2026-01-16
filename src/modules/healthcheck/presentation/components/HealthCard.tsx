import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

interface HealthCardProps {
  data: HealthStatus;
}

export const HealthCard = ({ data }: HealthCardProps) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            Status do serviço
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {data.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Última verificação: {new Date(data.timestamp).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
