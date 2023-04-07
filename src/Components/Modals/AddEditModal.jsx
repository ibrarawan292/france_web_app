import React, { useContext, useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { ThemeContext } from '../../App';

const AddEditModal = () => {

  const {
    showModal,
    setShowModal,
    editData, 
    isEdit
  } = useContext(ThemeContext);


  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("")
  const [queries, setQueries] = useState("");
  const [subscriptionDays, setSubscriptionDays] = useState("");
  const [yearlyDiscount, setYearlyDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  // console.log(editData)
  const addQuery = () => {
    let arr = [];
    let data = {
      name: planName,
      description: description,
      queries: queries,
      subscriptionDays: subscriptionDays,
      price: price,
      status: status
    }
    arr.push(data);
    localStorage.setItem("query", JSON.stringify(arr))
  }

    useEffect(() => {
    if (editData) {
      setPlanName(editData.name);
      setDescription(editData.description);
      setStatus(editData.status);
      // setEmail(editData.email);
    }
  }, [editData]);
  return (
    <>
    {showModal ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
          <div className="relative w-auto my-6 mx-auto max-w-full">
            <div
              className={
                isEdit === true
                  ? "border-0 mt-40 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                  : "border-0 mt-64 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
              }
            >
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {isEdit === true ? "Edit Query" : "Create Query"}
                </h3>
                <button
                  className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
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
                  Plan Name <span className="text-red-900">*</span>
                </p>
                <input
                  type="text"
                  className="w-full rounded-md border p-3"
                  placeholder={
                    isEdit === true ? "Plan Name Edit" : "Plan Name"
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
                    isEdit === true
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
                    isEdit === true ? "Queries Edit" : "Add Queries"
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
                    isEdit === true
                      ? "Edit Subscription Days"
                      : "Add Subscription Days"
                  }
                  value={subscriptionDays}
                  required
                  // disabled={editData.edit}
                  onChange={(e) => setSubscriptionDays(e.target.value)}
                />
                <>
                  {isEdit === true ? true : (
                    <>
                      <p
                        className="text-gray-500 whitespace-no-wrap text-sm  mt-3 mb-1 text-start"
                        style={{
                          textAlign: "start",
                        }}
                      >
                        Yearly Discount{" "}
                        <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="number"
                        className="w-full rounded-md border p-3"
                        placeholder={
                          isEdit === true
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
                    isEdit === true ? "Edit Price" : "Add Price"
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
                  defaultValue={isEdit === true ? status : "default"}
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
              </div>
              {/*footer*/}

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  style={{ background: "black" }}
                  className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  style={{ background: "var(--bg-fill4)" }}
                  className="btn-hover text-black border-2 border-black font-bold uppercase text-sm px-6 py-[10px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    isEdit === true ? editQuery(): addQuery();
                  }}
                >
                  {isEdit === true ? "Edit Query" : "Add Query"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  )
}

export default AddEditModal