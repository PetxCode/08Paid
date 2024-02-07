import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[70px] w-full justify-center flex items-center">
      <div className="w-[90%] flex justify-between">
        <label>Logog</label>
        <Link to="/login">
          <button className="btn btn-primary ">Get Started</button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
