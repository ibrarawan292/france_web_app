import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import TotalServices from "../../TotalServices";
import { toast } from "react-toastify";

const ZipModal = ({getZipCodeList}) => {
    // console.log(getZipCodeList)
  const {
    showZipped,
    setShowZipped,
    editZippedData,
    setEditZippedData,
    isEditZipped,
    setIsEditZipped,
  } = useContext(ThemeContext);
  const [zipCode, setZipcode] = useState([]);
  console.log(showZipped);

//   useEffect(() => {
//     if(editZippedData){
//         console.log(first)
//         setZipcode(editZippedData.zipCode)
//     }
//   }, [])
  const handleEditZipCode = () => {};

  const handleAddZipCode = async () => {
    let data = {
      zipcode: zipCode,
    };

    if (zipCode === []) {
      toast.error("Fields must not be empty!!");
    } else {
      try {
        const res = await TotalServices.createZipCode(data);
        console.log(res);
        if (res.status === 200) {
          toast.success("Zip Code Created Successfully");
           getZipCodeList();
          setShowZipped(false);
        } else if (res.data.status !== 200) {
          toast.error("Ops! some error occurred!!");
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };
  return (
    <>
      {showZipped ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
            <div className="relative w-auto my-6 mx-auto max-w-full">
              <div
                className={
                  isEditZipped === true
                    ? "border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                    : "border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                }
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {isEditZipped === true
                      ? "Edit Zip Code"
                      : "Create Zip Code"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowZipped(false)}
                  >
                    <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p
                    className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                    style={{
                      textAlign: "start",
                    }}
                  >
                    {isEditZipped === true ? "Zip Code Edit" : "Add Zip Code"}
                    <span className="text-red-900">*</span>
                  </p>
                  <input
                    type="text"
                    className="w-full rounded-md border p-3"
                    placeholder={
                      isEditZipped === true ? "Zip Code Edit" : "Add Zip Code"
                    }
                    value={zipCode}
                    required
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    style={{ background: "black" }}
                    className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowZipped(false)}
                  >
                    Close
                  </button>
                  <button
                    style={{ background: "var(--bg-fill4)" }}
                    className="btn-hover text-black border-2 border-black font-bold uppercase text-sm px-6 py-[10px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      isEditZipped === true
                        ? handleEditZipCode()
                        : handleAddZipCode();
                    }}
                  >
                    {isEditZipped === true ? "Edit ZipCode" : "Add ZipCode"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ZipModal;
