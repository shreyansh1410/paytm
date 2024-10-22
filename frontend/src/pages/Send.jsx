import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export const Send = () => {
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  console.log("user id: " + userId.toString());
  const firstName = searchParams.get("firstName") || "J";
  const lastName = searchParams.get("lastName") || "Doe";

  async function sendMoney() {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/account/transfer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          to: userId.toString(),
          amount: amount,
        },
      });
      console.log(res);
      alert("Transfer successful");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Send Money
        </h1>
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 mr-4 text-lg font-medium text-white bg-blue-500 rounded-full">
            {firstName[0]}
          </div>
          <span className="text-lg font-medium text-gray-700">{`${firstName} ${lastName}`}</span>
        </div>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Amount (in ₹)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="w-full px-3 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end">
          <Button
            buttonText="Send"
            onClick={() => {
              alert("send");
              sendMoney();
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};