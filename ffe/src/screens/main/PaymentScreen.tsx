import { usePaystackPayment } from "react-paystack";
import { makePayment } from "../../api/API";
import { useUser } from "../../hooks/useUser";
import { useSelector } from "react-redux";

const PaymentScreen = () => {
  const user = useSelector((state: any) => state.user);

  const { data } = useUser(user._id);
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          makePayment({
            email: data?.data?.email,
            amount: "30000",
          }).then((res: any) => {
            window.location.replace(res?.data.data.authorization_url);
          });
        }}
      >
        Payment Now
      </button>
    </div>
  );
};

export default PaymentScreen;
