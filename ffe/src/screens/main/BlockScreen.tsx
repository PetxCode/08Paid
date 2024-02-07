import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChangeState } from "../../global/reduxState";
import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";

const BlockScreen = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const user = useSelector((state: any) => state.user);

  const { data } = useUser(user._id);

  useEffect(() => {
    if (data?.data?.status !== "" && data?.data?.isActive) {
      setState(false);
    } else if (data?.data?.status === "" && !data?.data?.isActive) {
      setState(true);
    }
  }, [state, data]);

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        checked={state}
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <Link to="/action">
              <label
                htmlFor="my_modal_6"
                onClick={() => {
                  setState(false);
                  dispatch(onChangeState(""));
                }}
                className="btn"
              >
                Pay Up
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockScreen;
