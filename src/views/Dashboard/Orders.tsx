import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { getTransactions } from "../../api";

interface ITransactionData {
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  amount: number;
}

export default function Orders() {
  const [transactionData, setTransactionData] = React.useState<
    ITransactionData[]
  >([]);

  React.useEffect(() => {
    reqGetTransactions();
  }, []);

  async function reqGetTransactions() {
    const reqSalesData = await getTransactions(3);
    setTransactionData(reqSalesData);
  }

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount.toLocaleString(
                "id-ID"
              )}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/transaksi" sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
