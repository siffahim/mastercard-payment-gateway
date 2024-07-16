import { useNavigate } from "react-router-dom";
import img from "../assets/fail.png";

const Failed = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-center">
      <div className="text-center  w-2/4 mx-auto">
        <img className="mx-auto" width="50%" src={img} alt="" />
        <h2 className="text-4xl mt-2">Payment failed</h2>

        <button
          onClick={() => navigate("/")}
          style={{
            color: "#fff",
            border: 0,
          }}
          className="bg-[#fb7c29] hover:bg-red-500 mt-5 h-11 font-normal px-5 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Failed;
