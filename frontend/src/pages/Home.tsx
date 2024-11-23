import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { reset } from "../redux/slices/userInfo";
import { Link, useNavigate } from "react-router-dom";
import ManageNote from "../components/ManageNote";

export const Home = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) {
      navigate("/signin");
    }
  });

  const dispatch = useDispatch();
  return (
    <>
      <main>
        <div className="p-2 pt-3  p-md-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-4">
                    <img src="/small-logo.svg" alt="" />
                    <h5 className="m-0">Dashboard</h5>
                  </div>
                  <Link to="/signin" onClick={() => dispatch(reset())}>
                    Sign Out
                  </Link>
                </div>
                <div className="shadow-full align-items-center mt-5 mb-3 p-3 rounded-round">
                  <h4 className="fw-bolder py-2 m-0">Welcome, {user.name} !</h4>
                  <p className="text-secondary py-2 m-0">Email: {user.email}</p>
                </div>
                <ManageNote />
              </div>
              <div className="col-md-7 d-none d-md-block d-large-block">
                <div className="right-flower">
                  <div className="background-flower">
                    <img
                      src="/background.png"
                      className="rounded-round"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </main>
    </>
  );
};
