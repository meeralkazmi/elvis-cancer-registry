import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Done, Clear } from "@mui/icons-material";

import { IVariable } from "../../types/Variable";
import { useTranslation } from "react-i18next";
import { Export } from "../Export";
import { StyledDialogHead, StyledLabel } from "./style";

interface IInfoDialog {
  open: boolean;
  setOpen: (state: boolean) => void;
  selectedVariable?: IVariable;
}

export const InfoDialog: React.FC<IInfoDialog> = (props) => {
  const { t, i18n } = useTranslation();
  if (!props.selectedVariable) return <></>;

  const {
    name,
    nameEn,
    description,
    descriptionEn,
    techName,
    dataType,
    variableType,
    dataExtractionComment,
    descriptionOfQuality,
    example,
    category,
    informationLevel,
    registrationMethod,
    createdOn,
    createdBy,
    approvedBy,
    approvedOn,
    validFrom,
    receivedIn,
    givenOut,
    required,
    existsInPrimary,
    existsInRecurrence,
  } = props.selectedVariable;
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      scroll={"paper"}
      fullWidth
      maxWidth="xl"
      aria-labelledby={`variable-${props.selectedVariable.name}`}
      aria-describedby={`variable-${props.selectedVariable.description}`}
    >
      <StyledDialogHead container alignItems="center">
        <Grid item xs={11}>
          <DialogTitle data-testid="variableName" variant="h5" color="secondary">
            {i18n.language === "nb"
              ? props.selectedVariable.name
              : props.selectedVariable.nameEn}{" "}
            (
            {i18n.language === "nb"
              ? props.selectedVariable.status.name
              : props.selectedVariable.status.nameEn}
            )
          </DialogTitle>
        </Grid>
        <Grid item xs={1}>
          <Export selectedVariables={[props.selectedVariable]} variant="light" />
        </Grid>
      </StyledDialogHead>
      <DialogContent dividers>
        <List>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel >{t("name")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb" ? name : nameEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("description")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb" ? description : descriptionEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("techName")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{techName}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("dataType")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb" ? dataType.name : dataType.nameEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("variableType")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb"
                    ? variableType.name
                    : variableType.nameEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("dataExtractionComment")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{dataExtractionComment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("descriptionOfQuality")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{descriptionOfQuality ?? "-"}</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("example")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{example ?? "-"}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("category")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb" ? category.name : category.nameEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("informationLevel")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb"
                    ? informationLevel.name
                    : informationLevel.nameEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("registrationMethod")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {i18n.language === "nb"
                    ? registrationMethod.name
                    : registrationMethod.nameEn}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("createdBy")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{createdBy}</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("createdOn")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{createdOn}</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("approvedBy")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{approvedBy}</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("approvedOn")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{approvedOn}</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("validFrom")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">{validFrom}</Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("receivedIn")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {receivedIn ? (
                    <Done color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("givenOut")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {givenOut ? (
                    <Done color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("required")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {required ? (
                    <Done color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("existsInPrimary")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {existsInPrimary ? (
                    <Done color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container>
              <Grid item xs={2}>
                <StyledLabel>{t("existsInRecurrence")}</StyledLabel>
              </Grid>
              <Grid item xs={10}>
                <Typography fontSize={16} color="black">
                  {existsInRecurrence ? (
                    <Done color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};
