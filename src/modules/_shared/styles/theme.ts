import { createTheme } from "@mui/material/styles";
import tokens from "./design.tokens.json";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: tokens.color.primary.main,
      dark: tokens.color.primary.dark,
      light: tokens.color.primary.light
    },
    secondary: {
      main: tokens.color.secondary.main,
      dark: tokens.color.secondary.dark,
      light: tokens.color.secondary.light
    },
    success: {
      main: tokens.color.success.main
    },
    warning: {
      main: tokens.color.warning.main
    },
    error: {
      main: tokens.color.error.main
    },
    info: {
      main: tokens.color.info.main
    },
    background: {
      default: tokens.color.bg.page,
      paper: tokens.color.bg.surface
    },
    text: {
      primary: tokens.color.neutral[900],
      secondary: "rgba(28, 26, 24, 0.72)"
    },
    divider: "rgba(28, 26, 24, 0.12)"
  },
  typography: {
    fontFamily: tokens.typography.fontFamily.body,
    h1: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.scale.xxl,
      fontWeight: 600
    },
    h2: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.scale.xl,
      fontWeight: 600
    },
    h3: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.scale.lg,
      fontWeight: 600
    },
    h4: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.scale.md,
      fontWeight: 600
    },
    body1: {
      fontSize: tokens.typography.scale.md
    },
    body2: {
      fontSize: tokens.typography.scale.sm
    },
    caption: {
      fontSize: tokens.typography.scale.xs
    },
    button: {
      fontFamily: tokens.typography.fontFamily.heading,
      textTransform: "none",
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: tokens.radius.md
  },
  spacing: tokens.spacing.md,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.color.bg.surface,
          color: tokens.color.neutral[900],
          boxShadow: tokens.shadow.sm
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.color.bg.elevated,
          borderRight: `1px solid rgba(28, 26, 24, 0.08)`
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm,
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`
        },
        containedPrimary: {
          boxShadow: "none"
        },
        outlinedPrimary: {
          borderWidth: 2
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          border: "1px solid rgba(28, 26, 24, 0.08)",
          boxShadow: tokens.shadow.sm
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: tokens.radius.md
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 44
        },
        indicator: {
          height: 3,
          borderRadius: tokens.radius.sm
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: "0 4px"
        }
      }
    }
  }
});

export default theme;
