import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  email: string;
}

export const OtpVarify: React.FC<Props> = (props) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    setEmail(props.email);
    setUrl(import.meta.env.VITE_SERVER)
  }, []);

  const handleOtpSend = async (e: any) => {
    try {
      e.preventDefault();
      console.log(email, otp)
      const { data } = await axios.post(url+"/auth/validate-otp", { email, otp });
        if(data.success){
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
      console.log("Internal Error");
      toast.error("Internal Error");
    }
  };
  return (
    <>
      <form className="signup-form" onSubmit={(e) => handleOtpSend(e)}>
        <div className="border my-2 rounded-round py-2 px-3 fs-6 text-secondary position-relative sent-to">
          <span className="position-absolute">Sent to </span>
          {email}
        </div>
        <label>
          <input
            type={showPass ? "text" : "password"}
            className="pe-5"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <span>OTP</span>
          <i
            onClick={() => setShowPass(!showPass)}
            className={`fa-regular fa-eye${showPass ? "" : "-slash"}`}
          ></i>
        </label>
        <button className="btn bg-high text-white fw-bold py-3 w-100">
          Validate Email
        </button>
      </form>
    </>
  );
};
