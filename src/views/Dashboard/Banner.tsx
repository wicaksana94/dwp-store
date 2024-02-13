import * as React from "react";
import Link from "@mui/material/Link";
import LunarBanner from "../../assets/lunar_banner.png";
import { Paper } from "@mui/material";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Banner() {
  return (
    <React.Fragment>
      <Link href="/">
        <Paper
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
            borderRadius: "1rem",
          }}
        >
          <img
            src={LunarBanner}
            style={{
              borderRadius: "1rem",
              height: "250px",
              objectFit: "cover",
            }}
          />
        </Paper>
      </Link>
    </React.Fragment>
  );
}
