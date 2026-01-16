import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

type HealthCardProps = {
  data: HealthStatus;
};

export const HealthCard = ({ data }: HealthCardProps) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h3">Status do serviço</Typography>
            <Chip
              label={data.status.toUpperCase()}
              color={data.status === "ok" ? "success" : "warning"}
              size="small"
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Última verificação: {new Date(data.timestamp).toLocaleString("pt-BR")}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
