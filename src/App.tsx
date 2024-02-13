import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./views/Layout/DefaultLayout";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Transaksi from "./views/Transaksi";
import Customer from "./views/Customer";

import { useUserStore } from "./store";

function App() {
  const token = useUserStore((state) => state.user.token);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={token ? <Layout /> : <Navigate to="/login" />}
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/customer" element={<Customer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
