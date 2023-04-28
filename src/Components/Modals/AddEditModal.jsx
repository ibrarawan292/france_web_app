import React, { useContext, useEffect, useState } from "react";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { ThemeContext } from "../../App";
import CreatableSelect from "react-select/creatable";
import TotalServices from "../../TotalServices";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
const AddEditModal = ({
  getQueryData,
  setShowQueryModal,
  editQueryData,
  isEditQuery,
  editQueryId,
  zipcodeList,
  Locations,
}) => {
  const [QueryText, setQueryText] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [location, setLocation] = useState([]);
  const [zipCode, setZipCode] = useState([]);
  // const [selectedZipCode, setSelectedZipCode] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState([]);

  useEffect(() => {
    if (editQueryData) {
      setQueryText(editQueryData.query_name);
      setLocation(editQueryData.location);
      setZipCode(editQueryData.zipcode_data);
    }
  }, [editQueryData]);

  // const handleZipCodeChange = (selectedOptions) => {
  //   setZipCode(selectedOptions);
  // };

  // console.log(editData)

  const CreateQuery = async () => {
    let loc = [];
    location.map((item) => {
      loc.push(item.value);
    });
    // console.log(zipCode)
    let zip = [];
    zipCode.map((item) => {
      zip.push(item.value);
    });
    let data = {
      query: QueryText,
      location: loc,
      zipcodes: zip,
    };
    console.log(data);
    if (QueryText === "" || loc == "" || zip == "") {
      toast.error("Fields must not be empty!!");
    } else {
      try {
        const res = await TotalServices.createQuery(data);
        console.log(res);
        if (res.status === 200) {
          toast.success("Query Created Successfully");
          getQueryData();
          setShowQueryModal(false);
        } else if (res.data.status !== 200) {
          toast.error("Ops! some error occurred!!");
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const EditQuery = async () => {
    let loc = [];
    location.map((item) => {
      console.log(item);
      loc.push(item.label);
    });
    // console.log(zipCode)
    let zip = [];
    zipCode.map((item) => {
      console.log(item);
      zip.push(item.value);
    });
    let data = {
      query: QueryText,
      location: loc,
      zipcodes: zip,
    };
    console.log(data);
    if (loc == "" || QueryText === "" || zipCode == "") {
      toast.error("Fields must not be empty!!");
    } else {
      try {
        const res = await TotalServices.editQuery(editQueryId, data);
        console.log(res);
        if (res.status === 200) {
          toast.success("Zip Code Edited Successfully");
          getQueryData();
          setShowQueryModal(false);
        } else if (res.data.status !== 200) {
          document.getElementById("error").style.display = "block";
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
        <div className="relative w-auto my-6 mx-auto max-w-full">
          <div
            className={
              isEditQuery === true
                ? "border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                : "border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
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
                  value={location}
                  options={Locations}
                  isMulti
                  onChange={(selectedOptions) => {
                    console.log(selectedOptions);
                    setLocation(selectedOptions);
                  }}
                  defaultValue={location}
                  className="text-black basic-multi-select"
                />
              </div>

              <div>
                <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                  ZipCodes <span className="text-red-900">*</span>
                </p>
                <CreatableSelect
                  defaultValue={zipCode}
                  isMulti
                  onChange={(selectedOptions) => {
                    console.log(selectedOptions);
                    setZipCode(selectedOptions);
                  }}
                  // onCreateOption={handleCreateOption}
                  options={zipcodeList}
                  value={zipCode}
                  className="text-black basic-multi-select"
                />
              </div>

              {/* <div>
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
                </div> */}
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
  );
};

export default AddEditModal;
