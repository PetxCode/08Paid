import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/API";
import { onUser } from "../../global/reduxState";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    try {
      loginUser({
        email,
        password,
      })
        .then((res) => {
          if (res.status === 201) {
            dispatch(onUser(res.data));
          } else {
            console.log("something went wrong", res);
          }
        })
        .then(() => {
          navigate("/main");
        });
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex justify-center items-center ">
      <div className=" border p-10 rounded-md">
        <div className="flex flex-col w-[300px] gap-3 ">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />

          <button className="btn btn-primary" onClick={onHandleLogin}>
            Login
          </button>
          <Link to="/register" className="font-medium text-[14px]">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
