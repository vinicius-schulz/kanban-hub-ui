export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  apiMock: import.meta.env.VITE_API_MOCK === "true",
};
