import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../config/store";
import { RootLayout } from "../layouts/RootLayout";
import { retrieveVariablesAsync } from "../slices/variableSlice";
import { Actionbar, DataTable, InfoDialog } from "../components/";
import { VariableService } from "../services/VariableService";

interface IHomePage {}

const tableHeader = [
  {
    label: "Name",
    key: "name",
    keyEn: "nameEn",
    type: "string",
    sortable: true,
  },
  {
    label: "Deliverables",
    key: "validForExtraction",
    type: "string",
    sortable: true,
  },
  {
    label: "Valid From",
    key: "validFrom",
    type: "string",
    sortable: true,
  },
  {
    label: "Recomended Tech Name",
    key: "techName",
    type: "string",
    sortable: true,
  },
];

export const HomePage: React.FC<IHomePage> = () => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const variables = useAppSelector((state) => state.variables);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveVariablesAsync());
  }, [dispatch]);

  const getDataFromVariables = () => {
    return variables.value.map((variable) => {
      return {
        ...variable,
        category: variable.category.name,
        categoryEn: variable.category.nameEn,
        dataType: variable.dataType.name,
        dataTypeEn: variable.dataType.nameEn,
        registrationMethod: variable.registrationMethod.name,
        registrationMethodEn: variable.registrationMethod.nameEn,
        active: variable.status.name === "Aktiv",
      };
    });
  };
  if (variables.status === "loading")
    return (
      <RootLayout>
        <Box
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          height={"80vh"}
        >
          <CircularProgress />
        </Box>
      </RootLayout>
    );
  return (
    <RootLayout>
      <InfoDialog
        open={!!selectedId}
        setOpen={() => setSelectedId(undefined)}
        selectedVariable={variables.value.find((v) => v.id === selectedId)}
      />
      <Box sx={{ width: "100%" }}>
        <Actionbar header={tableHeader} data={variables.value} />
        <DataTable
          header={tableHeader}
          data={getDataFromVariables()}
          onRowClick={setSelectedId}
        />
      </Box>
    </RootLayout>
  );
};
