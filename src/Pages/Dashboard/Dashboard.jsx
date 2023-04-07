import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import Helmet from "react-helmet";
// icons
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
// import {IoCreateOutline} from "react-icons/io";
import {
  MdCreate,
  MdDashboardCustomize,
  MdManageAccounts,
  MdOutlineQueryStats,
} from "react-icons/md";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import TotalServices from "../../TotalServices";
import { AiOutlineLogout } from "react-icons/ai";

const Dashboard = () => {
  const [active, setActive] = useState(1);
  const [Accordion, setAccordion] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [UserModal, setUserModal] = useState(false);
  const [ShrinkMenu, setShrinkMenu] = useState(false);

  const [ShrinkSettings, setShrinkSettings] = useState(false);

  let navigate = useNavigate();

  const toggle2 = () => {
    if (Accordion === 1) {
      return setAccordion(0);
    }
    setAccordion(1);
  };

  // ADMIN LOGOUT API STARTS
    const handleLogout = async () => {
      try {
        var res = await TotalServices.logout();
        console.log(res, "logout");
        if (res.msg !== "Token has expired") {
          localStorage.removeItem("UserAuth");
          localStorage.setItem("UserIsLogin", false);

          navigate("/login");
        }
      } catch (error) {
        console.log("error ", error);
      }
    };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Francs-Web-App | Dashboard</title>
      </Helmet>

      <div className={"w-full flex justify-center bg-white"}>
        <div className="w-full flex">
          {/* SIDEBAR  */}
          <div
            className={
              ShrinkMenu
                ? "w-[93px] lg:flex bg-gray-200 hidden"
                : "w-[18%] lg:flex hidden bg-gray-200"
            }
          >
            <div
              className={
                ShrinkMenu === true
                  ? " w-full overflow-hidden relative hidden lg:block h-screen"
                  : "w-full overflow-hidden relative hidden lg:block h-screen"
              }
            >
              <div
                className={
                  ShrinkMenu === true
                    ? "h-full lg:w-[6%] fixed"
                    : "h-full lg:w-[18%] fixed"
                }
              >
                {/* SIDE BAR  */}
                <div
                  className={
                    "bg-white/50 pt-5 pb-5 px-3 flex flex-col h-full w-full"
                  }
                >
                  {/* FULL MENU  */}
                  <span
                    className={
                      ShrinkMenu === true
                        ? "hidden"
                        : "space-y-5 flex flex-col items-center"
                    }
                  >
                    <img
                      className="w-36 pt-2 pb-10 mr-12"
                      //   src={logo}
                      alt="France Web App"
                    />
                    {/* <NavLink
                      end
                      style={({ isActive }) => ({
                        color: isActive ? "white" : "",
                        background: isActive ? "black" : "",
                      })}
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                      to="/"
                    >
                      <MdDashboardCustomize
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          Dashboard
                        </div>
                      </div>
                    </NavLink> */}
                    <NavLink
                      end
                      style={({ isActive }) => ({
                        color: isActive ? "white" : "",
                        background: isActive ? "black" : "",
                      })}
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                      to="/manage-query"
                    >
                      <MdOutlineQueryStats
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          Manage Query
                        </div>
                      </div>
                    </NavLink>

                    <NavLink
                      end
                      style={({ isActive }) => ({
                        color: isActive ? "white" : "",
                        background: isActive ? "black" : "",
                      })}
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                      to="/create-query"
                    >
                      <MdCreate
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          Create Query
                        </div>
                      </div>
                    </NavLink>
                  </span>

                  {/* ICON ONLY MENU  */}
                  <span
                    className={
                      ShrinkMenu === true ? "space-y-5 pt-3 " : "hidden"
                    }
                  >
                    <img
                      className="w-9 mt-1 ml-3 mb-10"
                      src="https://cdn-icons-png.flaticon.com/512/481/481584.png"
                      alt=""
                    />

                    {/* MENU ITEM 1 */}
                    <NavLink
                      end
                      style={({ isActive }) => ({
                        color: isActive ? "var(--txtColor2)" : "",
                        background: isActive ? "var(--bg-fill4)" : "",
                      })}
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to=""
                    >
                      <MdDashboardCustomize
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                    </NavLink>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HEADER  */}
          <div
            className={
              ShrinkMenu
                ? "w-full lg:w-[95%] flex flex-col items-end overflow-hidden"
                : "w-full lg:w-[82%] flex flex-col items-end overflow-hidden"
            }
          >
            <div
              className={
                ShrinkMenu
                  ? "w-full lg:w-[92%] xl:w-[95%] pl-2 pr-10 z-10 fixed border-b border-gray-300 flex flex-col items-center justify-center h-14"
                  : "w-full lg:w-[82%] pr-10 z-10 bg-white fixed border-b border-gray-300  flex flex-col items-center justify-center h-14"
              }
            >
              <div className="w-full top-0  flex justify-between items-center px-3 lg:px-0 py-6">
                <div
                  className={
                    ShrinkMenu === true
                      ? " py-[2px] flex items-center justify-between"
                      : "flex items-center justify-between"
                  }
                >
                  <div className="hidden lg:flex">
                    <span
                      onClick={() => setShrinkMenu(false)}
                      className={
                        ShrinkMenu === true
                          ? "-ml-2 -mb-[55px] self-center rounded-full bg-gray-100 border border-white p-1 text-xl hover:animate-pulse cursor-pointer"
                          : "hidden"
                      }
                    >
                      <BiArrowToRight />
                    </span>
                  </div>

                  <span
                    onClick={() => setShrinkMenu(true)}
                    className={
                      ShrinkMenu === true
                        ? "hidden"
                        : "hidden lg:block -mb-[55px] -ml-4 rounded-full bg-gray-100 border border-white p-1 text-xl hover:animate-pulse cursor-pointer"
                    }
                  >
                    <BiArrowToLeft />
                  </span>
                </div>

                {/* Mobile Menu  */}
                <div className="flex lg:hidden items-center">
                  <FiMenu
                    className="cursor-pointer"
                    color={"var(--bg-fill4)"}
                    onClick={() => setShowMenu(!showMenu)}
                    size="1.3em"
                  />
                </div>

                {/* MENU ITEMS START  */}
                <div
                  className={
                    showMenu === true
                      ? "lg:hidden w-full max-w-full max-h-full z-20 dashboard-animation backdrop-blur-lg fixed top-0 left-0 h-full"
                      : "lg:hidden max-w-0 max-h-0 overflow-hidden bg-white/75 z-20 dashboard-animation backdrop-blur-lg fixed top-0 left-0 h-full"
                  }
                >
                  <div className="w-full px-5 dashboard_color py-4 flex items-center justify-between">
                    <div className="closing-menu text-white w-full flex items-center justify-between">
                      <div className="flex pl-4 pr-10">
                        <p>Testlegion</p>
                      </div>
                      <FiMenu
                        className="zindex-dropdown"
                        color="white"
                        onClick={() => setShowMenu(!showMenu)}
                        size="1.2em"
                      />
                    </div>
                  </div>

                  <div className="overflow-scroll h-screen space-y-5 pt-14 pb-3 px-5 flex flex-col">
                    <NavLink
                      end
                      style={({ isActive }) => ({
                        color: isActive ? "var(--txtColor2)" : "black",
                        background: isActive ? "var(--bg-fill4)" : "",
                      })}
                      onClick={() => {
                        setActive(4);
                        setShowMenu(false);
                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to=""
                    >
                      <MdManageAccounts
                        size="2em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[20px] self-center font-light cursor-pointer">
                          Dashboard
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
                {/* MOBILE MENU ENDS HERE */}

                <div
                  style={{ color: "var(--txtColor1)" }}
                  className="w-full flex justify-between"
                >
                  <p></p>
                  <div
                    className={
                      ShrinkMenu === true ? "flex space-x-5" : "flex space-x-5"
                    }
                  >
                    <span
                      onClick={() => handleLogout()}
                      className="flex border border-gray-300 p-3 cursor-pointer dashboard_color rounded-full "
                    >
                      <AiOutlineLogout
                        size="1em"
                        className={
                          active === 7 || active === 8 || active === 9
                            ? " self-center"
                            : " self-center"
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DASHBOARD SCREEN  */}
            <div
              className={
                ShrinkSettings === true
                  ? " py-20 px-3 lg:px-0 lg:w-[75%] w-full bg-white lg:h-full flex justify-center items-start"
                  : " py-20 px-3 lg:px-0 w-full lg:w-full bg-white lg:h-full flex justify-center items-start"
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* {UserModal === true ? (
        <div
          onClick={() => setUserModal(!UserModal)}
          className={
            ShrinkMenu === true
              ? " w-screen h-screen absolute top-0  user-modal flex justify-end"
              : " w-screen h-screen absolute left-0 top-0 user-modal flex justify-end"
          }
        >
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill5)",
                  }
                : {
                    backgroundColor: "var(--bg-fill3)",
                  }
            }
            className="w-5/12 sm:w-4/12 lg:w-2/12 h-fit flex flex-col relative mt-16 mr-10 border rounded-lg p-5 text-xs"
          >
            <AiOutlineCloseCircle
              onClick={() => setUserModal(!UserModal)}
              size="1.6em"
              className="absolute top-2 right-3 cursor-pointer hover:text-gray-400"
            />

            <NavLink
              end
              style={({ isActive }) =>
                DarkMode === true
                  ? {
                      color: isActive ? "var(--txtColor2)" : "",
                    }
                  : {
                      color: isActive ? "var(--txtColor1)" : "",
                    }
              }
              onClick={() => {
                setActive(10);

                toggle2();
              }}
              className="pb-2 cursor-pointer hover:underline "
              to="edit-profile-user"
            >
              Account Settings
            </NavLink>

            <NavLink
              end
              style={({ isActive }) =>
                DarkMode === true
                  ? {
                      color: isActive ? "var(--txtColor2)" : "",
                    }
                  : {
                      color: isActive ? "var(--txtColor1)" : "",
                    }
              }
              onClick={() => {
                setActive(11);

                toggle2();
              }}
              className="pb-2 cursor-pointer hover:underline "
              to="change-password-user"
            >
              Change Password
            </NavLink>

            <span
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : {
                      color: "var(--txtColor1)",
                    }
              }
              onClick={() => UserLogout()}
              className="pb-2 cursor-pointer hover:underline"
            >
              Log Out
            </span>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default Dashboard;
