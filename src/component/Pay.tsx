import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import card from "../assets/card.png";
import { baseUrl } from "../config";
import Input from "./shared/Input";

const Pay = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
  });
  const { session, price } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    const newInfo = { ...cardInfo, [name]: value };
    setCardInfo(newInfo);
  };

  const handleCheckout = async () => {
    setLoading(true);
    let data;
    if (cardInfo.cardNumber.length < 16) {
      setError("Card number must bet 16 digit");
      setLoading(false);
    }
    if (
      session &&
      price &&
      cardInfo.cardNumber !== "" &&
      cardInfo.expiryMonth !== "" &&
      cardInfo.expiryYear !== "" &&
      cardInfo.securityCode !== ""
    ) {
      const value = {
        session,
        price,
        ...cardInfo,
      };
      const response = await baseUrl.post("/pay", { value });
      data = await response.data;
      setLoading(false);
    } else {
      setError("All the  field are mandatory");
      setLoading(false);
    }

    if (data.data.order.status !== "FAILED") {
      const responseValue = {
        creationTime: data.data.order.creationTime,
        currency: data.data.order.currency,
        id: data.data.order.id,
        lastUpdatedTime: data.data.order.lastUpdatedTime,
        merchantAmount: data.data.order.merchantAmount,
        merchantCategoryCode: data.data.order.merchantCategoryCode,
        merchantCurrency: data.data.order.merchantCurrency,
        reference: data.data.order.reference,
        status: data.data.order.status,
        number: data.data.sourceOfFunds.provided.card.number,
        receipt: data.data.transaction.receipt,
        stan: data.data.transaction.stan,
      };

      sessionStorage.setItem("payment", JSON.stringify(responseValue));
      navigate("/success");
    } else {
      navigate("/failed");
    }
  };

  return (
    <div className="w-full lg:w-[500px] mx-auto text-left">
      <div className="p-4 rounded border">
        <div className="my-5 mb-8">
          <img src={card} className="mx-auto" alt="" />
        </div>
        <div className="w-full mx-auto">
          <Input
            type="number"
            title="Card Number"
            name="cardNumber"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length >= 17) {
                target.value = target.value.slice(0, 16);
              }
            }}
            placeholder="Enter card number"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              title="Expiry Month"
              name="expiryMonth"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value.length >= 3) {
                  target.value = target.value.slice(0, 2);
                }
              }}
              placeholder="Enter expiry month"
              onChange={handleChange}
            />
            <Input
              type="number"
              title="Expiry Year"
              name="expiryYear"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value.length >= 3) {
                  target.value = target.value.slice(0, 2);
                }
              }}
              placeholder="Enter expiry year"
              onChange={handleChange}
            />
          </div>

          <Input
            type="number"
            title="Security Code"
            name="securityCode"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length >= 5) {
                target.value = target.value.slice(0, 4);
              }
            }}
            placeholder="Enter security code"
            onChange={handleChange}
          />
          <p className="text-red-500 mt-5">{error}</p>
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 w-full mt-5 rounded flex items-center gap-2 justify-center group h-12"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? <ClipLoader color="white" /> : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pay;
