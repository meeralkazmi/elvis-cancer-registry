import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { Done, Clear, PeopleSharp } from "@mui/icons-material";
import { StyledHeaderTableCell, StyledTableCell, StyledTableRow, StyledTableSortLabel } from "./style";
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
    const [day, month, year] = date.split("-")
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  const getSortedData = () => {
    const dataType = props.header.find(head => head.key === orderBy)?.type
    if (!dataType) return props.data
    if (dataType === "date") {
      return props.data
        .sort((a, b) => {
          const dateA = getDateFromDateString(a[orderBy]).valueOf()
          const dateB = getDateFromDateString(b[orderBy]).valueOf()
          if (order === "asc") {
            return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
          }
          return dateA < dateB ? -1 : dateA < dateB ? 1 : 0;
        }

        )
    }

    return props.data
      .sort((a, b) =>
        order === "asc"
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy])
      )
  }


  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer sx={{ maxHeight: "75vh" }}>
        <Table stickyHeader sx={{ minWidth: 720, px: 2 }}>
          <TableHead>
            <TableRow>
              {props.header.map((head) => {
                if (head.sortable) {
                  return (
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
                  );
                }
                return (
                  <StyledHeaderTableCell key={`data-table-head-${head.key}`} color="primary"
                    sx={{ fontSize: 16, fontWeight: "bold" }}>
                    {t(head.key)}
                  </StyledHeaderTableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {getSortedData()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    onClick={() => props.onRowClick(row.id)}
                    tabIndex={-1}
                    key={row.id}
                  >
                    {props.header.map((head) => {
                      return (
                        <TableCell
                          data-testid="datacell"
                          key={`table-cell-${head.key}`}
                          sx={{ cursor: "pointer", fontSize: 16, borderWidth: 2 }}
                        >
                          {head.type === "boolean" ? (
                            row[head.key] ? (
                              <Done color="success" />
                            ) : (
                              <Clear color="error" />
                            )
                          ) : (
                            row[
                            i18n.language === "nb"
                              ? head.key
                              : head.keyEn ?? head.key
                            ]
                          )}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
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
