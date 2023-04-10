import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { ThemeContext } from "../../App";
import TotalServices from "../../TotalServices";
import DeleteModal from "../Modals/DeleteModal";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

const ZipCodeTable = ({ zipData, handleShowEditModal, setLoader, loader ,getZipCodeList}) => {
  // const {
  //   showZipped,
  //   setShowZipped,
  //   editZippedData,
  //   setEditZippedData,
  //   isEditZipped,
  //   setIsEditZipped,
  // } = useContext(ThemeContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const handleDeleteZipCode = async (id) => {
    console.log(id);
    setLoader(true);
    try {
      const res = await TotalServices.deleteZipCode(id);
      console.log(res);
      if (res.status === 200) {
        toast.success("Zip Code Deleted successfully");
        setShowDeleteModal(false);
        setLoader(false);
        getZipCodeList()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loader || zipData === 0 ? (
        <>
          <div className="bg-white p-10 flex justify-center">
            <ScaleLoader color={"var(--bg-fill4)"} loading={loader} size={20} />
          </div>
        </>
      ) : (
        <>
          {zipData && zipData.length === 0 ? (
            <>
              <>
                <div className="text-center p-16">
                  <button
                    style={{ background: "var(--bg-fill4)" }}
                    className="btn-hover  py-2 mr-5 px-10 mt-5 mb-4 content-center	 md:mt-0 w-full md:w-fit rounded-md text-white"
                  >
                    No data Found
                  </button>
                </div>
              </>
            </>
          ) : (
            <>
              <div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <tr>
                      <th scope="col" class="px-4 py-3">
                        Zip Code
                      </th>
                      <th scope="col" class="px-4 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {zipData &&
                      zipData.map((item, index) => {
                        return (
                          <tr key={item.value} class="border-b  ">
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              {item.label}
                            </td>
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              <button
                                onClick={() => {
                                  handleShowEditModal(item, item.value);
                                }}
                                // onClick={() => {
                                //   // setEditZippedData(item);
                                //   // setShowZipped(true);
                                //   // setIsEditZipped(true);
                                // }}
                                type="button"
                                className="px-1 py-2  rounded-full border text-green-800 hover:text-green-400 text-lg border-white"
                              >
                                <AiOutlineEdit />
                              </button>
                              <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setDeleteId(item.id);
                                }}
                                type="button"
                                className="px-1 py-2 rounded-full border text-red-500 hover:text-red-400 text-lg border-white "
                              >
                                <AiOutlineDelete />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                {showDeleteModal ? (
                  <DeleteModal
                    setShowDeleteModal={setShowDeleteModal}
                    deleteId={deleteId}
                    handleDelete={handleDeleteZipCode}
                  />
                ) : null}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ZipCodeTable;
