import { CloudDownload } from "@mui/icons-material";
import React from "react";
import { CSVLink } from "react-csv";
import { IVariable } from "../../types/Variable";

interface IExport {
  selectedVariables: Array<IVariable>;
  variant?: "light" | "dark";
}

const exportHeader = [
  {
    label: "Name",
    key: "name",
  },
  { label: "Tech Name", key: "techName" },
  {
    label: "Description",
    key: "description",
  },
  { label: "Quality", key: "descriptionOfQuality" },

  { label: "Deliverable", key: "existsInPrimary" },
  { label: "URl", key: "url" },
];

export const Export: React.FC<IExport> = (props) => {
  const getExportData = () => {
    return props.selectedVariables.map((variable) => {
      return {
        name: variable.name,
        techName: variable.techName,
        description: variable.description,
        existsInPrimary: variable.existsInPrimary ? "Yes" : "No",
        quality: variable.descriptionOfQuality,
        informationLevel: variable.informationLevel,
        url: `https://metadata.kreftregisteret.no/variables/detail/${variable.id}`,
      };
    });
  };

  return (
    <CSVLink
      data={getExportData()}
      headers={exportHeader}
      filename="elvis-variables.csv"
    >
      <CloudDownload
        fontSize="large"
        color={props.variant === "light" ? "secondary" : "primary"}
      />
    </CSVLink>
  );
};
