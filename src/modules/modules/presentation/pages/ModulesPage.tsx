import { Card, CardActionArea, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { modulesFixture } from "@/modules/modules/infra/modules.fixtures";

export const ModulesPage = () => {
  return (
    <PageLayout
      title="Módulos"
      subtitle="Escolha um módulo para continuar."
    >
      <Grid container spacing={3}>
        {modulesFixture.map((module) => (
          <Grid item xs={12} md={6} key={module.id}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={600}>
                      {module.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Acesso mock para o módulo {module.name}.
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};
