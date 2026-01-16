import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import type { BoardId, CardType, CardTypeId } from "@/modules/_shared/domain/domain.contracts";
import {
  adminBoardFixtures,
  adminCardTypeFixtures,
} from "@/modules/admin/infra/admin.fixtures";
import { AdminPageLayout } from "@/modules/admin/presentation/components/AdminPageLayout";
import { createAdminId, formatJson, parseJsonField } from "@/modules/admin/presentation/utils/adminUtils";

type CardTypeConfig = {
  boardId: BoardId;
  cardType: CardType;
};

export const AdminCardTypesPage = () => {
  const [cardTypes, setCardTypes] = useState<CardTypeConfig[]>(() =>
    adminCardTypeFixtures.map((item) => ({
      boardId: item.boardId,
      cardType: { ...item.cardType, fields: item.cardType.fields?.map((field) => ({ ...field })) ?? [] },
    }))
  );
  const [fieldsJsonById, setFieldsJsonById] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      adminCardTypeFixtures.map((item) => [item.cardType.id, formatJson(item.cardType.fields ?? [])])
    )
  );
  const [errorsById, setErrorsById] = useState<Record<string, string>>({});

  const boardOptions = useMemo(() => adminBoardFixtures, []);

  const handleUpdate = (id: CardTypeId, updates: Partial<CardType>) => {
    setCardTypes((prev) =>
      prev.map((item) => (item.cardType.id === id ? { ...item, cardType: { ...item.cardType, ...updates } } : item))
    );
  };

  const handleBoardChange = (id: CardTypeId, boardId: BoardId) => {
    setCardTypes((prev) => prev.map((item) => (item.cardType.id === id ? { ...item, boardId } : item)));
  };

  const handleFieldsBlur = (id: CardTypeId) => {
    const result = parseJsonField(fieldsJsonById[id] ?? "");
    if (result.error) {
      setErrorsById((prev) => ({ ...prev, [id]: result.error }));
      return;
    }

    setErrorsById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });

    handleUpdate(id, { fields: Array.isArray(result.value) ? result.value : [] });
  };

  const handleAdd = () => {
    const newId = createAdminId("card-type") as CardTypeId;
    const newBoardId = boardOptions[0]?.id as BoardId;
    setCardTypes((prev) => [
      ...prev,
      {
        boardId: newBoardId,
        cardType: {
          id: newId,
          name: "Novo CardType",
          fields: [],
        },
      },
    ]);
    setFieldsJsonById((prev) => ({ ...prev, [newId]: formatJson([]) }));
  };

  const handleRemove = (id: CardTypeId) => {
    setCardTypes((prev) => prev.filter((item) => item.cardType.id !== id));
    setFieldsJsonById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    setErrorsById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  return (
    <AdminPageLayout
      title="Administração de Card Types"
      subtitle="Edite CardTypes e seus fields por board. Persistência mock em memória."
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          {cardTypes.map((item) => (
            <Stack key={item.cardType.id} spacing={2}>
              {errorsById[item.cardType.id] ? (
                <Alert severity="error">{errorsById[item.cardType.id]}</Alert>
              ) : null}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "2fr 1fr auto" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Nome"
                  value={item.cardType.name ?? ""}
                  onChange={(event) => handleUpdate(item.cardType.id, { name: event.target.value })}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id={`board-label-${item.cardType.id}`}>Board</InputLabel>
                  <Select
                    labelId={`board-label-${item.cardType.id}`}
                    label="Board"
                    value={item.boardId}
                    onChange={(event) => handleBoardChange(item.cardType.id, event.target.value as BoardId)}
                  >
                    {boardOptions.map((board) => (
                      <MenuItem key={board.id} value={board.id}>
                        {board.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton aria-label="Remover CardType" onClick={() => handleRemove(item.cardType.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
              <TextField
                label="Fields (JSON)"
                value={fieldsJsonById[item.cardType.id] ?? ""}
                onChange={(event) =>
                  setFieldsJsonById((prev) => ({ ...prev, [item.cardType.id]: event.target.value }))
                }
                onBlur={() => handleFieldsBlur(item.cardType.id)}
                multiline
                minRows={4}
                fullWidth
                helperText="Defina fields conforme o contrato do CardType."
              />
            </Stack>
          ))}
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar CardType
          </Button>
        </Stack>
      </Paper>
    </AdminPageLayout>
  );
};
