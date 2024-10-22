import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";

export const Send = ({ id, firstName, lastName }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="flex flex-col mx-auto max-w-screen-md text-xl bg-slate-400 p-4 rounded-md">
        <div className="p-2">
          <Heading heading={"Send Money"} />
        </div>
        <div className="flex justify-start items-center p-2">
          <div className="mr-2 bg-slate-500 rounded-full text-2xl w-12 h-12 items-center justify-center flex">
            {firstName?firstName[0]:"G"}
          </div>
          <span className="font-medium">{firstName}</span>
          <span className="font-medium">{lastName}</span>
        </div>
        <div className="p-2">
          <InputBox label={"Amount (in ₹)"} placeholder={"Amount"} />
        </div>
        <div className="p-2">
          <Button buttonText={"Send"} />
        </div>
      </div>
    </div>
  );
};
