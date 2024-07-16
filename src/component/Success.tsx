import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Success = () => {
  const paymentItem = sessionStorage.getItem("payment");
  const data = paymentItem ? JSON.parse(paymentItem) : {};
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "",
  });

  return (
    <div className="w-full flex items-center justify-center">
      <>
        <div className=" w-2/4 mx-auto">
          <h2 className="text-4xl mt-12 text-center">Payment Successful</h2>
          <p className="my-3 text-xl text-center">
            Thank you! Your payment is completed
          </p>
          <div className="border p-4 rounded" ref={componentRef}>
            {Object.entries(data).map(([field, value]) => (
              <p key={field} className="mb-1">
                <span className="font-medium mt-2">{field}</span>:{value}
              </p>
            ))}
          </div>
          <div>
            <button
              className="bg-blue-700 text-white p-2 rounded mt-2"
              onClick={handlePrint}
            >
              Download
            </button>
          </div>
        </div>
        {/* <Confetti /> */}
      </>
    </div>
  );
};

export default Success;
