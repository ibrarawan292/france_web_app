import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const MainDashboard = () => {
  return (
    <div className="w-full">
      <h2 className="font-semibold text-3xl ml-20 mb-5">Dashboard</h2>

      <div className="w-full flex flex-col lg:flex-row lg:px-10 ">
        {/* LEFT HAND SIDE  */}
        <div className="w-full lg:w-[65%] p-5 space-y-5 flex flex-col justify-center items-center">
          {/* INNER CONTAINER FOR QUERIES */}
          <div className="w-full lg:w-11/12 h- h-[40vh]  px-5 py-5 bg-white rounded-xl shadow-lg">
            {/* SEARCH BAR  */}
            <span className="w-full flex">
              <input
                type="search"
                className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
                placeholder="Find a query"
              />

              <button className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full">
                Find Query
              </button>
            </span>

            {/* ACTIVITY LIST  */}
            <span className="w-full h-[90%] py-5 px-10 overflow-y-scroll">
              <label htmlFor="activity_list" className="flex">
                <input type="checkbox" className="mr-2" />
                First activity
              </label>
            </span>
          </div>

          <div className="w-full lg:w-11/12 flex flex-col lg:flex-row lg:justify-between">
            {/* INNER CONTAINER FOR ZIP CODES  */}
            <div className="w-full lg:w-[47%] h-[40vh] px-5 py-5 bg-white rounded-xl shadow-lg">
              {/* SEARCH BAR  */}
              <span className="w-full flex">
                <input
                  type="search"
                  className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
                  placeholder="Find zip codes"
                />

                <button className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full">
                  Find
                </button>
              </span>

              {/* ACTIVITY LIST  */}
              <span className="w-full h-[90%] py-5 px-10 overflow-y-scroll">
                <label htmlFor="activity_list" className="flex">
                  <input type="checkbox" className="mr-2" />
                  First zip-code
                </label>
              </span>
            </div>

            {/* INNER CONTAINER FOR LOCATIONS  */}
            <div className="w-full mt-5 lg:mt-0 lg:w-[47%] h-[40vh] px-5 py-5 bg-white rounded-xl shadow-lg">
              {/* SEARCH BAR  */}
              <span className="w-full flex">
                <input
                  type="search"
                  className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
                  placeholder="Find zip locations"
                />

                <button className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full">
                  Find
                </button>
              </span>

              {/* ACTIVITY LIST  */}
              <span className="w-full h-[90%] py-5 px-10 overflow-y-scroll">
                <label htmlFor="activity_list" className="flex">
                  <input type="checkbox" className="mr-2" />
                  First location
                </label>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT HAND SIDE  */}
        <div className="w-full lg:w-[35%] p-5">
          <div className="w-full lg:w-[25%] px-3 bg-cyan-600 shadow-lg rounded-xl lg:fixed right-14 divide-y-2 divide-slate-100">
            <h2 className="text-center py-10 text-white text-lg">
              Your Targeting
            </h2>

            <div className="w-full p-5 text-white">
              <li>First Activity</li>
            </div>

            <div className="w-full p-5 text-white">
              <h1>
                Your company potential is:{" "}
                <p className="font-bold">2000 Companies</p>
              </h1>

              <span className="w-full flex space-x-3 mt-8">
                <button className="px-5 hover:bg-cyan-500 p-2 border-2 border-white rounded-lg ">
                  Calculate the Potential
                </button>

                <button className="py-2 px-3 hover:bg-cyan-500 text-lg text-white border-2 border-white rounded-lg">
                  <AiOutlineDownload />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
