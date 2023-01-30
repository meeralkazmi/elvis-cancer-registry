import React, { useState } from "react";
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { enUS, nbNO } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { InfoDialog, Search } from "../components";
import { Box } from "@mui/system";
import { IVariable } from "../types/Variable";

interface IRootLayout {
  children: React.ReactNode;
}

export const RootLayout: React.FC<IRootLayout> = (props) => {
  const [selectedVariable, setSelectedVariable] = useState<
    IVariable | undefined
  >(undefined);
  const { i18n } = useTranslation();

  const theme = createTheme(
    { palette: { primary: { main: "#46658A", light: "#ccd7e5" }, secondary: { main: "#fff" } } },
    i18n.language === "en" ? enUS : nbNO
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar style={{ marginTop: 4 }}>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            ELVIS
          </Typography>
          <Box px={3}>
            <Search onSelect={setSelectedVariable} />
          </Box>
          <ButtonGroup size="small" color="secondary">
            <Button
              variant={i18n.language === "en" ? "contained" : "outlined"}
              onClick={() => i18n.changeLanguage("en")}
            >
              English
            </Button>
            <Button
              variant={i18n.language === "en" ? "outlined" : "contained"}
              onClick={() => i18n.changeLanguage("nb")}
            >
              Norsk
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <InfoDialog
        open={!!selectedVariable}
        setOpen={() => setSelectedVariable(undefined)}
        selectedVariable={selectedVariable}
      />
      {props.children}
    </ThemeProvider>
  );
};
