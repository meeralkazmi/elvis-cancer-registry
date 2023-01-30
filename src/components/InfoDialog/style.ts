import Grid, { gridClasses } from "@mui/material/Grid";
import Typography, { typographyClasses } from "@mui/material/Typography";

import { styled } from "@mui/system";

export const StyledDialogHead = styled(Grid)(({ theme }) => ({
    [`&.${gridClasses.root}`]: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const StyledLabel = styled(Typography)(({ theme }) => ({
    [`&.${typographyClasses.root}`]: {
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: "bold"
    },
}));