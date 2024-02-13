import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { getRecentTopup } from "../../api";

interface IRecentTopup {
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  amount: number;
}

const initRecentTopup = {
  id: 0,
  date: "01 Jan 1970",
  name: "",
  paymentMethod: "",
  amount: 0,
};

export default function Deposits() {
  const [recentTopup, setRecentTopup] =
    React.useState<IRecentTopup>(initRecentTopup);

  React.useEffect(() => {
    reqGetRecentTopup();
  }, []);

  async function reqGetRecentTopup() {
    const reqRecentTopup = await getRecentTopup();
    setRecentTopup(reqRecentTopup[0]);
  }

  return (
    <React.Fragment>
      <Title>Recent Top Up</Title>
      <Typography component="p" variant="h4">
        Rp {recentTopup?.amount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {recentTopup?.date} by {recentTopup?.name}
      </Typography>
    </React.Fragment>
  );
}
