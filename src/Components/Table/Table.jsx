import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import AddEditModal from "../Modals/AddEditModal";
import { ThemeContext } from "../../App";
import DeleteModal from "../Modals/DeleteModal";

const Table = () => {
  const { showModal, setShowModal, setEditData , setIsEdit} = useContext(ThemeContext);
  const [data, setData] = useState("");
  const [showDelete, setShowDelete] = useState(false)
  // const data = [{ title: "query", date: "0/45/24", status: "active" }];
  const getData = () => {
    const storedData = JSON.parse(localStorage.getItem("query"));
    if (storedData) {
      setData(storedData);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" class="px-4 py-3">
              QUERY NAME
            </th>
            <th scope="col" class="px-4 py-3">
              STATUS
            </th>
            <th scope="col" class="px-4 py-3">
              DATE
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
          {data && data.map((item) => {
            return (
              <tr class="border-b  ">
                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                  {item.name}
                </td>
                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                  {item.status}
                </td>
                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                  {/* {item.date} */}
                </td>
                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // ExportCSV(item.query_id);
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
                      setEditData(item);
                      setIsEdit(true)
                      setShowModal(true);
                    }}
                    type="button"
                    className="px-1 py-2  rounded-full border text-green-800 hover:text-green-400 text-lg border-white"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => setShowDelete(true)}
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
      {showModal ? <AddEditModal /> : null}
      {showDelete ? <DeleteModal setShowDelete={setShowDelete} showDelete={showDelete} /> : null}
    </div>
  );
};

export default Table;
