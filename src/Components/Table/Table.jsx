import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import DeleteModal from "../Modals/DeleteModal";
import { ScaleLoader } from "react-spinners";
import TotalServices from "../../TotalServices";
import { toast } from "react-toastify";
import UseDownload from "../CustomHooks/UseDownload";

const Table = ({
  queryData,
  handleShowEditModal,
  loader,
  setLoader,
  getQueryData,
  ExportCSV
}) => {
  const { downloadFile } = UseDownload();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleDeleteQuery = async (id) => {
    console.log(id);
    setLoader(true);
    try {
      const res = await TotalServices.deleteQuery(id);
      console.log(res);
      if (res.status === 200) {
        toast.success("Query Deleted successfully");
        setShowDelete(false);
        setLoader(false);
        getQueryData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loader || queryData ===  0 ? (
        <>
          <div className="bg-white p-10 flex justify-center">
            <ScaleLoader className="text-black" loading={loader} size={20} />
          </div>
        </>
      ) : (
        <>
          {queryData.length == 0 ? (
            <>
              <div className="text-center  p-16">
                <button
                  
                  className="btn-hover bg-black py-2 mr-5 px-10 mt-5 mb-4 content-center	 md:mt-0 w-full md:w-fit rounded-md text-white"
                >
                  No Data Found
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <tr>
                      <th scope="col" class="px-4 py-3">
                        QUERY NAME
                      </th>
                      <th scope="col" class="px-4 py-3">
                       LOCATIOIN
                      </th>
                      <th scope="col" class="px-4 py-3">
                        Data CREATED
                      </th>
                      <th scope="col" class="px-4 py-3">
                        ZIP CODE
                      </th>
                      <th scope="col" class="px-4 py-3">
                        STATUS
                      </th>
                      <th scope="col" class="px-4 py-3">
                        DOWNLOAD
                      </th>
                      <th scope="col" class="px-4 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryData &&
                      queryData.map((item) => {
                        return (
                          <tr key={item.query_id} class="border-b">
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              {item.query_name}
                            </td>
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                            {item.location.map((loc) => {
                                return <p>{loc.label}</p>;
                              })}
                            </td>
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              {item.date_created.slice(0, 17)}
                            </td>

                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              {item.zipcode_data.map((zip) => {
                                return <p>{zip.label}</p>;
                              })}
                            </td>

                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              {item.name}
                            </td>
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadFile("70");
                                }}
                                type="button"
                                className="btn-hover3 rounded-md py-3  flex flex-row"
                              >
                                <AiOutlineDownload className="mt-1 mr-2" />
                                Download
                              </button>
                            </td>
                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                              <button
                                onClick={() => {
                                  handleShowEditModal(item.query_id);
                                  // setEditData(item);
                                  // setIsEdit(true);
                                  // setShowModal(true);
                                }}
                                type="button"
                                className="px-1 py-2  rounded-full border text-green-800 hover:text-green-400 text-lg border-white"
                              >
                                <AiOutlineEdit />
                              </button>
                              <button
                                onClick={() => {
                                  setShowDelete(true);
                                  setDeleteId(item.query_id);
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

                {showDelete ? (
                  <DeleteModal
                    setShowDelete={setShowDelete}
                    deleteId={deleteId}
                    handleDelete={handleDeleteQuery}
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

export default Table;
