import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import TotalServices from "../../TotalServices";
import { Locations } from "../../Components/LocationsList/Locations";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
// import Search from "./SearchQueries";

const MainDashboard = () => {
  const [Loader, setLoader] = useState(false);
  // CHECKBOXES STATES
  const [selectedQueryCheckboxes, setSelectedQueryCheckboxes] = useState([]);
  const [selectedZipCodeCheckboxes, setSelectedZipCodeCheckboxes] = useState(
    []
  );
  const [selectedLocationCheckboxes, setSelectedLocationCheckboxes] = useState(
    []
  );

  // SEARCH DATA
  const [search, setSearch] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchLocations, setSearchLocations] = useState("");

  // API STATES
  const [querydata, setQueryData] = useState([]);
  const [zipCodedata, setZipCodeData] = useState([]);
  const [locatonData, setLocationData] = useState([]);
  const [filteredQuery, setFilteredQuery] = useState([]);
  const [filteredZipCode, setFilteredZipCode] = useState([]);

  // const [LocationsList, setLocationsList] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [recievedQueryData, setRecievedQueryData] = useState([]);
  const [Results, setResults] = useState(false);

  useEffect(() => {
    const loc = Locations.map((item) => ({
      id: uuidv4(),
      label: item.label,
      value: item.value,
      isChecked: false,
    }));
    setLocationData(loc);
  }, [Locations]);

  const handleCheckboxChange = (e, id) => {
    //query state handling for checkbox
    const newQueryData = querydata.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: e.target.checked };
      } else {
        return item;
      }
    });
    console.log(newQueryData, "newQueryData");
    setQueryData(newQueryData);
    const selectedQueryValues = newQueryData
      .filter((item) => {
        return item.isChecked;
      })
      .map((item) => item.value);
    console.log(selectedQueryValues, "selectedQueryValues");
    setSelectedQueryCheckboxes(selectedQueryValues);

    //ZipCode state handling for checkbox
    const newZipCodeData = zipCodedata.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: e.target.checked };
      } else {
        return item;
      }
    });
    console.log(newZipCodeData, "newZipCodeData");
    setZipCodeData(newZipCodeData);
    const selectedZipCodeValues = newZipCodeData
      .filter((item) => {
        return item.isChecked;
      })
      .map((item) => item.label);
    console.log(selectedZipCodeValues, "selectedZipCodeValues");
    setSelectedZipCodeCheckboxes(selectedZipCodeValues);

    //Location state handling for checkbox
    const newLocationData = locatonData.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: e.target.checked };
      } else {
        return item;
      }
    });
    console.log(newLocationData, "newLocatonData");
    setLocationData(newLocationData);
    const selectedLocationValues = newLocationData
      .filter((item) => {
        return item.isChecked;
      })
      .map((item) => item.label);
    console.log(selectedLocationValues, "selectedZipCodeValues");
    setSelectedLocationCheckboxes(selectedLocationValues);
  };

  // const handleZipCheckboxChange = (e, value) => {
  //   const newData = zipCodes.map((item) => {
  //     if (item.value === value) {
  //       return { ...item, isChecked: e.target.checked };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setZipCodes(newData);
  //   const selectedValues = newData
  //     .filter((item) => {
  //       return item.isChecked;
  //     })
  //     .map((item) => item.label);
  //   setSelectedZipCheckboxes(selectedValues);
  // };

  // const handleLocationCheckboxChange = (e, value) => {
  //   console.log(value);
  //   const newData = LocationsList.map((item) => {
  //     if (item.value === value) {
  //       return { ...item, isChecked: e.target.checked };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setLocationsList(newData);
  //   const selectedValues = newData
  //     .filter((item) => {
  //       return item.isChecked;
  //     })
  //     .map((item) => item.label);
  //   setSelectedLocationCheckboxes(selectedValues);
  // };

  const DashboardQuery = async (DownloadResults = false) => {
    try {
      if (
        selectedQueryCheckboxes.length === 0 &&
        (selectedZipCodeCheckboxes.length >= 1 ||
          selectedLocationCheckboxes.length >= 1)
      ) {
        toast.warn("Selection of query is mandatory!", {
          toastId: "my-toast",
        });
        return;
      }
      // add a check to make sure that selectedQueryCheckboxes is not empty
      if (selectedQueryCheckboxes.length === 0) {
        return;
      }
      const data = {
        query_ids: selectedQueryCheckboxes,
        location: selectedLocationCheckboxes,
        zipcodes: selectedZipCodeCheckboxes,
        download: DownloadResults,
      };
      const res = await TotalServices.dashboardQueies(data);
      if (res && res.data.status === 200) {
        setRecievedQueryData(res.data);
      }
      if (DownloadResults) {
        var a = document.createElement("a");
        var binaryData = [];
        binaryData.push(res.data);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        a.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "text/csv" })
        );
        a.download = `All Results, ${formattedDate}`;
        a.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DashboardQuery();
  }, [
    selectedQueryCheckboxes,
    selectedZipCodeCheckboxes,
    selectedLocationCheckboxes,
  ]);

  const GetQueryList = async () => {
    setLoader(true);
    try {
      const res = await TotalServices.getQueryNames({
        query: search,
      });
      if (res.data.status === 200) {
        const initializedData = res.data.query_names.map((item) => ({
          id: uuidv4(),
          label: item.label,
          value: item.value,
          isChecked: false,
        }));
        setQueryData(initializedData);
        setLoader(false);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    GetQueryList();
  }, []);

  const GetZipCodeList = async () => {
    setLoader(true);
    try {
      const res = await TotalServices.getZipCodes();
      if (res.data.status === 200) {
        setLoader(false);
        const initializedData = res.data.zipcodes.map((item) => ({
          id: uuidv4(),
          label: item.label,
          value: item.value,
          isChecked: false,
        }));
        setZipCodeData(initializedData);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    GetZipCodeList();
  }, []);

  const filterData = (query) => {
    //query filtered
    const filteredQuery = querydata?.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredQuery(filteredQuery);

    //ZipCode filtered
    const filteredZipCode = zipCodedata?.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredZipCode(filteredZipCode);

    //Location filtered
    const filteredLocation = locatonData?.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredLocation(filteredLocation);
  };

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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  filterData(e.target.value);
                }}
                className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
                placeholder="Find a query"
              />

              <button className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full">
                Find Query
              </button>
            </span>

            {/* ACTIVITY LIST  */}
            {search === "" ? (
              <>
                {querydata?.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className="w-full h-[90%] py-5 px-10 overflow-y-scroll"
                    >
                      <label htmlFor="activity_list" className="flex">
                        <input
                          type="checkbox"
                          className="mr-2 z-10"
                          checked={item.isChecked}
                          onChange={(e) => handleCheckboxChange(e, item.id)}
                        />

                        {item.label}
                      </label>
                    </span>
                  );
                })}
              </>
            ) : (
              <>
                {filteredQuery?.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className="w-full h-[90%] py-5 px-10 overflow-y-scroll"
                    >
                      <label htmlFor="activity_list" className="flex">
                        <input
                          type="checkbox"
                          className="mr-2 z-10"
                          checked={item.isChecked}
                          onChange={(e) => handleCheckboxChange(e, item.id)}
                        />

                        {item.label}
                      </label>
                    </span>
                  );
                })}
              </>
            )}
          </div>

          <div className="w-full lg:w-11/12 flex flex-col lg:flex-row lg:justify-between">
            {/* INNER CONTAINER FOR ZIP CODES  */}
            <div className="w-full lg:w-[47%] h-[40vh] px-5 py-5 bg-white rounded-xl shadow-lg">
              {/* SEARCH BAR  */}
              <span className="w-full flex">
                <input
                  type="search"
                  value={searchZip}
                  onChange={(e) => {
                    setSearchZip(e.target.value);
                    filterData(e.target.value);
                  }}
                  className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
                  placeholder="Find zip codes"
                />

                <button className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full">
                  Find
                </button>
              </span>

              {/* ZIP CODES LIST  */}
              {searchZip === "" ? (
                <>
                  {zipCodedata?.map((item) => {
                    return (
                      <span
                        key={item.id}
                        className="w-full h-[90%] py-5 px-10 overflow-y-scroll"
                      >
                        <label htmlFor="activity_list" className="flex">
                          <input
                            type="checkbox"
                            className="mr-2 z-10"
                            // value={item.label}
                            // onChange={handleZipCheckboxChange}
                            checked={item.isChecked}
                            onChange={(e) => handleCheckboxChange(e, item.id)}
                          />
                          {item.label}
                        </label>
                      </span>
                    );
                  })}
                </>
              ) : (
                <>
                  {filteredZipCode?.map((item) => {
                    return (
                      <span
                        key={item.id}
                        className="w-full h-[90%] py-5 px-10 overflow-y-scroll"
                      >
                        <label htmlFor="activity_list" className="flex">
                          <input
                            type="checkbox"
                            className="mr-2 z-10"
                            checked={item.isChecked}
                            onChange={(e) => handleCheckboxChange(e, item.id)}
                          />
                          {item.label}
                        </label>
                      </span>
                    );
                  })}
                </>
              )}
            </div>

            {/* INNER CONTAINER FOR LOCATIONS  */}
            <div className="w-full mt-5 lg:mt-0 lg:w-[47%] h-[40vh] px-5 py-5 bg-white rounded-xl shadow-lg">
              {/* SEARCH BAR  */}
              <span className="w-full flex">
                <input
                  type="search"
                  value={searchLocations}
                  onChange={(e) => {
                    setSearchLocations(e.target.value);
                    filterData(e.target.value);
                  }}
                  className="w-full bg-gray-100/50 px-5 py-2 border border-gray-500 rounded-l-full  border-y border-r-0"
                  placeholder="Find locations"
                />

                <button className="py-1 px-5 bg-blue-500 text-white whitespace-nowrap rounded-r-full">
                  Find
                </button>
              </span>

              {/* ACTIVITY LIST  */}

              {/* ACTIVITY LIST  */}
              {searchLocations === "" ? (
                <>
                  {locatonData?.map((item) => {
                    return (
                      <span
                        key={item.id}
                        className="w-full h-[90%] py-5 px-10 overflow-y-scroll"
                      >
                        <label htmlFor="activity_list" className="flex">
                          <input
                            type="checkbox"
                            className="mr-2 z-10"
                            // value={item.label}
                            // onChange={handleLocationCheckboxChange}
                            checked={item.isChecked}
                            onChange={(e) => handleCheckboxChange(e, item.id)}
                          />
                          {item.label}
                        </label>
                      </span>
                    );
                  })}
                </>
              ) : (
                <>
                  {filteredLocation?.map((item, index) => {
                    return (
                      <span
                        key={item.id}
                        className="w-full h-[90%] py-5 px-10 overflow-y-scroll"
                      >
                        <label htmlFor="activity_list" className="flex">
                          <input
                            type="checkbox"
                            className="mr-2 z-10"
                            checked={item.isChecked}
                            onChange={(e) => handleCheckboxChange(e, item.id)}
                          />
                          {item.label}
                        </label>
                      </span>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT HAND SIDE  */}
        <div className="w-full lg:w-[35%] p-5">
          <div className="w-full lg:w-[25%] px-3 bg-cyan-600 shadow-lg rounded-xl lg:fixed right-14 divide-y-2 divide-slate-100">
            <h2 className="text-center py-10 text-white text-lg">
              Your Targeting
            </h2>
            <div className="w-full p-5 text-white flex flex-col max-h-52 overflow-y-scroll">
              {selectedQueryCheckboxes.length === 0 ? (
                <div>
                  <ul>
                    <li>
                      <p>Please select a query first</p>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  {recievedQueryData?.user_queries === undefined ? (
                    <div className="mt-2">(No Queries Selected)</div>
                  ) : (
                    <div className="mt-2">
                      Selected Queries:
                      {recievedQueryData?.user_queries?.map((item, index) => {
                        return <li key={index}>{item.query_name}</li>;
                      })}
                    </div>
                  )}

                  {recievedQueryData?.zipcodes === undefined ||
                  recievedQueryData?.zipcodes === "" ? (
                    <div className="mt-2">(No Zip Codes Selected)</div>
                  ) : (
                    <>
                      <div className="mt-2">
                        SelectedZip Codes:
                        {recievedQueryData?.zipcodes?.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </div>
                    </>
                  )}

                  {recievedQueryData?.locations === undefined ||
                  recievedQueryData?.locations === "" ? (
                    <div className="mt-2">(No Locations Selected)</div>
                  ) : (
                    <div className="mt-2">
                      Selected Locations:
                      {recievedQueryData?.locations?.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
            {/* <div className="w-full p-5 text-white flex flex-col max-h-52 overflow-y-scroll">
              {recievedQueryData?.user_queries === undefined ||
              selectedQueryCheckboxes.length === 0 ? (
                <div>(No Queries Selected)</div>
              ) : (
                <div className="mt-2">
                  Selected Queries:
                  {recievedQueryData?.user_queries?.map((item, index) => {
                    return <li key={index}>{item.query_name}</li>;
                  })}
                </div>
              )}

              {recievedQueryData?.zipcodes === undefined ||
              recievedQueryData?.zipcodes === "" ? (
                <div className="mt-2">(No Zip Codes Selected)</div>
              ) : (
                <>
                  <div className="mt-2">
                    SelectedZip Codes:
                    {recievedQueryData?.zipcodes?.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </div>
                </>
              )}

              {recievedQueryData?.locations === undefined ||
              recievedQueryData?.locations === "" ? (
                <div className="mt-2">(No Locations Selected)</div>
              ) : (
                <div className="mt-2">
                  Selected Locations:
                  {recievedQueryData?.locations?.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </div>
              )}
            </div> */}

            <div className="w-full p-5 text-white">
              <h1>
                Your company potential is:
                <span className="font-bold mr-1 flex">
                  {recievedQueryData.result === undefined ? (
                    "(please select queries to see the results)"
                  ) : Results === true ? (
                    <p className="mr-1">{recievedQueryData.result}</p>
                  ) : (
                    "(please select queries to see the results)"
                  )}
                  Companies
                </span>
              </h1>

              <span className="w-full flex space-x-3 mt-8">
                <button
                  onClick={() => {
                    setResults(true);
                  }}
                  className="px-5 hover:bg-cyan-500 p-2 border-2 border-white rounded-lg "
                >
                  Calculate the Potential
                </button>

                {recievedQueryData.result === undefined ? (
                  <button
                    onClick={() => {
                      toast.error("Please calculate the Potential");
                    }}
                    className="py-2 px-3 hover:bg-cyan-500 text-lg text-white border-2 border-white rounded-lg"
                  >
                    <AiOutlineDownload />
                  </button>
                ) : recievedQueryData.result === 0 ? (
                  <>
                    <button
                      onClick={() => {
                        toast.error("Oops! Company potential is zero!");
                      }}
                      className="py-2 px-3 hover:bg-cyan-500 text-lg text-white border-2 border-white rounded-lg"
                    >
                      <AiOutlineDownload />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        selectedQueryCheckboxes.length > 0 &&
                          DashboardQuery(true);
                      }}
                      className="py-2 px-3 hover:bg-cyan-500 text-lg text-white border-2 border-white rounded-lg"
                    >
                      <AiOutlineDownload />
                    </button>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
