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
  Grid,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { getCustomers, postNewCustomer } from "../../api";
import { DatePicker } from "@mui/x-date-pickers";
import { differenceInYears, isDate } from "date-fns";
import { useToastStore } from "../../store";

interface Column {
  id: "name" | "email" | "age" | "gender" | "address";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "age",
    label: "Age",
    minWidth: 90,
    format: (value: number) => value.toLocaleString("id-ID"),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 200,
  },
];

interface ICustomers {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

export default function Customer() {
  const [customerData, setCustomerData] = React.useState<ICustomers[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openCreateNewCustomerModal, setOpenCreateNewCustomerModal] =
    React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [birthdate, setBirthdate] = React.useState(null); // Use the appropriate type for your DatePicker
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState("male");
  const [phone, setPhone] = React.useState("");

  const { setMessageToast, setBackgroundClassToast, setIsOpenToast } =
    useToastStore();

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleChangeAddress = (event: any) => {
    setAddress(event.target.value);
  };

  const handleChangeBirthdate = (newDate: Date) => {
    // @ts-ignore
    setBirthdate(newDate);
    if (isDate(newDate)) {
      // Get the difference in years between the current date and the newDate
      const yearsDifference = differenceInYears(new Date(), newDate);
      setAge(yearsDifference);
    }
  };

  const handleChangeGender = (event: any) => {
    setGender(event.target.value);
  };

  const handleChangeTelInput = (newPhone: any) => {
    setPhone(newPhone);
  };

  async function createNewCustomer() {
    const res = await postNewCustomer({
      name,
      email,
      address,
      age,
      gender,
      phone,
    });
    if (res.code === 201) {
      setMessageToast(res.message);
      setBackgroundClassToast("green");
      setIsOpenToast(true);
    } else {
      setMessageToast(res.message);
      setBackgroundClassToast("red");
      setIsOpenToast(true);
    }

    handleCloseCreateNewCustomerModal();
    location.reload();
  }

  const handleClickOpenCreateNewCustomerModal = () => {
    setOpenCreateNewCustomerModal(true);
  };

  const handleCloseCreateNewCustomerModal = () => {
    setOpenCreateNewCustomerModal(false);
  };

  React.useEffect(() => {
    reqGetCustomers();
  }, []);

  async function reqGetCustomers() {
    const reqCustomerData = await getCustomers();
    setCustomerData(reqCustomerData);
  }

  function handleSelectRow(data: ICustomers) {
    console.log(data);
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
      <Dialog
        fullScreen={fullScreen}
        open={openCreateNewCustomerModal}
        onClose={handleCloseCreateNewCustomerModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Create New Customer"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "0.5rem",
            }}
          >
            <TextField
              fullWidth
              label="Name"
              id="name"
              value={name}
              onChange={handleChangeName}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "0.5rem",
            }}
          >
            <TextField
              fullWidth
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "0.5rem",
            }}
          >
            <TextField
              fullWidth
              id="address"
              label="Address"
              multiline
              maxRows={4}
              value={address}
              onChange={handleChangeAddress}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "0.5rem",
            }}
          >
            <DatePicker
              label="Birthdate"
              value={birthdate}
              // @ts-ignore
              onChange={handleChangeBirthdate}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "0.5rem",
            }}
          >
            <FormControl>
              <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                defaultValue="male"
                name="radio-buttons-group"
                value={gender}
                onChange={handleChangeGender}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginTop: "0.5rem",
            }}
          >
            <FormControl>
              <FormLabel id="phone-label" style={{ marginBottom: "0.75rem" }}>
                Phone
              </FormLabel>
              <MuiTelInput value={phone} onChange={handleChangeTelInput} />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseCreateNewCustomerModal}>
            Cancel
          </Button>
          <Button onClick={() => createNewCustomer()} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{ fontSize: "12px" }}
        marginBottom={"1rem"}
      >
        <Grid>
          <Typography
            component="h1"
            gutterBottom
            style={{ fontWeight: 700, fontSize: "1.5rem" }}
          >
            Customer
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => handleClickOpenCreateNewCustomerModal()}
          >
            Create New Customer
          </Button>
        </Grid>
      </Grid>

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
              {customerData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleSelectRow(row)}
                    >
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
          count={customerData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
