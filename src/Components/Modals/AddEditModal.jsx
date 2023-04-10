import React, { useContext, useEffect, useState } from "react";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { ThemeContext } from "../../App";
import TotalServices from "../../TotalServices";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
const AddEditModal = ({
  getQueryData,
  setShowQueryModal,
  editQueryData,
  isEditQuery,
}) => {
  const [QueryText, setQueryText] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [location, setLocation] = useState([]);
  const [zipcode, setZipCode] = useState([]);
  const [selectedZipCode, setSelectedZipCode] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [record, setRecord] = useState(0);
  const [totalRecords, setTotalRecords] = useState("");
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZipcode, setSelectedZipcode] = useState(null);
  const getZipCodeList = async () => {
    setLoader(true);
    console.log(searchTerm);
    try {
      const res = await TotalServices.getZipCode(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          keyword: searchTerm,
        }
      );
      console.log(res, "res");
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);

        console.log(res.data.zipcodes);
        setZipCode(res.data.zipcodes);
        setTotalPages(res.data.pages);
        if (searchTerm === "") {
          // setTempData(res);
        }
        setTotalRecords(res.data.total_records);
        // setTempData(res);
        // setTempDataValue(res.data.plans);
        setLoader(false);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getZipCodeList();
  }, [searchTerm, currentPage]);
  // const zipcodes = [
  //   { label: "1000", value: 1000 },
  //   { label: "10001", value: 10001 },
  //   { label: "10002", value: 10002 },
  //   { label: "10003", value: 10003 },
  // ];
  // const handleZipcodeChange = (selectedOption) => {
  //   setSelectedZipcode(selectedOption.value);
  // };
  const locations = [
    {
      label: "USA",
      value: "USA",
    },
    {
      label: "CANADA",
      value: "CANADA",
    },
    {
      label: "MEXICO",
      value: "MEXICO",
    },
    {
      label: "FRANCE",
      value: "FRANCE",
    },
  ];

  // console.log(editData)

  const CreateQuery = async () => {
    console.log(location, zipcode);
    let loc = [];
    location.map((item) => {
      loc.push(item.value);
    });
    let zip = [];
    selectedZipCode.map((item) => {
      zip.push(item.value);
    });
    let data = {
      query: QueryText,
      location: loc,
      zipcodes: zip,
    };
    console.log(loc, zip);
    if (location === [] || QueryText === "" || selectedZipCode === []) {
      toast.error("Fields must not be empty!!");
    } else {
      try {
        const res = await TotalServices.createQuery(data);
        console.log(res);
        if (res.status === 200) {
          toast.success("Query Created Successfully");
          getQueryData();
          setShowModal(false);
        } else if (res.data.status !== 200) {
          toast.error("Ops! some error occurred!!");
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  // const handleMultiSelectChange = (selectedList) => {
  //   console.log(selectedList);
  //   setLocation(selectedList);

  // };
  const EditQuery = async () => {
    try {
      const res = await TotalServices.editQuery({
        zipcode: zipcode,
      });
      if (res.data.status === 200) {
        toast.success("Zip Code Edited Successfully");
        getQueryData();
        setShowModal(false);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  // useEffect(() => {
  //   if (editQueryData) {
  //     setPlanName(editQueryData.name);
  //     setDescription(editQueryData.description);
  //     setStatus(editQueryData.status);
  //     // setEmail(editData.email);
  //   }
  // }, [editQueryData]);
  return (
    <>
      {/* {showModal ? ( */}
      <ToastContainer />
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
          <div className="relative w-auto my-6 mx-auto max-w-full">
            <div
              className={
                isEditQuery === true
                  ? "border-0 mt-40 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                  : "border-0 mt-64 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
              }
            >
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {isEditQuery === true ? "Edit Query" : "Create Query"}
                </h3>
                <button
                  className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowQueryModal(false)}
                >
                  <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              {/* <div className="relative p-6 flex-auto">
                <p
                  className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Plan Name <span className="text-red-900">*</span>
                </p>
                <input
                  type="text"
                  className="w-full rounded-md border p-3"
                  placeholder={
                    isEditQuery === true ? "Plan Name Edit" : "Plan Name"
                  }
                  value={planName}
                  required
                  onChange={(e) => setPlanName(e.target.value)}
                />
                <p
                  className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Description <span className="text-red-900">*</span>
                </p>
                <input
                  type="text"
                  className="w-full rounded-md border p-3"
                  placeholder={
                    isEditQuery === true
                      ? "Description Edit"
                      : "Add Description"
                  }
                  value={description}
                  required
                  // disabled={editData.edit}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <p
                  className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Queries Available <span className="text-red-900">*</span>
                </p>
                <input
                  type="number"
                  className="w-full rounded-md border p-3"
                  placeholder={
                    isEditQuery === true ? "Queries Edit" : "Add Queries"
                  }
                  value={queries}
                  required
                  // disabled={editData.edit}
                  onChange={(e) => setQueries(e.target.value)}
                />

                <p
                  className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Subscription Days <span className="text-red-900">*</span>
                </p>
                <input
                  type="number"
                  className="w-full rounded-md border p-3"
                  placeholder={
                    isEditQuery === true
                      ? "Edit Subscription Days"
                      : "Add Subscription Days"
                  }
                  value={subscriptionDays}
                  required
                  // disabled={editData.edit}
                  onChange={(e) => setSubscriptionDays(e.target.value)}
                />
                <>
                  {isEditQuery === true ? (
                    true
                  ) : (
                    <>
                      <p
                        className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                        style={{
                          textAlign: "start",
                        }}
                      >
                        Yearly Discount <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="number"
                        className="w-full rounded-md border p-3"
                        placeholder={
                          isEditQuery === true
                            ? "Edit Yearly Discount"
                            : "Add Yearly Discount"
                        }
                        // value={yearlyDiscount}
                        // required
                        // // disabled={editData.edit}
                        // onChange={(e) => setYearlyDiscount(e.target.value)}
                      />
                    </>
                  )}
                </>

                <p
                  className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Price <span className="text-red-900">*</span>
                </p>
                <input
                  type="number"
                  className="w-full rounded-md border p-3"
                  placeholder={
                    isEditQuery === true ? "Edit Price" : "Add Price"
                  }
                  value={price}
                  required
                  // disabled={editData.edit}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <p
                  className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Status <span className="text-red-900">*</span>
                </p>
                <select
                  id="status"
                  defaultValue={isEditQuery === true ? status : "default"}
                  value={status}
                  className="w-full rounded-md border p-3"
                  onClick={(e) => setStatus(e.target.value)}
                >
                  <option value="default" disabled>
                    Select Status
                  </option>
                  <option value="1">Active</option>
                  <option value="0">InActive</option>
                </select>
              </div> */}

              <div className="relative p-6 flex flex-col text-left ">
                <div>
                  <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                    Query <span className="text-red-900">*</span>
                  </p>
                  <input
                    type="text"
                    className="w-full rounded-md border p-2 border-gray-300"
                    placeholder={
                      isEditQuery === true ? "Query Edit" : "Query Name"
                    }
                    value={QueryText}
                    onChange={(e) => setQueryText(e.target.value)}
                  />
                </div>

                <div>
                  <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                    Location <span className="text-red-900">*</span>
                  </p>
                  <Select
                    // value={locations}
                    options={locations}
                    isMulti
                    onChange={setLocation}
                    defaultValue={location}
                    className="text-black basic-multi-select"
                  />
                </div>

                <div>
                  <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                    ZipCodes <span className="text-red-900">*</span>
                  </p>
                  <Select
                    defaultValue={selectedZipCode}
                    isMulti
                    onChange={setSelectedZipCode}
                    options={zipcode}
                    // value={selectedZipcode}
                    className="text-black basic-multi-select"
                  />
                </div>

                <div>
                  <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                    Add NEW ZIPCODE <span className="text-red-900">*</span>
                  </p>
                  <input
                    type="text"
                    className="w-full rounded-md border p-2 border-gray-300"
                    placeholder={
                      isEditQuery === true ? "Edit Zip Code" : "Add Zip Code"
                    }
                    value={newZipCode}
                    onChange={(e) => setNewZipCode(e.target.value)}
                  />
                </div>
              </div>
              {/*footer*/}

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  style={{ background: "black" }}
                  className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowQueryModal(false)}
                >
                  Close
                </button>
                <button
                  style={{ background: "var(--bg-fill4)" }}
                  className="btn-hover text-black border-2 border-black font-bold uppercase text-sm px-6 py-[10px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    isEditQuery === true ? EditQuery() : CreateQuery();
                  }}
                >
                  {isEditQuery === true ? "Edit Query" : "Create Query"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      {/* ) : null} */}
    </>
  );
};

export default AddEditModal;
