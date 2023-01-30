import React from "react";
import { Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Export } from "../Export";
import { IVariable } from "../../types/Variable";
import { Box } from "@mui/system";

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
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },

      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h4"
        id="tableTitle"
        component="div"
        color="primary"
        fontWeight="bold"
      >
        {t("variables")}
      </Typography>
      <Box pr={2}>
        <Export selectedVariables={props.data} />
      </Box>
    </Toolbar>
  );
};
