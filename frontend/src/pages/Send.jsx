import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";

export const Send = (user) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="flex flex-col mx-auto max-w-screen-md text-xl bg-slate-400 p-4 rounded-md">
        <div className="p-2">
          <Heading heading={"Send Money"} />
        </div>
        <div className="flex justify-start items-center p-2">
          <div className="mr-2 bg-slate-500 rounded-full text-2xl w-12 h-12 items-center justify-center flex">
            {user.name[0]}
          </div>
          <div className="font-medium">{user.name}</div>
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
