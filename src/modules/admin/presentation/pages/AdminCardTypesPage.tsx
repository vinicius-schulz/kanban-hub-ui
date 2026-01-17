import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import type {
  CardType,
  CardTypeField,
  CardTypeFieldMode,
  CardTypeFieldType,
  CardTypeId,
  CardTypeFieldId
} from "@/core/domain/domain.contracts";
import { fixtures } from "@/core/domain/domain.fixtures";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { AdminNav } from "@/modules/admin/presentation/components/AdminNav";
import { AdminPageHeader } from "@/modules/admin/presentation/components/AdminPageHeader";
import { routePaths } from "@/app/routes/routePaths";

const asId = <T,>(value: string) => value as T;

const fieldTypes: CardTypeFieldType[] = ["string", "number", "date", "boolean", "enum", "object", "array"];
const fieldModes: CardTypeFieldMode[] = ["editable", "readonly"];

export const AdminCardTypesPage = () => {
  const [cardTypes, setCardTypes] = useState<CardType[]>(fixtures.cardTypes);
  const [cardTypeFields, setCardTypeFields] = useState<CardTypeField[]>(fixtures.cardTypeFields);
  const [editingCardTypeId, setEditingCardTypeId] = useState<CardTypeId | null>(null);
  const [selectedCardTypeId, setSelectedCardTypeId] = useState<CardTypeId | "">(
    fixtures.cardTypes[0]?.id ?? ""
  );

  const [cardTypeName, setCardTypeName] = useState("");
  const [cardTypeDescription, setCardTypeDescription] = useState("");

  const [fieldId, setFieldId] = useState<CardTypeFieldId | null>(null);
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<CardTypeFieldType>(fieldTypes[0]);
  const [fieldMode, setFieldMode] = useState<CardTypeFieldMode>(fieldModes[0]);
  const [fieldBindingRef, setFieldBindingRef] = useState("");
  const [fieldFormat, setFieldFormat] = useState("");
  const [fieldShowPreview, setFieldShowPreview] = useState("true");
  const [fieldShowModal, setFieldShowModal] = useState("true");

  const cardTypeFieldsForSelected = useMemo(() => {
    if (!selectedCardTypeId) {
      return [];
    }
    return cardTypeFields.filter((field) => field.cardTypeId === selectedCardTypeId);
  }, [cardTypeFields, selectedCardTypeId]);

  const resetCardTypeForm = () => {
    setEditingCardTypeId(null);
    setCardTypeName("");
    setCardTypeDescription("");
  };

  const resetFieldForm = () => {
    setFieldId(null);
    setFieldLabel("");
    setFieldType(fieldTypes[0]);
    setFieldMode(fieldModes[0]);
    setFieldBindingRef("");
    setFieldFormat("");
    setFieldShowPreview("true");
    setFieldShowModal("true");
  };

  const handleSaveCardType = () => {
    if (!cardTypeName.trim()) {
      return;
    }

    if (editingCardTypeId) {
      setCardTypes((prev) =>
        prev.map((item) =>
          item.id === editingCardTypeId
            ? { ...item, name: cardTypeName.trim(), description: cardTypeDescription.trim() || null }
            : item
        )
      );
      resetCardTypeForm();
      return;
    }

    const newCardType: CardType = {
      id: asId<CardTypeId>(`ct-${Date.now()}`),
      name: cardTypeName.trim(),
      description: cardTypeDescription.trim() || null
    };
    setCardTypes((prev) => [...prev, newCardType]);
    setSelectedCardTypeId(newCardType.id);
    resetCardTypeForm();
  };

  const handleEditCardType = (cardType: CardType) => {
    setEditingCardTypeId(cardType.id);
    setCardTypeName(cardType.name);
    setCardTypeDescription(cardType.description ?? "");
  };

  const handleDeleteCardType = (cardTypeId: CardTypeId) => {
    setCardTypes((prev) => prev.filter((item) => item.id !== cardTypeId));
    setCardTypeFields((prev) => prev.filter((field) => field.cardTypeId !== cardTypeId));
    if (selectedCardTypeId === cardTypeId) {
      setSelectedCardTypeId("");
    }
    if (editingCardTypeId === cardTypeId) {
      resetCardTypeForm();
    }
  };

  const handleSaveField = () => {
    if (!selectedCardTypeId || !fieldLabel.trim() || !fieldBindingRef.trim()) {
      return;
    }

    if (fieldId) {
      setCardTypeFields((prev) =>
        prev.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                label: fieldLabel.trim(),
                type: fieldType,
                mode: fieldMode,
                bindingRef: fieldBindingRef.trim(),
                format: fieldFormat.trim() || null,
                showInPreview: fieldShowPreview === "true",
                showInModal: fieldShowModal === "true"
              }
            : field
        )
      );
      resetFieldForm();
      return;
    }

    const newField: CardTypeField = {
      id: asId<CardTypeFieldId>(`ctf-${Date.now()}`),
      cardTypeId: selectedCardTypeId as CardTypeId,
      label: fieldLabel.trim(),
      type: fieldType,
      mode: fieldMode,
      bindingRef: fieldBindingRef.trim(),
      format: fieldFormat.trim() || null,
      showInPreview: fieldShowPreview === "true",
      showInModal: fieldShowModal === "true"
    };

    setCardTypeFields((prev) => [...prev, newField]);
    resetFieldForm();
  };

  const handleEditField = (field: CardTypeField) => {
    setFieldId(field.id);
    setFieldLabel(field.label);
    setFieldType(field.type);
    setFieldMode(field.mode);
    setFieldBindingRef(field.bindingRef);
    setFieldFormat(field.format ?? "");
    setFieldShowPreview(field.showInPreview ? "true" : "false");
    setFieldShowModal(field.showInModal ? "true" : "false");
  };

  const handleDeleteField = (fieldIdToDelete: CardTypeFieldId) => {
    setCardTypeFields((prev) => prev.filter((field) => field.id !== fieldIdToDelete));
    if (fieldId === fieldIdToDelete) {
      resetFieldForm();
    }
  };

  const header = <AdminPageHeader title="Administração de CardTypes" />;

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          CardTypes e campos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cadastre tipos de card e configure os campos que aparecem no kanban e no modal.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", padding: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">{editingCardTypeId ? "Editar CardType" : "Novo CardType"}</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Nome"
              value={cardTypeName}
              onChange={(event) => setCardTypeName(event.target.value)}
              fullWidth
            />
            <TextField
              label="Descrição"
              value={cardTypeDescription}
              onChange={(event) => setCardTypeDescription(event.target.value)}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSaveCardType}>
              {editingCardTypeId ? "Salvar" : "Criar"}
            </Button>
            <Button variant="text" onClick={resetCardTypeForm}>
              Limpar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Lista de CardTypes</Typography>
            {cardTypes.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum CardType cadastrado.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {cardTypes.map((cardType) => (
                  <Paper
                    key={cardType.id}
                    variant="outlined"
                    sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
                      <Box flex={1}>
                        <Typography variant="subtitle1">{cardType.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cardType.description || "Sem descrição"}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button variant="text" onClick={() => handleEditCardType(cardType)}>
                          Editar
                        </Button>
                        <Button variant="text" color="error" onClick={() => handleDeleteCardType(cardType.id)}>
                          Excluir
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Divider />

      <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Campos do CardType</Typography>
            <FormControl fullWidth>
              <InputLabel id="cardtype-select">CardType</InputLabel>
              <Select
                labelId="cardtype-select"
                label="CardType"
                value={selectedCardTypeId}
                onChange={(event) => setSelectedCardTypeId(event.target.value as CardTypeId)}
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                {cardTypes.map((cardType) => (
                  <MenuItem key={cardType.id} value={cardType.id}>
                    {cardType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack spacing={2}>
              <Typography variant="subtitle1">
                {fieldId ? "Editar campo" : "Novo campo"}
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  label="Label"
                  value={fieldLabel}
                  onChange={(event) => setFieldLabel(event.target.value)}
                  fullWidth
                />
                <TextField
                  label="Binding Ref"
                  value={fieldBindingRef}
                  onChange={(event) => setFieldBindingRef(event.target.value)}
                  helperText="Ex: inputs.requester"
                  fullWidth
                />
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="field-type-select">Tipo</InputLabel>
                  <Select
                    labelId="field-type-select"
                    label="Tipo"
                    value={fieldType}
                    onChange={(event) => setFieldType(event.target.value as CardTypeFieldType)}
                  >
                    {fieldTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="field-mode-select">Modo</InputLabel>
                  <Select
                    labelId="field-mode-select"
                    label="Modo"
                    value={fieldMode}
                    onChange={(event) => setFieldMode(event.target.value as CardTypeFieldMode)}
                  >
                    {fieldModes.map((mode) => (
                      <MenuItem key={mode} value={mode}>
                        {mode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  label="Formato (opcional)"
                  value={fieldFormat}
                  onChange={(event) => setFieldFormat(event.target.value)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id="field-preview-select">Mostrar no kanban</InputLabel>
                  <Select
                    labelId="field-preview-select"
                    label="Mostrar no kanban"
                    value={fieldShowPreview}
                    onChange={(event) => setFieldShowPreview(event.target.value)}
                  >
                    <MenuItem value="true">Sim</MenuItem>
                    <MenuItem value="false">Não</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="field-modal-select">Mostrar no modal</InputLabel>
                  <Select
                    labelId="field-modal-select"
                    label="Mostrar no modal"
                    value={fieldShowModal}
                    onChange={(event) => setFieldShowModal(event.target.value)}
                  >
                    <MenuItem value="true">Sim</MenuItem>
                    <MenuItem value="false">Não</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSaveField}>
                  {fieldId ? "Salvar" : "Adicionar"}
                </Button>
                <Button variant="text" onClick={resetFieldForm}>
                  Limpar
                </Button>
              </Stack>
            </Stack>

            <Divider />

            {selectedCardTypeId ? (
              cardTypeFieldsForSelected.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Nenhum campo configurado para este CardType.
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {cardTypeFieldsForSelected.map((field) => (
                    <Paper
                      key={field.id}
                      variant="outlined"
                      sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
                        <Box flex={1}>
                          <Typography variant="subtitle1">{field.label}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {field.type} • {field.mode} • {field.bindingRef}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Button variant="text" onClick={() => handleEditField(field)}>
                            Editar
                          </Button>
                          <Button
                            variant="text"
                            color="error"
                            onClick={() => handleDeleteField(field.id)}
                          >
                            Excluir
                          </Button>
                        </Stack>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )
            ) : (
              <Typography variant="body2" color="text.secondary">
                Selecione um CardType para gerenciar campos.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );

  return (
    <PageLayout
      header={header}
      nav={<AdminNav activePath={routePaths.adminCardTypes} />}
      content={content}
    />
  );
};
