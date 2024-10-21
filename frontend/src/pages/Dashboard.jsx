import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [balance, setBalance] = useState("****");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function getBalance() {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/account/balance",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);
      if (res.status === 200) {
        setBalance(res.data.balance);
        console.log(balance);
      }
    } catch (err) {
      console.log(err.messsage);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      const tokenDecoded = jwtDecode(token);
      if (tokenDecoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        setFirstName(tokenDecoded.firstName);
      }
      console.log(tokenDecoded.id);
    }
  }, []);

  return (
    <div className="bg-slate-300 flex flex-col h-screen font-roboto">
      {/* Appbar fixed at the top */}
      <Appbar
        className="fixed top-0 left-0 right-0 z-10"
        firstName={firstName}
      />
      <div className="flex items-center my-2 border-b-2 border-gray-400">
        <Balance balance={balance} />
        <Button
          className="my-2"
          buttonText={`${
            balance === "****" ? "Get Balance" : "Refresh Balance"
          }`}
          onClick={getBalance}
        />
      </div>
      <Users />
    </div>
  );
};

export default Dashboard;
