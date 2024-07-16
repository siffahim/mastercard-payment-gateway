import { useState } from "react";
import { useNavigate } from "react-router-dom";
import master from "../assets/image.png";
import visa from "../assets/visa.png";
import { baseUrl } from "../config";
import Input from "./shared/Input";

interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  amount: string;
}

const Checkout = () => {
  const [userInfo, setUserInfo] = useState<IUser>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    amount: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    const newInfo = { ...userInfo, [name]: value } as IUser;
    setUserInfo(newInfo);
  };

  const handleCheckout = async () => {
    if (
      userInfo.firstName !== "" &&
      userInfo.lastName !== "" &&
      userInfo.phoneNumber !== "" &&
      userInfo.amount !== ""
    ) {
      const response = await baseUrl.post("/session", { userInfo });
      const data = await response.data;
      setError("");
      if (data.data && userInfo.amount) {
        navigate(`/pay/${userInfo.amount}/${data.data}`);
      }
    } else if (Number(userInfo.amount) < 1) {
      setError("Amount must be greater than or equal to 1.");
    } else {
      setError("All the  field are mandatory");
    }
  };

  return (
    <div className="w-full lg:w-[500px] mx-auto text-left">
      <div className="p-4 rounded border">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
            <Input
              type="text"
              title="First Name"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
            />
            <Input
              type="text"
              title="Last Name"
              placeholder="Enter last name"
              name="lastName"
              onChange={handleChange}
            />
          </div>

          <Input
            type="number"
            title="Phone number"
            name="phoneNumber"
            placeholder="Enter phone number"
            onChange={handleChange}
          />
          <div>
            <label htmlFor="">Amount</label>
            <div className="mt-2 flex items-center gap-1">
              <select
                name=""
                id=""
                className="border border-gray-200 w-[25%] bg-transparent py-2 rounded outline-none px-2 focus:border-green-500"
                disabled
              >
                <option value="USD">USD</option>
              </select>
              <input
                type="number"
                className="border border-gray-200 w-full bg-transparent py-2 rounded outline-none px-2 focus:border-green-500"
                name="amount"
                placeholder="amount"
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="text-red-500 mt-2">{error}</p>

          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 w-full mt-5 rounded flex items-center gap-2 justify-center group"
            onClick={handleCheckout}
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-center mt-7">
        <div className=" px-2 py-1 rounded">
          <img src={visa} alt="" className="w-14" />
        </div>
        <div className=" px-2 py-1 rounded">
          <img src={master} alt="" className="w-14" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
