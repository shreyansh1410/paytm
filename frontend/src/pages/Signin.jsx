import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
const Signin = () => {
  return (
    <div className="h-screen flex justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white min-w-[350px] text-center p-2 min-h-[450px] px-4 flex flex-col justify-between">
          <div>
            <Heading heading={"Sign In"} />
            <SubHeading subHeading={"Enter your infromation to log in"} />
            <InputBox placeholder="johndoe@gmail.com" label={"Email"} />
            <InputBox placeholder="........" label={"Password"} />
          </div>
          <div>
            <div className="pt-4">
              <Button buttonText={"Sign In"} />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
