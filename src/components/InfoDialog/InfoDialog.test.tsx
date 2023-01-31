import { createTheme, ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { TestDataService } from "../../services/TestDataService";
import { InfoDialog } from "./InfoDialog";

const theme = createTheme({
  palette: {
    primary: { main: "#46658A", light: "#ccd7e5" },
    secondary: { main: "#fff" },
  },
});

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

describe(InfoDialog, () => {
  const testData = new TestDataService();

  it("Should have a name in title", async () => {
    const { getByTestId } = await render(
      <ThemeProvider theme={theme}>
        <InfoDialog
          open
          setOpen={() => {}}
          selectedVariable={testData.variables[0]}
        />
      </ThemeProvider>
    );

    const title = getByTestId("variableName");
    expect(title.innerHTML).toEqual("Message number id (Active)");
  });
});
