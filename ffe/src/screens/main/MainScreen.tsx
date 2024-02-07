import React, { useState } from "react";
import BlockScreen from "./BlockScreen";
import { useDispatch, useSelector } from "react-redux";
import { onChangeState } from "../../global/reduxState";
import { useParams } from "react-router-dom";
import { afterPayment } from "../../api/API";

const MainScreen = () => {
  const value = useParams();
  const user = useSelector((state: any) => state.user);

  const data = Array.from({
    length: 10,
  });

  const [state, setState] = useState<Boolean>(true);

  const dispatch = useDispatch();

  console.log(window.location.href);
  console.log(window.location.href.split("trxref=")[1].split("=")[1]);

  console.log();

  if (
    window.location.href.split("trxref=")[1].split("=")[0].split("&")[0] ===
    window.location.href.split("trxref=")[1].split("=")[1]
  ) {
    afterPayment(user._id);
  }
  return (
    <>
      <div className="flex flex-wrap w-full gap-4">
        {data.map((props: any, i: number) => (
          <div className="card w-96 bg-base-100 shadow-xl flex justify-center items-center ">
            <figure className="px-10 pt-10">
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    dispatch(onChangeState("peter"));
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {state && <BlockScreen />}

      {/* <BlockScreen /> */}
    </>
  );
};

export default MainScreen;
