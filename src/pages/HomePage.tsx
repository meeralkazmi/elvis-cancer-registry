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
  { label: "Tech Name", key: "techName", type: "string", sortable: true },
  {
    label: "Category",
    key: "category",
    keyEn: "categoryEn",
    type: "string",
    sortable: true,
  },
  {
    label: "Data Type",
    key: "dataType",
    keyEn: "dataTypeEn",
    type: "string",
    sortable: true,
  },
  {
    label: "Registertation Method",
    key: "registrationMethod",
    keyEn: "registrationMethodEn",
    type: "string",
    sortable: true,
  },
  { label: "Approved By", key: "approvedBy", type: "string", sortable: true },

  { label: "Approved On", key: "approvedOn", type: "date", sortable: true },
  { label: "Active", key: "active", type: "boolean", sortable: false },
];

export const HomePage: React.FC<IHomePage> = () => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const variables = useAppSelector((state) => state.variables);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveVariablesAsync());
  }, [dispatch]);

  const fetchData = async () => {
    try {
      const service = new VariableService();
      const data = await service.searchFilters({
        keyword: "a",
      });

      console.log("data ::", data);
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
