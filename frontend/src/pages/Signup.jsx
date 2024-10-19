import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading heading={"Sign up"} />
          <SubHeading
            subHeading={"Enter your infromation to create an account"}
          />
          <InputBox placeholder="John" label={"First Name"} />
          <InputBox placeholder="Doe" label={"Last Name"} />
          <InputBox placeholder="johndoe@gmail.com" label={"Email"} />
          <InputBox placeholder="........" label={"Password"} />
          <div className="pt-4">
            <Button buttonText={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
