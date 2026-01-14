import { Alert, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/app/store/typedHooks";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import { HealthCard } from "@/modules/healthcheck/presentation/components/HealthCard";
import {
  setLastCheckedAt,
} from "@/modules/healthcheck/presentation/state/healthSlice";
import { useGetHealthStatusQuery } from "@/modules/healthcheck/presentation/state/healthApi";

export const HealthPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useGetHealthStatusQuery();

  useEffect(() => {
    if (data?.timestamp) {
      dispatch(setLastCheckedAt(data.timestamp));
    }
  }, [data, dispatch]);

  return (
    <PageLayout
      title="Healthcheck"
      subtitle="Smoke test do boilerplate com RTK Query e MUI."
    >
      <Stack spacing={3}>
        {isLoading && <LoadingState message="Consultando /health..." />}
        {isError && (
          <Alert severity="error">
            Erro ao consultar status{error ? ": " + JSON.stringify(error) : "."}
          </Alert>
        )}
        {data && <HealthCard data={data} />}
      </Stack>
    </PageLayout>
  );
};
