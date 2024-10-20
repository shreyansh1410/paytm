import { useRef } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameRef = useRef(null); // set to null initially
  const firstNameref = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  async function onclick() {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/user/signup",
        data: {
          username: usernameRef.current.value, // get the value from the input
          firstName: firstNameref.current.value,
          lastName: lastNameRef.current.value,
          password: passwordRef.current.value,
        },
      });
      console.log(res);
      if (res.data.msg === "User created successfully") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading heading={"Sign up"} />
          <SubHeading
            subHeading={"Enter your information to create an account"}
          />
          <InputBox
            innerRef={firstNameref}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            innerRef={lastNameRef}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            innerRef={usernameRef}
            placeholder="johndoe@gmail.com"
            label={"Email"}
          />
          <InputBox
            innerRef={passwordRef}
            placeholder="........"
            label={"Password"}
          />
          <div className="pt-4">
            <Button buttonText={"Sign Up"} onClick={onclick} />
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
