import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { getOrders } from "../../api";

interface IOrders {
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  amount: number;
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const [ordersData, setOrdersData] = React.useState<IOrders[]>([]);

  React.useEffect(() => {
    reqGetOrders();
  }, []);

  async function reqGetOrders() {
    const reqSalesData = await getOrders(3);
    setOrdersData(reqSalesData);
  }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`Rp ${row.amount}`}</TableCell>
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
