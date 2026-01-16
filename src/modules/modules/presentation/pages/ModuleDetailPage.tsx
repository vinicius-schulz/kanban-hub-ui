import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { ModulesNav } from "@/modules/modules/presentation/components/ModulesNav";
import { APP_NAME } from "@/app/config/constants";
import { fixtures } from "@/core/domain/domain.fixtures";
import { routePaths } from "@/app/routes/routePaths";
import { getStoredSession } from "@/modules/auth/infra/mockAuth";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import type { ModuleNode } from "@/core/domain/domain.contracts";

export const ModuleDetailPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
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

  const moduleInfo = useMemo(
    () => fixtures.modules.find((module) => module.id === moduleId),
    [moduleId]
  );

  const moduleNodes = useMemo(
    () => fixtures.moduleNodes.filter((node) => node.moduleId === moduleId),
    [moduleId]
  );

  const nodesByParent = useMemo(() => {
    const map = new Map<string | null, ModuleNode[]>();
    moduleNodes.forEach((node) => {
      const parentKey = node.parentId ?? null;
      const bucket = map.get(parentKey) ?? [];
      bucket.push(node);
      map.set(parentKey, bucket);
    });
    return map;
  }, [moduleNodes]);

  const renderNodes = (parentId: string | null, depth = 0) => {
    const nodes = nodesByParent.get(parentId) ?? [];
    return nodes.map((node) => {
      const boardId = node.boardId ?? null;
      const children = nodesByParent.get(node.id) ?? [];
      return (
        <Box key={node.id} marginLeft={depth * 2} marginTop={1}>
          {boardId ? (
            <ListItemButton
              component="button"
              onClick={() =>
                navigate(
                  generatePath(routePaths.boardKanban, {
                    boardId
                  })
                )
              }
              sx={{ borderRadius: 1 }}
            >
              <ListItemText primary={node.name} secondary="Abrir board" />
            </ListItemButton>
          ) : (
            <ListItemButton disabled sx={{ borderRadius: 1 }}>
              <ListItemText primary={node.name} secondary="Grupo" />
            </ListItemButton>
          )}
          {children.length > 0 ? <List disablePadding>{renderNodes(node.id, depth + 1)}</List> : null}
        </Box>
      );
    });
  };

  const header = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h2" component="span">
        {APP_NAME}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Detalhe do módulo
      </Typography>
    </Stack>
  );

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {moduleInfo?.name ?? "Módulo"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moduleInfo?.description ??
            "Selecione um item da árvore para abrir o board correspondente."}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">Árvore do módulo</Typography>
                <Typography variant="body2" color="text.secondary">
                  Navegue pela estrutura até encontrar o board desejado.
                </Typography>
                <Divider />
                {moduleNodes.length === 0 ? (
                  <Box padding={2} bgcolor="background.default" borderRadius={2}>
                    <Typography variant="body2">Nenhuma estrutura disponível.</Typography>
                  </Box>
                ) : (
                  <List disablePadding>{renderNodes(null)}</List>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6">Contexto do módulo</Typography>
                <Typography variant="body2" color="text.secondary">
                  Boards do módulo podem ter colunas e cards diferentes. Escolha um board na árvore para
                  visualizar o Kanban em modo leitura.
                </Typography>
                <Box padding={2} bgcolor="background.default" borderRadius={2}>
                  <Typography variant="body2">
                    Dica: os boards disponíveis aparecem com o texto “Abrir board”.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
