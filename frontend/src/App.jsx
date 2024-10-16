import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Send from "./components/Send.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={"Hello"} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
