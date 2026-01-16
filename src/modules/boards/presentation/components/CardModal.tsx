import {
  Alert,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useMemo, useState } from "react";
import type { Card, CardHistoryEntry, Webhook } from "@/modules/_shared/domain/domain.contracts";

interface CardModalProps {
  open: boolean;
  card: Card | null;
  historyEntries: CardHistoryEntry[];
  webhooks: Webhook[];
  onClose: () => void;
}

const renderJsonSection = (value: unknown) => {
  if (!value || (typeof value === "object" && Object.keys(value as object).length === 0)) {
    return (
      <Typography variant="body2" color="text.secondary">
        Sem dados disponíveis.
      </Typography>
    );
  }

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 2,
        borderRadius: 2,
        bgcolor: "grey.900",
        color: "common.white",
        fontSize: 12,
        overflow: "auto",
      }}
    >
      {JSON.stringify(value, null, 2)}
    </Box>
  );
};

export const CardModal = ({ open, card, historyEntries, webhooks, onClose }: CardModalProps) => {
  const [selectedWebhookId, setSelectedWebhookId] = useState<string>("");
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  const selectedWebhook = useMemo(
    () => webhooks.find((webhook) => webhook.id === selectedWebhookId),
    [webhooks, selectedWebhookId]
  );

  useEffect(() => {
    setSelectedWebhookId("");
    setExecutionMessage(null);
  }, [card?.id]);

  if (!card) {
    return null;
  }

  const handleWebhookChange = (event: SelectChangeEvent<string>) => {
    setSelectedWebhookId(event.target.value);
    setExecutionMessage(null);
  };

  const handleExecuteWebhook = () => {
    if (!selectedWebhook) {
      return;
    }
    setExecutionMessage(
      `Webhook mock "${selectedWebhook.url ?? "URL não definida"}" executado com sucesso.`
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {card.cardData?.inputs?.titulo ?? "Card"}
          </Typography>
          <Chip label={`ID ${card.id}`} size="small" />
        </Stack>
        <IconButton
          aria-label="Fechar"
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Dados de origem
            </Typography>
            {renderJsonSection(card.sourceData)}
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Inputs
            </Typography>
            {renderJsonSection(card.cardData?.inputs)}
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Outputs
            </Typography>
            {renderJsonSection(card.cardData?.outputs)}
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Props
            </Typography>
            {renderJsonSection(card.props)}
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Plugins
            </Typography>
            {renderJsonSection(card.pluginData)}
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Histórico
            </Typography>
            <Stack spacing={2}>
              {historyEntries.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Sem eventos registrados.
                </Typography>
              ) : (
                historyEntries.map((entry) => (
                  <Box key={entry.id} sx={{ p: 2, borderRadius: 2, bgcolor: "grey.100" }}>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {entry.summary ?? "Evento"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {entry.type ?? "Tipo não informado"} • {entry.createdAt ?? "Data não informada"}
                      </Typography>
                      {entry.payload ? (
                        <Box component="pre" sx={{ m: 0, mt: 1, fontSize: 12 }}>
                          {JSON.stringify(entry.payload, null, 2)}
                        </Box>
                      ) : null}
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Execução manual de webhook
            </Typography>
            {webhooks.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum conector webhook disponível para este board.
              </Typography>
            ) : (
              <Stack spacing={2}>
                <Select
                  size="small"
                  displayEmpty
                  value={selectedWebhookId}
                  onChange={handleWebhookChange}
                  renderValue={(value) => {
                    if (!value) {
                      return "Selecione um conector";
                    }
                    return webhooks.find((webhook) => webhook.id === value)?.url ?? value;
                  }}
                >
                  <MenuItem value="">Selecione um conector</MenuItem>
                  {webhooks.map((webhook) => (
                    <MenuItem key={webhook.id} value={webhook.id}>
                      {webhook.method ?? "POST"} • {webhook.url ?? webhook.id}
                    </MenuItem>
                  ))}
                </Select>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    TODO(POA-004): Implementar execução real do webhook com autenticação e template.
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    label="Executar webhook"
                    color="primary"
                    onClick={handleExecuteWebhook}
                    disabled={!selectedWebhook}
                  />
                </Box>
                {executionMessage ? (
                  <Alert severity="success" variant="outlined">
                    {executionMessage}
                  </Alert>
                ) : null}
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Dados mockados para o MVP.
        </Typography>
      </DialogActions>
    </Dialog>
  );
};
