
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import NoPage from "./components/NoPage";
// import Temp from "./components/Temp";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react";
import Cars from "./pages/admin/Cars";
import AddCar from "./pages/admin/AddCar";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CssBaseline from '@mui/material/CssBaseline';
import Temp from "./components/Temp";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/client/Home";
import { grey } from '@mui/material/colors';




const lightColor = grey[50];
const greyColor = grey[800];

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    secondary: true;
  }
}



declare module '@mui/material/styles' {
  
  interface SimplePaletteColorOptions {
    lightColor?: string;
    grayColor?: string;
  }
}

const defaultTheme = createTheme({
  palette : {
    primary: {
      main : '#007bff',
    },
    secondary:{
      main : lightColor,
      light : greyColor,
      dark: greyColor,
      contrastText : greyColor,
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})


export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home/>} />
            <Route path="login" element={<SignIn/>} />
            <Route path="register" element={<Register/>} />
            <Route path="temp" element={<Temp/>} />
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
