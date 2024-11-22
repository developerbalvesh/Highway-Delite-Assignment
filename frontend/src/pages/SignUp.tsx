import { useEffect, useState } from "react";
import { OtpVarify } from "../components/OtpVarify";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface SignUpForm {
  name: string;
  date_of_birth: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  message: string;
  error: any | null;
}

const SignUp = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [user, setUser] = useState<SignUpForm>({
    name: "",
    date_of_birth: "",
    email: "",
    password: "",
  });
  const [doneSignup, setDoneSignup] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post<SignUpResponse>(
        url + "/auth/signup",
        user
      );
      console.log(data);
      if (data.success) {
        const { data } = await axios.post<SignUpResponse>(
          url + "/auth/send-otp",
          {
            email: user.email,
          }
        );
        toast.success(data.message);
        setDoneSignup(true);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while signing up!");
      console.log(error);
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
                  <h2 className="fw-bolder mt-0 mt-md-5">Sign Up</h2>
                  <p className="text-secondary">
                    Sign up to enjoy the feature of HD
                  </p>
                  {!doneSignup && (
                    <>
                      <form
                        className="signup-form"
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <label>
                          <input
                            value={user.name}
                            onChange={(e) =>
                              setUser((u) => ({ ...u, name: e.target.value }))
                            }
                            type="text"
                            required
                          />
                          <span>Your Name</span>
                        </label>
                        <label>
                          <input
                            value={user.date_of_birth}
                            onChange={(e) =>
                              setUser((u) => ({
                                ...u,
                                date_of_birth: e.target.value,
                              }))
                            }
                            type="date"
                            required
                          />
                          <span>Date of Birth</span>
                        </label>
                        <label>
                          <input
                            value={user.email}
                            onChange={(e) =>
                              setUser((u) => ({ ...u, email: e.target.value }))
                            }
                            type="email"
                            required
                          />
                          <span>Email</span>
                        </label>
                        <label>
                          <input
                            value={user.password}
                            onChange={(e) =>
                              setUser((u) => ({
                                ...u,
                                password: e.target.value,
                              }))
                            }
                            type={showPass ? "text" : "password"}
                            className="pe-5"
                            required
                          />
                          <span>Password</span>
                          <i
                            onClick={() => setShowPass(!showPass)}
                            className={`fa-regular fa-eye${
                              showPass ? "" : "-slash"
                            }`}
                          ></i>
                        </label>
                        <button
                          disabled={loading}
                          className="btn bg-high text-white fw-bold py-3 w-100"
                        >
                          Sign up
                        </button>
                      </form>
                    </>
                  )}
                  {doneSignup && (
                    <>
                      <OtpVarify email={user.email} />
                    </>
                  )}
                  <div className="position-relative">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-2">
                      or
                    </span>
                  </div>
                  <div className="border p-2 rounded-round cursor-pointer">
                    <h5 className="text-center p-0 m-0">
                      Continue with google <img src="/google.svg" alt="" />
                    </h5>
                  </div>
                  <div className="py-3">
                    <p className="text-secondary fs-6 text-center">
                      Already have an account??{" "}
                      <a className="text-primary" href="/signin">
                        Sign in
                      </a>
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

export default SignUp;
