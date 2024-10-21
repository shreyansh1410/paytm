import { useRef } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function onclick() {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/user/signin",
        data: {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
      });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="h-screen flex justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white min-w-[350px] text-center p-2 min-h-[450px] px-4 flex flex-col justify-between">
          <div>
            <Heading heading={"Sign In"} />
            <SubHeading subHeading={"Enter your infromation to log in"} />
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
          </div>
          <div>
            <div className="pt-4">
              <Button onClick={onclick} buttonText={"Sign In"} />
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
