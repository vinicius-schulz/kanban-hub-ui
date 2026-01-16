import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";

type ModulesNavProps = {
  activePath?: string;
};

export const ModulesNav = ({ activePath }: ModulesNavProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Navegação
        </Typography>
        <List dense disablePadding>
          <ListItemButton
            component={Link}
            to={routePaths.modules}
            selected={activePath === routePaths.modules}
          >
            <ListItemText primary="Módulos" />
          </ListItemButton>
        </List>
      </Box>
      <Divider />
      <Box>
        <Typography variant="overline" color="text.secondary">
          Administração
        </Typography>
        <List dense disablePadding>
          <ListItemButton disabled>
            <ListItemText primary="Cadastros" secondary="Disponível para Admin" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};
