import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { ModulesNav } from "@/modules/modules/presentation/components/ModulesNav";
import { APP_NAME } from "@/app/config/constants";
import { fixtures } from "@/core/domain/domain.fixtures";
import { routePaths } from "@/app/routes/routePaths";
import { getStoredSession } from "@/modules/auth/infra/mockAuth";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import type { Card as CardEntity, JsonValue } from "@/core/domain/domain.contracts";

const isRecord = (value: JsonValue | null | undefined): value is Record<string, JsonValue> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const summarizeInputs = (card: CardEntity) => {
  const inputs = card.cardData?.inputs;
  if (!isRecord(inputs)) {
    return "Sem inputs definidos";
  }
  const entries = Object.entries(inputs).slice(0, 2);
  if (entries.length === 0) {
    return "Sem inputs definidos";
  }
  return entries
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" • ");
};

export const BoardKanbanPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const sessionSnapshot = useMemo(() => getStoredSession(), []);

  useEffect(() => {
    setIsSessionChecked(true);
  }, []);

  useEffect(() => {
    if (isSessionChecked && !sessionSnapshot) {
      navigate(routePaths.login, { replace: true });
    }
  }, [isSessionChecked, navigate, sessionSnapshot]);

  const board = useMemo(
    () => fixtures.boards.find((item) => item.id === boardId),
    [boardId]
  );

  const moduleNode = useMemo(
    () => fixtures.moduleNodes.find((node) => node.boardId === boardId),
    [boardId]
  );

  const moduleInfo = useMemo(
    () => fixtures.modules.find((module) => module.id === moduleNode?.moduleId),
    [moduleNode]
  );

  const columns = useMemo(
    () => fixtures.columns.filter((column) => column.boardId === boardId),
    [boardId]
  );

  const cards = useMemo(
    () => fixtures.cards.filter((card) => card.boardId === boardId),
    [boardId]
  );

  const labelsById = useMemo(() => {
    const map = new Map(fixtures.labels.map((label) => [label.id, label]));
    return map;
  }, []);

  const header = (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="baseline">
      <Box>
        <Typography variant="h2" component="span">
          {APP_NAME}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moduleInfo?.name ?? "Módulo"} &bull; {board?.name ?? "Board"}
        </Typography>
      </Box>
      <Box marginLeft="auto">
        <Typography variant="body2" color="text.secondary">
          Visualização Kanban (somente leitura)
        </Typography>
      </Box>
    </Stack>
  );

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {board?.name ?? "Board"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {board?.description ?? "Resumo das colunas e cards disponíveis no fluxo."}
        </Typography>
      </Box>

      {columns.length === 0 ? (
        <Box padding={3} bgcolor="background.paper" borderRadius={2}>
          <Typography variant="body1">Nenhuma coluna configurada para este board.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} alignItems="flex-start">
          {columns.map((column) => {
            const columnCards = cards.filter((card) => card.columnId === column.id);
            return (
              <Grid item xs={12} md={4} key={column.id}>
                <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="h6">{column.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {columnCards.length} card(s)
                        </Typography>
                      </Box>
                      {columnCards.length === 0 ? (
                        <Box padding={2} bgcolor="background.default" borderRadius={2}>
                          <Typography variant="body2" color="text.secondary">
                            Sem cards nesta coluna.
                          </Typography>
                        </Box>
                      ) : (
                        <Stack spacing={2}>
                          {columnCards.map((card) => (
                            <Card
                              key={card.id}
                              elevation={0}
                              sx={{ border: "1px solid", borderColor: "divider" }}
                            >
                              <CardContent>
                                <Stack spacing={1}>
                                  <Typography variant="subtitle1">Card {card.id}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {summarizeInputs(card)}
                                  </Typography>
                                  {card.labels && card.labels.length > 0 ? (
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                      {card.labels.map((labelId) => {
                                        const label = labelsById.get(labelId);
                                        return label ? (
                                          <Chip key={label.id} label={label.name} size="small" />
                                        ) : null;
                                      })}
                                    </Stack>
                                  ) : (
                                    <Typography variant="caption" color="text.secondary">
                                      Sem labels atribuídas
                                    </Typography>
                                  )}
                                </Stack>
                              </CardContent>
                            </Card>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );

  if (!isSessionChecked) {
    return <LoadingState />;
  }

  return (
    <PageLayout
      header={header}
      nav={<ModulesNav activePath={routePaths.modules} />}
      content={content}
    />
  );
};
