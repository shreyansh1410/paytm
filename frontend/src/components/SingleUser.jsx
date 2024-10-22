import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Send } from "../pages/Send";

const SingleUser = ({ id, firstName, lastName }) => {
  const navigate = useNavigate();
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 p-4">
        <div className="flex items-center">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {firstName[0]}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div>
              {firstName} {lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center h-full">
          <Button
            onClick={(e) => {
              navigate(
                "/send?id=" +
                  id +
                  "&firstName=" +
                  firstName +
                  "&lastName=" +
                  lastName
              );
              // <Send id={id} firstName={firstName} lastName={lastName} />;
              // alert("Hi");
            }}
            buttonText={"Send Money"}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
