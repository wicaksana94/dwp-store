import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Chart from "./Chart";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Typography
        component="h1"
        gutterBottom
        style={{ fontWeight: 700, fontSize: "1.5rem" }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Buy Item */}
        <Grid item xs={12}>
          {/* Chart */}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
