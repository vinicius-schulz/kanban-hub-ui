import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import tokens from "@/modules/_shared/styles/design.tokens.json";

type PageLayoutProps = {
  header?: ReactNode;
  nav?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  rightRail?: ReactNode;
};

export const PageLayout = ({ header, nav, content, footer, rightRail }: PageLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isNavOpen, setIsNavOpen] = useState(false);

  const drawerContent = (
    <Box display="flex" flexDirection="column" height="100%">
      <Box padding={2}>{nav}</Box>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          {nav && isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setIsNavOpen(true)}
              aria-label="Abrir navegação"
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box flex={1}>{header}</Box>
        </Toolbar>
      </AppBar>

      <Box display="flex" flex={1}>
        {nav && !isMobile ? (
          <Drawer
            variant="permanent"
            sx={{
              width: tokens.layout.sidebarWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: tokens.layout.sidebarWidth,
                boxSizing: "border-box"
              }
            }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        ) : null}

        {nav && isMobile ? (
          <Drawer open={isNavOpen} onClose={() => setIsNavOpen(false)} variant="temporary">
            {drawerContent}
          </Drawer>
        ) : null}

        <Box
          component="main"
          flex={1}
          padding={{ xs: 2, md: 3 }}
          maxWidth={tokens.layout.maxWidth}
          width="100%"
          margin="0 auto"
        >
          {content}
        </Box>

        {rightRail && !isMobile ? (
          <Box
            width={tokens.layout.rightRailWidth}
            padding={3}
            borderLeft={`1px solid ${theme.palette.divider}`}
            bgcolor={theme.palette.background.paper}
          >
            {rightRail}
          </Box>
        ) : null}
      </Box>

      {footer ? (
        <Box component="footer" padding={2} bgcolor={theme.palette.background.paper}>
          <Divider sx={{ marginBottom: 2 }} />
          {footer}
        </Box>
      ) : null}
    </Box>
  );
};
