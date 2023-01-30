import { CloudDownload } from "@mui/icons-material";
import React from "react";
import { CSVLink } from "react-csv";
import { IVariable } from "../../types/Variable";

interface IExport {
  selectedVariables: Array<IVariable>;
  variant?: "light" | "dark"
}

const exportHeader = [
  {
    label: "Name",
    key: "name",
  },
  { label: "Tech Name", key: "techName" },
  {
    label: "Category",
    key: "category",
  },
  {
    label: "Description",
    key: "description",
  },
  {
    label: "Data Type",
    key: "dataType",
  },
  {
    label: "Variable Type",
    key: "variableType",
  },
  {
    label: "Example",
    key: "exmaple",
  },
  {
    label: "Created On",
    key: "createdOn",
  },
  {
    label: "Created By",
    key: "createdBy",
  },
  {
    label: "Data Extraction Comment",
    key: "dataExtractionComment",
  },
  {
    label: "Registertation Method",
    key: "registrationMethod",
  },
  { label: "Approved By", key: "approvedBy" },

  { label: "Approved On", key: "approvedOn" },
  { label: "Status", key: "status" },
  { label: "Received In", key: "receivedIn" },
  { label: "Given Out", key: "givenOut" },
  { label: "Required", key: "required" },
  { label: "Exist In Primary", key: "existsInPrimary" },
];

export const Export: React.FC<IExport> = (props) => {
  const getExportData = () => {
    return props.selectedVariables.map((variable) => {
      return {
        name: variable.name,
        techName: variable.techName,
        category: variable.category.name,
        description: variable.description,
        dataType: variable.dataType.name,
        variableType: variable.variableType.name,
        exmaple: variable.example,
        createdOn: variable.createdOn,
        createdBy: variable.createdBy,
        dataExtractionComment: variable.dataExtractionComment,
        registrationMethod: variable.registrationMethod,
        approvedBy: variable.approvedBy,
        approvedOn: variable.approvedOn,
        status: variable.status.name,
        receivedIn: variable.receivedIn ? "Yes" : "No",
        givenOut: variable.givenOut ? "Yes" : "No",
        required: variable.required ? "Yes" : "No",
        existsInPrimary: variable.existsInPrimary ? "Yes" : "No",
      };
    });
  };

  return (
    <CSVLink
      data={getExportData()}
      headers={exportHeader}
      filename="elvis-variables.csv"
    >
      <CloudDownload fontSize="large" color={props.variant === "light" ? "secondary" : "primary"} />
    </CSVLink>
  );
};
