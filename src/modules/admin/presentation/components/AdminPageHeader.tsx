import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { APP_NAME } from "@/app/config/constants";
import { getStoredSession } from "@/modules/auth/infra/mockAuth";

type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
};

export const AdminPageHeader = ({ title, subtitle }: AdminPageHeaderProps) => {
  const sessionSnapshot = useMemo(() => getStoredSession(), []);

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
      <Box flex={1}>
        <Typography variant="h2" component="span">
          {APP_NAME}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      <Box textAlign={{ xs: "left", md: "right" }}>
        <Typography variant="body2" color="text.secondary">
          Sessão ativa
        </Typography>
        <Typography variant="subtitle2">
          {sessionSnapshot?.user.username ?? "admin"}
        </Typography>
      </Box>
    </Stack>
  );
};
