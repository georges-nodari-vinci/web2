import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <div>
      <Header />
      <Box marginY={"50px"}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default App;
