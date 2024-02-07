import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleRegister = () => {
    try {
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

          <button className="btn btn-primary" onClick={onHandleRegister}>
            Register
          </button>
          <Link to="/login" className="font-medium text-[14px]">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
