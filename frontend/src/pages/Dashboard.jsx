import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";

const Dashboard = () => {
  const [balance, setBalance] = useState("****");
  const [firstName, setFirstName] = useState("");
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
      console.log(err.message);
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
      }
      setFirstName(tokenDecoded.firstName);
      console.log(tokenDecoded.id);
    }
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen font-roboto">
      {/* Appbar fixed at the top */}
      <Appbar
        className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md"
        firstName={firstName}
      />

      <main className="flex-grow mt-16 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Balance balance={balance} />
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                buttonText={`${
                  balance === "****" ? "Get Balance" : "Refresh Balance"
                }`}
                onClick={getBalance}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Send money to others</h2>
            <Users />
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8 py-4">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          © 2024 Your Bank Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
