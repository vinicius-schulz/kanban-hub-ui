import { Box, Breadcrumbs, Container, Link, List, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import type { ModuleId, TreeNode, TreeNodeId } from "@/modules/_shared/domain/domain.contracts";
import { BoardPlaceholder } from "@/modules/boards/presentation/components/BoardPlaceholder";
import { KanbanBoard } from "@/modules/boards/presentation/components/KanbanBoard";
import { getBoardById } from "@/modules/boards/infra/boards.fixtures";
import { getModuleTreeByModuleId } from "@/modules/modules/infra/moduleTree.fixtures";
import { modulesFixture } from "@/modules/modules/infra/modules.fixtures";

const buildChildrenMap = (nodes: TreeNode[]) => {
  return nodes.reduce<Record<string, TreeNode[]>>((acc, node) => {
    const key = node.parentId ?? "root";
    acc[key] = acc[key] ? [...acc[key], node] : [node];
    return acc;
  }, {});
};

export const ModuleDetailPage = () => {
  const { moduleId } = useParams();
  const resolvedModuleId = moduleId as ModuleId | undefined;
  const module = modulesFixture.find((item) => item.id === resolvedModuleId);
  const nodes = resolvedModuleId ? getModuleTreeByModuleId(resolvedModuleId) : [];
  const childrenMap = useMemo(() => buildChildrenMap(nodes), [nodes]);
  const [selectedNodeId, setSelectedNodeId] = useState<TreeNodeId | null>(null);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const selectedBoard = selectedNode?.boardId ? getBoardById(selectedNode.boardId) : null;

  const renderNodes = (parentId: TreeNodeId | null, depth = 0) => {
    const key = parentId ?? "root";
    const items = childrenMap[key] ?? [];
    return items.map((node) => {
      const hasBoard = Boolean(node.boardId);
      return (
        <React.Fragment key={node.id}>
          <ListItemButton
            sx={{ pl: 2 + depth * 2 }}
            selected={node.id === selectedNodeId}
            onClick={() => hasBoard && setSelectedNodeId(node.id)}
          >
            <ListItemText
              primary={node.name}
              secondary={hasBoard ? "Board disponível" : "Grupo"}
            />
          </ListItemButton>
          {renderNodes(node.id, depth + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link component={RouterLink} underline="hover" color="inherit" to={routePaths.modules}>
              Módulos
            </Link>
            <Typography color="text.primary">{module?.name ?? "Módulo"}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {module?.name ?? "Módulo"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Navegue pela árvore e selecione um board para abrir o kanban.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "320px 1fr" }, gap: 3 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Árvore do módulo
            </Typography>
            <List disablePadding>{renderNodes(null)}</List>
          </Paper>

          {selectedBoard ? <KanbanBoard board={selectedBoard} /> : <BoardPlaceholder board={null} />}
        </Box>
      </Stack>
    </Container>
  );
};
