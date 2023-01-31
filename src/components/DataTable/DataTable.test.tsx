import { createTheme, ThemeProvider } from "@mui/material";
import { render, fireEvent } from "@testing-library/react";
import { TestDataService } from "../../services/TestDataService";
import { DataTable } from "./DataTable";

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

describe(DataTable, () => {
  const testData = new TestDataService();

  it("Should render name in table", () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <DataTable
          header={testData.tableHeader}
          data={testData.variables}
          onRowClick={() => {}}
        />
      </ThemeProvider>
    );

    const datacells = getAllByTestId("datacell");
    expect(datacells[0].innerHTML).toEqual("Basis of diagnosis");
  });

  it("Header Name should allow sorting", () => {
    const { getByText, getAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <DataTable
          header={testData.tableHeader}
          data={testData.variables}
          onRowClick={() => {}}
        />
      </ThemeProvider>
    );

    let datacells = getAllByTestId("datacell");
    expect(datacells[0].innerHTML).toEqual("Basis of diagnosis");

    const nameButton = getByText("name");
    fireEvent.click(nameButton);

    datacells = getAllByTestId("datacell");
    expect(datacells[0].innerHTML).toEqual("Message number id");
  });
});
