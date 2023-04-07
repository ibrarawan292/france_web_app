import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsEye, BsTwitter } from "react-icons/bs";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import TotalServices from "../../TotalServices";

function Login() {
  const [ForgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  // VERIFICATION
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnDisabled2, setBtnDisabled2] = useState(false);
  const [loginCheck, setLoginCheck] = useState("true");

  let navigate = useNavigate();

  //   useEffect(() => {
  //     var isLogin = localStorage.getItem("UserIsLogin");
  //     if (isLogin === "true") {
  //       setLoginCheck(isLogin);
  //       navigate("/user-dashboard");
  //     } else {
  //       setLoginCheck("");
  //     }
  //     setShowModal(false);
  //     setHeaderShow(false);
  //   }, []);

    // LOGIN API STARTS
    const handleLogin = async () => {
        // localStorage.setItem("login", JSON.stringify(userName, Password));
      const response = await TotalServices.login({
        email: email,
        password: Password,
      });
      console.log(email, Password)
      console.log(response, "res");

      if (response.status === 200) {
        setBtnDisabled(false);
        // setShowModal(false);
        // setHeaderShow(false);

        let token = {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        };

        localStorage.setItem("UserAuth", JSON.stringify(token));
        localStorage.setItem("UserIsLogin", "true");
        navigate("/");
      } else if (response.status !== 200) {
        document.getElementById("error").style.display = "block";
        setBtnDisabled(false);
        toast.error(response.data.message);
      }
    };
    // LOGIN API ENDS

  //   // FORGOT PASSWORD API STARTS
  //   const ForgotPassApi = async () => {
  //     setBtnDisabled2(true);

  //     const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //     if (forgetEmail === "") {
  //       document.getElementById("email").innerHTML = "(Enter Email Address!)";
  //       setBtnDisabled2(false);
  //     } else if (regex.test(forgetEmail)) {
  //       document.getElementById("email").innerHTML = "";

  //       try {
  //         var res = await TotalServicesUser.ForgotPassword({
  //           email: forgetEmail,
  //         });

  //         if (res.data.status === 200) {
  //           toast.success(res.data.message, {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           setBtnDisabled2(false);
  //           setForgetEmail("");
  //           setForgotPass(false);
  //         } else if (res.data.status === 406) {
  //           toast.error(res.message);
  //         } else if (res.data.status === 404) {
  //           document.getElementById("email").innerHTML = "(Email not found!)";
  //           toast.error("Email not found!!");
  //         }
  //         setBtnDisabled2(false);
  //       } catch (error) {
  //         console.log("error ", error);
  //         // toast.error(error.message);
  //         setBtnDisabled(false);
  //       }
  //     } else {
  //       document.getElementById("email").innerHTML =
  //         "(Email Address is not valid)";
  //       toast.error("Email Address is not valid");
  //       document.getElementById("email2").innerHTML = "";
  //       setBtnDisabled2(false);
  //     }
  //   };
  // FORGOT PASSWORD API ENDS

  return (
    <>
      {/* {loginCheck !== "true" && ( */}
        <div className="w-full h-screen flex flex-col lg:items-center lg:justify-center lg:flex-row">
          <Helmet>
            <title>France-Web-App | Login</title>
          </Helmet>

          <div className="w-full lg:w-[50%] h-full relative flex flex-col items-center justify-center">
            <form
              className="w-10/12 sm:w-6/12 text-center lg:pb-0"
              onSubmit={(e) => (e.preventDefault(), handleLogin())}
            >
              <div
                style={{ color: "var(--txtColor1)" }}
                className="mt-10 w-full flex flex-col items-center"
              >
                <img className="w-86 pt-2 pb-10 mr-8" src={""} alt="logo" />
              </div>
              <div className="w-full text-center">
                <p
                  id="error"
                  style={{ display: "none" }}
                  className="text-xs text-red-600"
                >
                  Username or Password is incorrect
                </p>
              </div>

              <div className="mt-3 w-full flex items-center flex-col">
                <div className="my-4 w-[70%]">
                  <div className="">
                    <div className="">
                      <label
                        htmlFor="text"
                        className=" flex flex-col items-start space-y-2"
                      >
                        <p className="text-xs ml-1"> Email</p>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={
                            "w-full rounded-lg text-xs text-gray-400 bg-gray-100/50 border-2 border-gray-300 px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          }
                          placeholder="Enter your email"
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className=" w-[70%]">
                  <div className="">
                    <div className="flex flex-col">
                      <label
                        htmlFor="password"
                        className="w-full flex flex-col items-start mb-2"
                      >
                        <p className="text-xs ml-1"> Password</p>
                      </label>

                      <div className="w-full flex items-center">
                        {showPassword === true ? (
                          <input
                            type="text"
                            name="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={
                             "w-full border-2 text-xs text-gray-400 bg-gray-100/50 border-gray-300 rounded-lg px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            }
                            placeholder="Enter your password"
                            required
                          />
                        ) : (
                          <input
                            type="password"
                            name="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={
                              "w-full border-2 text-xs text-gray-400 bg-gray-100/50 border-gray-300 rounded-lg px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            }
                            placeholder="Enter your password"
                            required
                          />
                        )}
                        {showPassword === true ? (
                          <BsEye
                            onClick={() => setShowPassword(!showPassword)}
                            size="1.3em"
                            className="self-center -ml-10 cursor-pointer text-gray-400 hover:text-black"
                          />
                        ) : (
                          <BsEye
                            onClick={() => setShowPassword(!showPassword)}
                            size="1.3em"
                            className="self-center -ml-10 cursor-pointer text-gray-400 hover:text-black"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4 w-[70%]">
                  <button
                    disabled={BtnDisabled}
                    // style={{
                    //   background: "",
                    //   color: "var(--txtColor2)",
                    // }}
                    className="bg-black inline-block rounded-lg text-gray-400 text-xs font-medium cursor-pointer text-center py-3 px-6  w-full"
                    type="submit"
                  >
                    {BtnDisabled === false ? (
                      "Login"
                    ) : (
                      <PulseLoader
                        color={"white"}
                        size={10}
                        style={{ zIndex: "-10" }}
                      />
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <a
                    onClick={() => setForgotPass(!ForgotPass)}
                    className="text-blue-400 text-xs cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="w-full flex items-center mt-5 justify-center">
                  <div className="flex flex-row">
                    <p className="text-xs">Don't have an account?</p>
                    <a
                      className="text-xs text-red-400 ml-1 cursor-pointer underline"
                      onClick={() => navigate("/priser")}
                    >
                      Sign up now
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* FORGOT PASSWORD MODAL  */}
          {ForgotPass === true ? (
            <div className="z-40 w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center">
              <div
                style={{
                  backgroundColor: "var(--bg-fill3)",
                  color: "var(--txtColor1)",
                }}
                className="w-4/6 lg:w-2/6 flex flex-col relative border rounded-lg p-5 text-xs"
              >
                <AiOutlineCloseCircle
                  onClick={() => setForgotPass(!ForgotPass)}
                  size="1.6em"
                  className="absolute top-2 right-3 cursor-pointer hover:text-gray-400"
                />
                <h2 className="text-lg py-3 cursor-pointer">
                  Forgot Password ?
                </h2>
                <p className="text-xs text-red-600 pb-2" id="email"></p>
                <p className="text-xs text-red-600 pb-2" id="email2"></p>

                <input
                  type="email"
                  name="email"
                  value={forgetEmail}
                  onChange={(e) => setForgetEmail(e.target.value)}
                  className="rounded-md border py-2 px-2 w-full text-base"
                  placeholder="Email Address"
                />
                <div className="w-full flex justify-end mt-5">
                  <button
                    disabled={BtnDisabled2}
                    style={{
                      background: "var(--bg-fill4)",
                      color: "var(--txtColor2)",
                    }}
                    className="px-5 py-3 rounded-md btn-hover3 "
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                    //   ForgotPassApi();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      {/* )} */}
    </>
  );
}

export default Login;
