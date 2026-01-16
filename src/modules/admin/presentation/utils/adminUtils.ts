export const createAdminId = (prefix: string) => {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
};

export const formatJson = (value: unknown) => {
  return JSON.stringify(value ?? {}, null, 2);
};

export const parseJsonField = (value: string) => {
  if (!value.trim()) {
    return { value: {}, error: null } as const;
  }

  try {
    return { value: JSON.parse(value), error: null } as const;
  } catch (error) {
    return { value: null, error: "JSON inválido. Ajuste o conteúdo para salvar." } as const;
  }
};
