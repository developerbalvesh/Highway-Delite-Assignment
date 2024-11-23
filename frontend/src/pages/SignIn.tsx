import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setUserLogin } from "../helper/userHelper";
import { useDispatch } from "react-redux";
import { set } from "../redux/slices/userInfo";
import { useAppSelector } from "../redux/hooks";

interface SignUpForm {
  email: string;
  otp: string;
}

interface sentOtpResp {
  success: boolean;
  message: string;
}

interface SignInResp {
  success: boolean;
  message: string;
  error: any | null;
  user: {
    name: string;
    date_of_birth: string;
    email: string;
    token: string;
  };
}

const SignIn = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [user, setUser] = useState<SignUpForm>({
    email: "",
    otp: "",
  });

  const loggedUser = useAppSelector((state) => state.user);

  useEffect(() => {
    if (loggedUser.token) {
      navigate("/");
    }
  });

  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      const { data } = await axios.post<SignInResp>(
        url + "/auth/otp-signin",
        user
      );

      if (data.success) {
        toast.success(data.message);
        console.log(data);
        setUserLogin(data.user);
        dispatch(set(data.user));
        navigate("/");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Internal error");
    }
  };

  const sendOtp = async () => {
    try {
      if (!user.email) {
        toast.error("Enter valid email");
        return;
      }
      if (otpSent) {
        return;
      }

      const { data } = await axios.get<sentOtpResp>(
        url + "/auth/send-otp-signin/" + user.email
      );

      if (data.success) {
        toast.success(data.message);
        setOtpSent(true);
      } else {
        setOtpSent(false);
        toast.error(data.message);
      }
    } catch (error) {
      setOtpSent(false);
      console.log(error);
      toast.error("Internal error");
    }
  };

  useEffect(() => {
    setUrl(import.meta.env.VITE_SERVER);
  }, []);
  return (
    <main>
      <ToastContainer />
      <div className="p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="left-box position-relative d-flex flex-column align-items-center justify-content-center">
                <div className="w-80">
                  <img className="logo" src="/logo.svg" alt="" />
                  <h2 className="fw-bolder mt-0 mt-md-5">Sign In</h2>
                  <p className="text-secondary">
                    Please login to continue to your account.
                  </p>
                  <form className="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="signup-form">
                      <label>
                        <input
                          value={user.email}
                          onChange={(e) => {
                            setUser((u) => ({
                              ...u,
                              email: e.target.value,
                            }));
                            setOtpSent(false);
                          }}
                          type="email"
                          required
                        />
                        <span>Email</span>
                      </label>
                      <label>
                        <input
                          type={showPass ? "text" : "password"}
                          className="pe-5"
                          required
                          onFocus={() => sendOtp()}
                          value={user.otp}
                          onChange={(e) =>
                            setUser((usr) => ({
                              ...usr,
                              otp: e.target.value,
                            }))
                          }
                        />
                        <span>OTP</span>
                        <i
                          onClick={() => setShowPass(!showPass)}
                          className={`fa-regular fa-eye${
                            showPass ? "" : "-slash"
                          }`}
                        ></i>
                      </label>
                    </div>
                    <Link to="/signin" className="mb-2 d-block">
                      Forget password?
                    </Link>
                    <label className="d-flex gap-2 mb-2">
                      <input type="checkbox" />{" "}
                      <span className="cursor-pointer">Keep me logged in</span>
                    </label>
                    <button
                      disabled={loading}
                      className="btn bg-high text-white fw-bold py-3 w-100"
                    >
                      Sign In
                    </button>
                  </form>

                  <div className="position-relative">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-2">
                      or
                    </span>
                  </div>
                  <div className="border p-2 rounded-round cursor-pointer">
                    <h5 className="text-center p-0 m-0 fs-6">
                      Continue with google <img src="/google.svg" alt="" />
                    </h5>
                  </div>
                  <div className="py-3">
                    <p className="text-secondary fs-6 text-center">
                      Need an account??{" "}
                      <Link className="text-primary" to="/signup">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 d-none d-sm-none d-md-block">
              <div className="background-flower text-end">
                <img src="/background.png" className="rounded-round" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
