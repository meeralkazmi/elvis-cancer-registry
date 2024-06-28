import React from "react";
import { Toolbar, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Export } from "../Export";
import { IVariable } from "../../types/Variable";
import { Filter } from "../Filter/Filter";

interface IActionbar {
  header: Array<{
    label: string;
    key: string;
    type: string;
    sortable: boolean;
  }>;
  data: Array<IVariable>;
}

export const Actionbar: React.FC<IActionbar> = (props) => {
  const { t } = useTranslation();
  return (
    <Toolbar
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: { sm: 2 },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          id="tableTitle"
          component="div"
          color="primary"
          fontWeight="bold"
        >
          {t("variables")}
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", mt: 1, flexWrap: "wrap" }}
      >
        <Filter
          onSelect={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Box sx={{ mb: 2 }}>
          <Export selectedVariables={props.data} />
        </Box>
      </Box>
    </Toolbar>
  );
};
