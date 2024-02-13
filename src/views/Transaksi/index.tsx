import * as React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getTransactions } from "../../api";

interface Column {
  id: "date" | "name" | "paymentMethod" | "amount" | "orderedBy";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "name", label: "Product Name", minWidth: 170 },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 170,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 130,
    format: (value: number) => value.toLocaleString("id-ID"),
  },
  {
    id: "orderedBy",
    label: "Ordered By",
    minWidth: 170,
  },
];

interface ITransactionData {
  date: string;
  name: string;
  paymentMethod: string;
  sale: number;
  amount: number;
}

export default function Transaksi() {
  const [transactionData, setTransactionData] = React.useState<
    ITransactionData[]
  >([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    reqGetTransactions();
  }, []);

  async function reqGetTransactions() {
    const reqSalesData = await getTransactions();
    setTransactionData(reqSalesData);
  }
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography
        component="h1"
        gutterBottom
        style={{ fontWeight: 700, fontSize: "1.5rem" }}
      >
        Transaksi
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
