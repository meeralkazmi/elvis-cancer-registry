import React, { useCallback, useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Box,
  Collapse,
  IconButton,
} from "@mui/material";
import { Done, Clear, ExpandMore, ExpandLess } from "@mui/icons-material";
import {
  StyledHeaderTableCell,
  StyledTableCell,
  StyledTableRow,
  StyledTableSortLabel,
} from "./style";
import { useTranslation } from "react-i18next";

interface IDataTable {
  header: Array<{
    label: string;
    key: string;
    keyEn?: string;
    type: string;
    sortable: boolean;
  }>;
  data: Array<any>;
  onRowClick: (id: number) => void;
}

export const DataTable: React.FC<IDataTable> = (props) => {
  const { t, i18n } = useTranslation();

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<string>("name");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (id: string) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  const getDateFromDateString = (date: string) => {
    const [day, month, year] = date.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const translate = useCallback(
    (keyNb: string, keyEn: string) => {
      return i18n.language === "nb" ? keyNb : keyEn;
    },
    [i18n.language]
  );
  const getSortedData = () => {
    const headerItem = props.header.find((head) => head.key === orderBy);
    const dataType = headerItem?.type;

    if (!dataType) return props.data;

    return props.data.sort((a, b) => {
      let valueA = a[orderBy];
      let valueB = b[orderBy];

      if (dataType === "number") {
        valueA = Number(valueA);
        valueB = Number(valueB);
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (dataType === "date") {
        valueA = getDateFromDateString(valueA).valueOf();
        valueB = getDateFromDateString(valueB).valueOf();
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      return order === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  };

  const toggleRow = (rowId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer sx={{ maxHeight: "75vh" }}>
        <Table stickyHeader sx={{ minWidth: 720, px: 2 }}>
          <TableHead>
            <TableRow>
              {props.header.map((head) =>
                head.sortable ? (
                  <StyledTableCell
                    key={`data-table-head-${head.key}`}
                    sortDirection={orderBy === head.key ? order : false}
                    sx={{ borderWidth: 2 }}
                  >
                    <StyledTableSortLabel
                      active={orderBy === head.key}
                      direction={orderBy === head.key ? order : "asc"}
                      onClick={() => createSortHandler(head.key)}
                      color="primary"
                      sx={{ fontSize: 16, fontWeight: "bold" }}
                    >
                      {t(head.key)}
                    </StyledTableSortLabel>
                  </StyledTableCell>
                ) : (
                  <StyledHeaderTableCell
                    key={`data-table-head-${head.key}`}
                    color="primary"
                    sx={{ fontSize: 16, fontWeight: "bold" }}
                  >
                    {t(head.key)}
                  </StyledHeaderTableCell>
                )
              )}
              <TableCell>
                <IconButton
                  onClick={() => {
                    const allExpanded = expandedRows.size === props.data.length;
                    const newExpandedRows = new Set<number>();
                    if (!allExpanded) {
                      props.data.forEach((row) => newExpandedRows.add(row.id));
                    }
                    setExpandedRows(newExpandedRows);
                  }}
                >
                  {expandedRows.size === props.data.length ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getSortedData()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <React.Fragment key={row.id}>
                  <StyledTableRow hover tabIndex={-1}>
                    {props.header.map((head) => (
                      <TableCell
                        data-testid="datacell"
                        key={`table-cell-${head.key}`}
                        sx={{
                          cursor: "pointer",
                          fontSize: 16,
                          borderWidth: 2,
                        }}
                      >
                        {head.type === "boolean" ? (
                          row[head.key] ? (
                            <Done color="success" />
                          ) : (
                            <Clear color="error" />
                          )
                        ) : head.key === "validForExtraction" ? (
                          row[
                            i18n.language === "nb"
                              ? head.key
                              : head.keyEn ?? head.key
                          ] === 1 ? (
                            "No"
                          ) : (
                            "Yes"
                          )
                        ) : (
                          row[
                            i18n.language === "nb"
                              ? head.key
                              : head.keyEn ?? head.key
                          ]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => toggleRow(row.id)}>
                        {expandedRows.has(row.id) ? (
                          <ExpandLess color="primary" />
                        ) : (
                          <ExpandMore color="primary" />
                        )}
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                  <Collapse
                    in={expandedRows.has(row.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <StyledTableRow>
                      <TableCell colSpan={props.header.length + 1}>
                        <Box margin={2}>
                          <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            <strong>{t("description")}: </strong>
                            {translate(row.description, row.descriptionEn)}
                          </Typography>
                          <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            <strong>{t("informationLevel")}: </strong>
                            {translate(
                              row.informationLevel.name,
                              row.informationLevel.nameEn
                            )}
                          </Typography>
                          <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            <strong>{t("dataType")}: </strong>
                            {translate(
                              row.dataType.name,
                              row.dataType.nameEn
                            )}{" "}
                            ({row.dataSize})
                          </Typography>
                          <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            <strong>{t("registrationMethod")}: </strong>
                            {translate(
                              row.registrationMethod.name,
                              row.registrationMethod.nameEn
                            )}
                          </Typography>
                          <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            <strong>{t("category")}: </strong>
                            {translate(row.category.name, row.category.nameEn)}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{t("currentlyInUse")}: </strong>
                            {row.active}
                          </Typography>
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  </Collapse>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
