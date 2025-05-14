import React from "react";

import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Mui } from "../../theme";
import type { SortDirection } from "@mui/material";
import type { DynamicTableProps } from "./DynamicTableInterface";

function TablePaginationActions(props: {
  count: any;
  page: any;
  rowsPerPage: any;
  onPageChange: any;
}) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Mui.Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Mui.IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </Mui.IconButton>
      <Mui.IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </Mui.IconButton>
      <Mui.IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Mui.IconButton>
      <Mui.IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </Mui.IconButton>
    </Mui.Box>
  );
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  title,
  defaultSortField,
  defaultSortDirection = "asc",
  pagination = true,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  stickyHeader = false,
  elevation = 3,
  sx = {},
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [order, setOrder] = React.useState(defaultSortDirection);
  const [orderBy, setOrderBy] = React.useState(defaultSortField);

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    _event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, orderBy, order]);

  // Paginate data
  const paginatedData = pagination
    ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedData;

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Mui.Box sx={{ width: "100%", ...sx }}>
      {title && (
        <Mui.Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Mui.Typography>
      )}

      <Mui.Paper elevation={elevation} sx={{ width: "100%", mb: 2 }}>
        <Mui.TableContainer>
          <Mui.Table stickyHeader={stickyHeader} aria-label="dynamic table">
            <Mui.TableHead>
              <Mui.TableRow>
                {columns.map((column) => (
                  <Mui.TableCell
                    key={column.field}
                    align={column.align || "left"}
                    sortDirection={
                      orderBy === column.field
                        ? (order as SortDirection)
                        : undefined
                    }
                    sx={{ fontWeight: "bold" }}
                  >
                    {column.sortable !== false ? (
                      <Mui.TableSortLabel
                        active={orderBy === column.field}
                        direction={
                          orderBy === column.field
                            ? (order as "asc" | "desc" | undefined)
                            : undefined
                        }
                        onClick={() => handleRequestSort(column.field)}
                      >
                        {column.headerName}
                      </Mui.TableSortLabel>
                    ) : (
                      column.headerName
                    )}
                  </Mui.TableCell>
                ))}
              </Mui.TableRow>
            </Mui.TableHead>
            <Mui.TableBody>
              {paginatedData.map((row, index) => (
                <Mui.TableRow hover key={index}>
                  {columns.map((column: any) => {
                    const value = row[column.field];
                    return (
                      <Mui.TableCell
                        key={`${column.field}-${index}`}
                        align={column.align || "left"}
                      >
                        {column.renderCell
                          ? column.renderCell(value, row)
                          : value}
                      </Mui.TableCell>
                    );
                  })}
                </Mui.TableRow>
              ))}
              {emptyRows > 0 && (
                <Mui.TableRow style={{ height: 53 * emptyRows }}>
                  <Mui.TableCell colSpan={columns.length} />
                </Mui.TableRow>
              )}
              {data.length === 0 && (
                <Mui.TableRow>
                  <Mui.TableCell colSpan={columns.length} align="center">
                    No data available
                  </Mui.TableCell>
                </Mui.TableRow>
              )}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>

        {pagination && (
          <Mui.TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        )}
      </Mui.Paper>
    </Mui.Box>
  );
};

export default DynamicTable;
