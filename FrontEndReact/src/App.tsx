
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import NoPage from "./components/NoPage";
// import Temp from "./components/Temp";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Cars from "./pages/admin/Cars";
import AddCar from "./pages/admin/AddCar";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme()

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<p>Home</p>} />
            <Route path="login" element={<SignIn/>} />
            <Route path="register" element={<Register/>} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="admin/*" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cars" element={<Cars />} />
              <Route path="cars/add" element={<AddCar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
