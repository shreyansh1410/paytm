import { Button } from "./Button";

export const Balance = ({ balance }) => {
  return (
    <div className="p-4 px-6">
      <div className="text-2xl">
        <span className="font-bold mr-2"> Your Balance </span>
        <span>₹{balance}</span>
      </div>
    </div>
  );
};
