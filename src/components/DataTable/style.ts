import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableSortLabel, { tableSortLabelClasses } from '@mui/material/TableSortLabel';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableSortLabelClasses.root}`]: {
    color: theme.palette.primary.main,
  },
}));

export const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    color: theme.palette.primary.main,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}:hover`]: {
    backgroundColor: theme.palette.primary.light,
  },
}));
