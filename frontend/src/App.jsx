import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";
import {Send} from "./pages/Send.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={"Hello"} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send name={"Harki"}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
