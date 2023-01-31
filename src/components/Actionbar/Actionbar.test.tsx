import { render } from "@testing-library/react";
import { TestDataService } from "../../services/TestDataService";
import { Actionbar } from "./Actionbar";

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

describe(Actionbar, () => {
  const testData = new TestDataService();

  it("Should render table title", () => {
    const { getByText } = render(
      <Actionbar header={testData.tableHeader} data={testData.variables} />
    );

    const title = getByText("variables");
    expect(title.innerHTML).toEqual("variables");
  });

  it("Should render export button", async () => {
    const { container } = await render(
      <Actionbar header={testData.tableHeader} data={testData.variables} />
    );

    const exportButton = container.querySelector(
      "a[download='elvis-variables.csv']"
    );
    expect(exportButton).toBeDefined();
  });
});
