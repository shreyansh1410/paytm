import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

const SingleUser = (user) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstName[0]}
            </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
            <div>
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
          <Button
            onClick={(e) => {
              //   navigate("/send?id=" + user._id + "&name=" + user.firstName);
              alert("Hi");
            }}
            buttonText={"Send Money"}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
