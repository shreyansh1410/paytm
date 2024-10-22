import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";

export const Send = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-black">
      <div className="flex flex-col mx-auto max-w-screen-lg text-xl bg-slate-800 p-4 rounded-md">
        <div className="p-2 mx-28">
          <Heading heading={"Send Money"} />
        </div>
        <div className="flex justify-start items-center p-2 mx-28">
          <div className="mr-2 bg-slate-500 rounded-full text-2xl w-12 h-12 items-center justify-center flex">
            {firstName?firstName[0]:"G"}
          </div>
          <span className="font-medium">{`${firstName} ${lastName}`}</span>
        </div>  
        <div className="p-2 h-[100px]">
          <InputBox label={"Amount (in ₹)"} placeholder={"Amount"} />
        </div>
        <div className="p-2 flex justify-end">
          <Button buttonText={"Send"} />
        </div>
      </div>
    </div>
  );
};
