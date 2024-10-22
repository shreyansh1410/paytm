import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ArrowRight } from "lucide-react";

export const Send = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const firstName = searchParams.get("firstName") || "J";
  const lastName = searchParams.get("lastName") || "Doe";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-100">
          Send Money
        </h1>
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 mr-4 text-lg font-medium text-gray-800 bg-gray-300 rounded-full">
            {firstName[0]}
          </div>
          <span className="text-lg font-medium text-gray-300">{`${firstName} ${lastName}`}</span>
        </div>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Amount (in ₹)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="w-full px-3 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end">
          <Button
            buttonText="Send"
            onClick={() => {
              alert("send");
            }}
          >
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
