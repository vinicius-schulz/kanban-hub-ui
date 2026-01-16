import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type {
  Card,
  CardHistoryEvent,
  CardTypeField,
  JsonValue,
  Label,
} from "@/core/domain/domain.contracts";

const isRecord = (value: JsonValue | null | undefined): value is Record<string, JsonValue> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const parseBindingKey = (bindingRef?: string | null) => {
  if (!bindingRef) {
    return null;
  }
  if (bindingRef.startsWith("inputs.")) {
    return bindingRef.replace("inputs.", "");
  }
  return bindingRef;
};

interface CardDetailsModalProps {
  open: boolean;
  card: Card | null;
  cardTypeFields: CardTypeField[];
  labels: Label[];
  historyEvents: CardHistoryEvent[];
  onClose: () => void;
  onSave: (updatedCard: Card, summary: string) => void;
}

export const CardDetailsModal = ({
  open,
  card,
  cardTypeFields,
  labels,
  historyEvents,
  onClose,
  onSave,
}: CardDetailsModalProps) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const derivedFields = useMemo(() => {
    const fields = cardTypeFields
      .map((field) => {
        const key = parseBindingKey(field.bindingRef);
        return key ? { key, label: field.label } : null;
      })
      .filter((field): field is { key: string; label: string } => field !== null);

    if (fields.length > 0) {
      return fields;
    }

    if (card && isRecord(card.cardData?.inputs)) {
      return Object.keys(card.cardData.inputs).map((key) => ({ key, label: key }));
    }

    return [];
  }, [card, cardTypeFields]);

  const outputEntries = useMemo(() => {
    if (card && isRecord(card.cardData?.outputs)) {
      return Object.entries(card.cardData.outputs);
    }
    return [];
  }, [card]);

  const cardLabels = useMemo(() => {
    if (!card?.labels) {
      return [];
    }
    const labelMap = new Map(labels.map((label) => [label.id, label]));
    return card.labels.map((labelId) => labelMap.get(labelId)).filter(Boolean) as Label[];
  }, [card, labels]);

  const sortedHistory = useMemo(() => {
    return [...historyEvents].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [historyEvents]);

  useEffect(() => {
    if (!card) {
      setInputValues({});
      return;
    }

    const inputs = isRecord(card.cardData?.inputs) ? card.cardData?.inputs : {};
    const values: Record<string, string> = {};

    derivedFields.forEach(({ key }) => {
      const value = inputs?.[key];
      values[key] = value !== undefined && value !== null ? String(value) : "";
    });

    setInputValues(values);
  }, [card, derivedFields]);

  if (!card) {
    return null;
  }

  const handleChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSave = () => {
    const updatedInputs: Record<string, JsonValue> = {};
    Object.entries(inputValues).forEach(([key, value]) => {
      updatedInputs[key] = value;
    });

    const updatedCard: Card = {
      ...card,
      cardData: {
        inputs: updatedInputs,
        outputs: card.cardData?.outputs ?? null,
      },
    };

    onSave(updatedCard, "Dados do card atualizados");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Card {card.id}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} marginTop={1}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Labels
            </Typography>
            {cardLabels.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {cardLabels.map((label) => (
                  <Chip key={label.id} label={label.name} size="small" />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nenhuma label atribuída.
              </Typography>
            )}
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Inputs
            </Typography>
            {derivedFields.length > 0 ? (
              <Stack spacing={2}>
                {derivedFields.map(({ key, label }) => (
                  <TextField
                    key={key}
                    label={label}
                    value={inputValues[key] ?? ""}
                    onChange={handleChange(key)}
                    fullWidth
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Sem inputs configurados para este card.
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Outputs
            </Typography>
            {outputEntries.length > 0 ? (
              <Stack spacing={1}>
                {outputEntries.map(([key, value]) => (
                  <Typography key={key} variant="body2" color="text.secondary">
                    {key}: {String(value)}
                  </Typography>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nenhum output registrado.
              </Typography>
            )}
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Histórico
            </Typography>
            {sortedHistory.length > 0 ? (
              <List disablePadding>
                {sortedHistory.map((event) => (
                  <ListItem key={event.id} divider>
                    <ListItemText
                      primary={event.summary}
                      secondary={new Date(event.createdAt).toLocaleString("pt-BR")}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nenhum evento registrado ainda.
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained">
          Salvar alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};
